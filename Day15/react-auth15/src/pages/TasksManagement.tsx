// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthStore } from '../auth-store';
// import Navigation from '../components/Navigation';
// import AccessDenied from './AccessDenied';
// import routes from '../router';

// export default function TasksManagement() {
//   const { access_token, loggedInUser } = useAuthStore();

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const userRoles: string[] = loggedInUser?.roles?.map((role: any) => typeof role === 'string' ? role : role.name) || [];

//   return (
//     <div className="bg-gray-50">
//       <BrowserRouter>
//         <Navigation />
//         <div className="container-fluid mx-auto">
//           <Routes>
//             {routes.map((route, index) => {
//               const { path, element, isPublic, roles } = route;

//               if (isPublic) {
//                 return <Route key={index} path={path} element={element} />;
//               }

//               if (!access_token) {
//                 return (
//                   <Route
//                     key={index}
//                     path={path}
//                     element={<Navigate to="/access-denied" replace />}
//                   />
//                 );
//               }

//               const hasAccess =
//                 !roles || roles.length === 0 || roles.some((role: string) => userRoles.includes(role));

//               if (!hasAccess) {
//                 return (
//                   <Route
//                     key={index}
//                     path={path}
//                     element={<Navigate to="/access-denied" replace />}
//                   />
//                 );
//               }

//               return <Route key={index} path={path} element={element} />;
//             })}

//             <Route path="/access-denied" element={<AccessDenied />} />
//             <Route path="*" element={<Navigate to="/access-denied" replace />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }
