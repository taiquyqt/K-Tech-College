
// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '../auth-store';

// interface Props {
//   children: React.ReactNode;
//   allowedRoles?: string[]; 
// }

// const ProtectedRoute = ({ children, allowedRoles }: Props) => {
//   const { access_token, loggedInUser } = useAuthStore();

//   if (!access_token) return <Navigate to="/login" replace />;

//   if (
//     allowedRoles &&
//     !allowedRoles.some((role) =>
//       loggedInUser?.roles?.some(
//         (userRole: { id: string | number; name: string }) => userRole.name === role
//       )
//     )
//   ) {
//     return <Navigate to="/access-denied" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
