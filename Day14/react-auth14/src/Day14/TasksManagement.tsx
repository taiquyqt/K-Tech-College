import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthStore } from './auth-store';

import MyTask from './pages/MyTask';
import CreateTask from './pages/CreateTask';
import LoginForm from './pages/LoginForm';
import Tasks from './pages/Tasks';
import UpdateTask from './pages/UpdateTask';
import AccessDenied from './pages/AccessDenied';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

export default function TasksManagement() {
  const { access_token } = useAuthStore();

  return (
    <div className="bg-gray-50">
      <BrowserRouter>
        <Navigation />
        <div className="container-fluid mx-auto">
          <Routes>
            <Route
              path="/login"
              element={access_token ? <Navigate to="/tasks" replace /> : <LoginForm />}
            />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-task"
              element={
                <ProtectedRoute>
                  <MyTask />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<AccessDenied />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
