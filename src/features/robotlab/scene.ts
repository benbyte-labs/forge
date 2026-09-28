import * as THREE from 'three';
import { LINKS } from './arm';
import type { RoverState, World } from './rover';

export type SkinId = 'default' | 'mk2';

const SKINS: Record<SkinId, { body: number; trim: number; accent: number }> = {
  default: { body: 0x1a2a3d, trim: 0x22e6ff, accent: 0xff3ea5 },
  mk2: { body: 0x2c1a3d, trim: 0xb47cff, accent: 0x38f0d0 },
};

/**
 * Draws the Robot Lab.
 *
 * It owns no simulation state of its own: every frame it renders whatever the
 * pure kinematics last produced. That split is why a mission can be judged, and
 * tested, without a canvas anywhere in sight.
 */
export class RobotScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private raf = 0;

  private roverGroup = new THREE.Group();
  private armGroup = new THREE.Group();
  private worldGroup = new THREE.Group();
  private trailLine: THREE.Line | null = null;

  private jointPivots: THREE.Object3D[] = [];
  private gripperLeft: THREE.Object3D | null = null;
  private gripperRight: THREE.Object3D | null = null;

  private skin: SkinId = 'default';
  private orbit = { theta: -0.9, phi: 0.95, radius: 230 };
  private dragging = false;
  private lastPointer = { x: 0, y: 0 };

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);

    this.scene.add(this.worldGroup, this.roverGroup, this.armGroup);
    this.buildLights();
    this.buildFloor();
    this.buildRover();
    this.buildArm();
    this.armGroup.visible = false;

    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('wheel', this.onWheel, { passive: false });

    this.resize();
    this.loop();
  }

  // ── setup ────────────────────────────────────────────────────────

  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0x88aacc, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(80, 160, 60);
    this.scene.add(key);
    const rim = new THREE.PointLight(0x22e6ff, 0.9, 600);
    rim.position.set(-120, 60, -100);
    this.scene.add(rim);
  }

  private floor = new THREE.Group();

  private buildFloor(size = 200) {
    this.floor.clear();

    const grid = new THREE.GridHelper(size, Math.max(8, Math.round(size / 10)), 0x22e6ff, 0x1d2b40);
    (grid.material as THREE.Material).opacity = 0.32;
    (grid.material as THREE.Material).transparent = true;
    this.floor.add(grid);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(size * 1.6, size * 1.6),
      new THREE.MeshStandardMaterial({ color: 0x070c16, roughness: 0.95, metalness: 0.1 }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.4;
    this.floor.add(plane);

    if (!this.scene.children.includes(this.floor)) this.scene.add(this.floor);
  }

  private buildRover() {
    const s = SKINS[this.skin];
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(14, 6, 10),
      new THREE.MeshStandardMaterial({ color: s.body, metalness: 0.5, roughness: 0.45 }),
    );
    body.position.y = 5;

    const nose = new THREE.Mesh(
      new THREE.ConeGeometry(2.4, 6, 12),
      new THREE.MeshStandardMaterial({ color: s.trim, emissive: s.trim, emissiveIntensity: 0.7 }),
    );
    nose.rotation.z = -Math.PI / 2;
    nose.position.set(9, 5, 0);

    const wheelGeo = new THREE.CylinderGeometry(3.4, 3.4, 2.2, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0c1320, roughness: 0.8 });
    for (const [wx, wz] of [
      [-5, 6],
      [-5, -6],
      [5, 6],
      [5, -6],
    ]) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 3.4, wz);
      this.roverGroup.add(wheel);
    }

    this.roverGroup.add(body, nose);
    // The real thing is 14 cm across; at arena distance that is a speck, so it
    // is drawn oversized on purpose. Teaching beats scale fidelity here.
    this.roverGroup.scale.setScalar(2.4);
  }

  private buildArm() {
    const s = SKINS[this.skin];
    const mat = new THREE.MeshStandardMaterial({ color: s.body, metalness: 0.55, roughness: 0.4 });
    const jointMat = new THREE.MeshStandardMaterial({ color: s.trim, emissive: s.trim, emissiveIntensity: 0.45 });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(9, 11, 4, 24), mat);
    base.position.y = 2;
    this.armGroup.add(base);

    // Each pivot carries the next link, so setting a joint angle is one
    // rotation rather than a chain of trigonometry in the renderer.
    const yaw = new THREE.Object3D();
    yaw.position.y = 4;
    this.armGroup.add(yaw);

    const column = new THREE.Mesh(new THREE.CylinderGeometry(4, 5, LINKS.base, 16), mat);
    column.position.y = LINKS.base / 2;
    yaw.add(column);

    const shoulder = new THREE.Object3D();
    shoulder.position.y = LINKS.base;
    yaw.add(shoulder);
    shoulder.add(new THREE.Mesh(new THREE.SphereGeometry(4.2, 16, 12), jointMat));

    const upper = new THREE.Mesh(new THREE.BoxGeometry(LINKS.upper, 5, 5), mat);
    upper.position.x = LINKS.upper / 2;
    shoulder.add(upper);

    const elbow = new THREE.Object3D();
    elbow.position.x = LINKS.upper;
    shoulder.add(elbow);
    elbow.add(new THREE.Mesh(new THREE.SphereGeometry(3.6, 16, 12), jointMat));

    const fore = new THREE.Mesh(new THREE.BoxGeometry(LINKS.fore, 4, 4), mat);
    fore.position.x = LINKS.fore / 2;
    elbow.add(fore);

    const wrist = new THREE.Object3D();
    wrist.position.x = LINKS.fore;
    elbow.add(wrist);
    wrist.add(new THREE.Mesh(new THREE.SphereGeometry(3, 16, 12), jointMat));

    const roll = new THREE.Object3D();
    wrist.add(roll);

    const tool = new THREE.Mesh(new THREE.BoxGeometry(LINKS.tool, 3, 3), mat);
    tool.position.x = LINKS.tool / 2;
    roll.add(tool);

    const fingerGeo = new THREE.BoxGeometry(5, 1.4, 1.4);
    const fingerMat = new THREE.MeshStandardMaterial({ color: s.accent, emissive: s.accent, emissiveIntensity: 0.4 });
    const left = new THREE.Mesh(fingerGeo, fingerMat);
    const right = new THREE.Mesh(fingerGeo, fingerMat);
    left.position.set(LINKS.tool + 2.5, 0, 2);
    right.position.set(LINKS.tool + 2.5, 0, -2);
    roll.add(left, right);

    this.gripperLeft = left;
    this.gripperRight = right;
    this.jointPivots = [yaw, shoulder, elbow, wrist, roll];
  }

  // ── state in ─────────────────────────────────────────────────────

  setWorld(world: World) {
    this.worldGroup.clear();

    // Frame the arena rather than a fixed distance: a 60 cm bench and a 120 cm
    // warehouse need very different camera distances to read at all.
    const span = Math.max(world.bounds.x, world.bounds.z);
    this.buildFloor(span * 2);
    this.orbit.radius = span * 1.75;

    for (const o of world.obstacles) {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(o.r, o.r, 16, 20),
        new THREE.MeshStandardMaterial({ color: 0x24344a, roughness: 0.85 }),
      );
      mesh.position.set(o.x, 8, o.z);
      this.worldGroup.add(mesh);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(o.r, 0.4, 8, 32),
        new THREE.MeshBasicMaterial({ color: 0xff3ea5 }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(o.x, 16.3, o.z);
      this.worldGroup.add(ring);
    }

    if (world.goal) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(world.goal.r, 0.7, 10, 40),
        new THREE.MeshBasicMaterial({ color: 0x3ddc97 }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(world.goal.x, 0.6, world.goal.z);
      this.worldGroup.add(ring);
    }

    if (world.line && world.line.length > 1) {
      const pts = world.line.map((p) => new THREE.Vector3(p.x, 0.3, p.z));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      this.worldGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffb454 })));
    }

    // Edges only: a wireframe box also draws each face's triangulation, which
    // reads as a giant X across the arena rather than as a boundary.
    const wallBox = new THREE.BoxGeometry(world.bounds.x * 2, 14, world.bounds.z * 2);
    const walls = new THREE.LineSegments(
      new THREE.EdgesGeometry(wallBox),
      new THREE.LineBasicMaterial({ color: 0x22e6ff, transparent: true, opacity: 0.45 }),
    );
    walls.position.y = 7;
    this.worldGroup.add(walls);
    wallBox.dispose();
  }

  setRover(state: RoverState) {
    this.roverGroup.position.set(state.x, 0, state.z);
    this.roverGroup.rotation.y = -(state.heading * Math.PI) / 180;
  }

  setArm(joints: number[]) {
    const [a0 = 0, a1 = 0, a2 = 0, a3 = 0, a4 = 0, grip = 45] = joints;
    const r = (d: number) => (d * Math.PI) / 180;
    this.jointPivots[0].rotation.y = -r(a0);
    this.jointPivots[1].rotation.z = -r(a1);
    this.jointPivots[2].rotation.z = -r(a2);
    this.jointPivots[3].rotation.z = -r(a3);
    this.jointPivots[4].rotation.x = r(a4);

    const open = 1.2 + (grip / 90) * 2.4;
    if (this.gripperLeft) this.gripperLeft.position.z = open;
    if (this.gripperRight) this.gripperRight.position.z = -open;
  }

  setMachine(machine: 'rover' | 'arm') {
    this.roverGroup.visible = machine === 'rover';
    this.armGroup.visible = machine === 'arm';
  }

  setSkin(skin: SkinId) {
    if (skin === this.skin) return;
    this.skin = skin;
    this.roverGroup.clear();
    this.armGroup.clear();
    this.buildRover();
    this.buildArm();
  }

  /** Draw where the rover has been, so a mission run can be read at a glance. */
  setTrail(points: { x: number; z: number }[]) {
    if (this.trailLine) {
      this.scene.remove(this.trailLine);
      this.trailLine.geometry.dispose();
      this.trailLine = null;
    }
    if (points.length < 2) return;
    const geo = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, 1.2, p.z)));
    this.trailLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x22e6ff, transparent: true, opacity: 0.8 }));
    this.scene.add(this.trailLine);
  }

  // ── camera and lifecycle ─────────────────────────────────────────

  private onPointerDown = (e: PointerEvent) => {
    this.dragging = true;
    this.lastPointer = { x: e.clientX, y: e.clientY };
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.orbit.theta -= (e.clientX - this.lastPointer.x) * 0.006;
    this.orbit.phi = Math.max(0.15, Math.min(1.45, this.orbit.phi - (e.clientY - this.lastPointer.y) * 0.005));
    this.lastPointer = { x: e.clientX, y: e.clientY };
  };

  private onPointerUp = () => {
    this.dragging = false;
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.orbit.radius = Math.max(70, Math.min(500, this.orbit.radius + e.deltaY * 0.3));
  };

  resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const { theta, phi, radius } = this.orbit;
    this.camera.position.set(
      Math.cos(theta) * Math.cos(phi) * radius,
      Math.sin(phi) * radius,
      Math.sin(theta) * Math.cos(phi) * radius,
    );
    this.camera.lookAt(0, 6, 0);
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    this.canvas.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.renderer.dispose();
  }
}
