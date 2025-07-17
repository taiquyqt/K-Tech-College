
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../auth-store';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { access_token } = useAuthStore();
  return access_token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
