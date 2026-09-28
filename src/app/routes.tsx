import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { TrackPage } from '../features/track/TrackPage';
import { TracksIndexPage } from '../features/track/TracksIndexPage';
import { LessonPage } from '../features/lesson/LessonPage';
import { QuizPage } from '../features/quiz/QuizPage';
import { NotebookPage } from '../features/notebook/NotebookPage';
import { RewardsPage } from '../features/rewards/RewardsPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { CodeLabPage } from '../features/codelab/CodeLabPage';
import { RobotLabPage } from '../features/robotlab/RobotLabPage';
import { PhysicsLabPage } from '../features/physicslab/PhysicsLabPage';
import { CadLabPage } from '../features/cadlab/CadLabPage';

/** The route table, shared by the app shell and the route-level tests. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/tracks" element={<TracksIndexPage />} />
      <Route path="/track/:domain" element={<TrackPage />} />
      <Route path="/track/:domain/:day" element={<LessonPage />} />
      <Route path="/track/:domain/:day/quiz" element={<QuizPage />} />
      <Route path="/notebook" element={<NotebookPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/lab/code" element={<CodeLabPage />} />
      <Route path="/lab/robot" element={<RobotLabPage />} />
      <Route path="/lab/physics" element={<PhysicsLabPage />} />
      <Route path="/lab/cad" element={<CadLabPage />} />
    </Routes>
  );
}
