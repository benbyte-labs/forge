import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

export interface ModelInfo {
  size: { x: number; y: number; z: number };
  triangles: number;
  volumeCm3: number;
}

/** Signed-volume sum over the triangles — the standard mesh volume. */
function meshVolume(geo: THREE.BufferGeometry): number {
  const pos = geo.getAttribute('position');
  let v = 0;
  for (let i = 0; i < pos.count; i += 3) {
    const ax = pos.getX(i), ay = pos.getY(i), az = pos.getZ(i);
    const bx = pos.getX(i + 1), by = pos.getY(i + 1), bz = pos.getZ(i + 1);
    const cx = pos.getX(i + 2), cy = pos.getY(i + 2), cz = pos.getZ(i + 2);
    v += (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6;
  }
  return Math.abs(v);
}

/**
 * A small STL / 3MF viewer with orbit, wireframe and a clipping section.
 * It is for looking at parts and reading their dimensions, not for editing.
 */
export class CadViewer {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
  private model: THREE.Object3D | null = null;
  private clip = new THREE.Plane(new THREE.Vector3(0, 0, -1), 1e6);
  private raf = 0;
  private orbit = { theta: -0.8, phi: 0.9, radius: 200 };
  private dragging = false;
  private last = { x: 0, y: 0 };

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.localClippingEnabled = true;

    this.scene.add(new THREE.AmbientLight(0x88aacc, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(1, 2, 1.5);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0x22e6ff, 0.5);
    fill.position.set(-2, -1, -1);
    this.scene.add(fill);

    canvas.addEventListener('pointerdown', this.down);
    canvas.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.up);
    canvas.addEventListener('wheel', this.wheel, { passive: false });

    this.resize();
    this.loop();
  }

  private material(wireframe: boolean) {
    return new THREE.MeshStandardMaterial({
      color: 0x8fb6d9,
      metalness: 0.25,
      roughness: 0.6,
      wireframe,
      side: THREE.DoubleSide,
      clippingPlanes: [this.clip],
    });
  }

  async load(file: File): Promise<ModelInfo> {
    const buffer = await file.arrayBuffer();
    const name = file.name.toLowerCase();

    let object: THREE.Object3D;
    if (name.endsWith('.3mf')) {
      object = new ThreeMFLoader().parse(buffer);
    } else {
      const geo = new STLLoader().parse(buffer);
      geo.computeVertexNormals();
      object = new THREE.Mesh(geo, this.material(false));
    }

    object.traverse((child) => {
      if (child instanceof THREE.Mesh) child.material = this.material(false);
    });

    if (this.model) this.scene.remove(this.model);
    this.model = object;

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    object.position.sub(centre);
    this.scene.add(object);

    this.orbit.radius = Math.max(size.x, size.y, size.z) * 2.2 || 200;
    this.clip.constant = size.z;

    let triangles = 0;
    let volume = 0;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        triangles += child.geometry.getAttribute('position').count / 3;
        volume += meshVolume(child.geometry);
      }
    });

    return {
      size: { x: size.x, y: size.y, z: size.z },
      triangles: Math.round(triangles),
      volumeCm3: volume / 1000,
    };
  }

  setWireframe(on: boolean) {
    this.model?.traverse((child) => {
      if (child instanceof THREE.Mesh) (child.material as THREE.MeshStandardMaterial).wireframe = on;
    });
  }

  /** 0 hides nothing, 1 cuts the model in half along Z. */
  setSection(fraction: number, sizeZ: number) {
    this.clip.constant = sizeZ * (1 - fraction) + 0.001;
  }

  resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private down = (e: PointerEvent) => {
    this.dragging = true;
    this.last = { x: e.clientX, y: e.clientY };
  };
  private move = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.orbit.theta -= (e.clientX - this.last.x) * 0.006;
    this.orbit.phi = Math.max(-1.45, Math.min(1.45, this.orbit.phi - (e.clientY - this.last.y) * 0.005));
    this.last = { x: e.clientX, y: e.clientY };
  };
  private up = () => {
    this.dragging = false;
  };
  private wheel = (e: WheelEvent) => {
    e.preventDefault();
    this.orbit.radius = Math.max(5, this.orbit.radius * (1 + e.deltaY * 0.0012));
  };

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const { theta, phi, radius } = this.orbit;
    this.camera.position.set(
      Math.cos(theta) * Math.cos(phi) * radius,
      Math.sin(phi) * radius,
      Math.sin(theta) * Math.cos(phi) * radius,
    );
    this.camera.lookAt(0, 0, 0);
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('pointerdown', this.down);
    this.canvas.removeEventListener('pointermove', this.move);
    window.removeEventListener('pointerup', this.up);
    this.canvas.removeEventListener('wheel', this.wheel);
    this.renderer.dispose();
  }
}
