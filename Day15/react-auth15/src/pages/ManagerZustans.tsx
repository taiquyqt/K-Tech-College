import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import AccessDenied from './AccessDenied';
import Tasks from './Tasks';
import MyTasks from './MyTask';     
import Users from './UsersPage'; 
import Roles from './RolesPage'; 
import Customer from './Customer';
import { useAuthStore } from '../auth-store';

import MainLayout from '../layouts/MainLayout';

export default function ManagerZustand() {
    const { loggedInUser } = useAuthStore((state) => state);

    const userRoles = loggedInUser?.roles?.map((r) => r.code.toLowerCase()) || [];

    const canAccess = (allowedRoles?: string[]) => {
        if (!allowedRoles || allowedRoles.length === 0) return true;
        return allowedRoles.some((r) => userRoles.includes(r.toLowerCase()));
    };

    const DefaultRedirect = () => {
        if (!loggedInUser) {
            return <Navigate to="/login" replace />;
        }

        if (canAccess(['administrators'])) {
            return <Navigate to="/tasks" replace />;
        } else if (canAccess(['managers'])) {
            return <Navigate to="/tasks" replace />;
        }

        return <Navigate to="/access-denied" replace />;
    };

    const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
        if (!loggedInUser) {
            return <Navigate to="/login" replace />;
        }

        if (!canAccess(allowedRoles)) {
            return <Navigate to="/access-denied" replace />;
        }

        return <>{children}</>;
    };

    return (
        <div className="bg-gray-50">
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/login" 
                        element={
                            loggedInUser ? <DefaultRedirect /> : <LoginForm />
                        } 
                    />

                    <Route element={<MainLayout />}>
                        <Route
                            path="/tasks"
                            element={
                                <ProtectedRoute allowedRoles={['administrators', 'managers']}>
                                    <Tasks />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-tasks"
                            element={
                                <ProtectedRoute allowedRoles={['administrators', 'managers', 'employees']}>
                                    <MyTasks />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute allowedRoles={['administrators']}>
                                    <Users />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/roles"
                            element={
                                <ProtectedRoute allowedRoles={['administrators']}>
                                    <Roles />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/customer"
                            element={
                                <ProtectedRoute allowedRoles={['administrators']}>
                                    <Customer />
                                </ProtectedRoute>
                            }
                        />
                        <Route 
                            path="/access-denied" 
                            element={
                                loggedInUser ? <AccessDenied /> : <Navigate to="/login" replace />
                            } 
                        />
                    </Route>

                    <Route path="/" element={<DefaultRedirect />} />
                    <Route path="*" element={<DefaultRedirect />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}