// components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import routes from '../router';
import { getCurrentUserRoles } from "../libs/task-api";

export const Sidebar = () => {
  const userRoles = getCurrentUserRoles();

  const canAccess = (routeRoles: string[]) =>
    routeRoles.some((role) => userRoles.includes(role));

  return (
    <nav className="p-4 bg-gray-100 w-64">
      <ul className="space-y-2">
        {routes.map((route) => {
          if (!route.showOnMenu) return null;
          if (route.isPublic || canAccess(route.roles?? [])) {
            return (
              <li key={route.path}>
                <NavLink to={route.path}>{route.name}</NavLink>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
};
