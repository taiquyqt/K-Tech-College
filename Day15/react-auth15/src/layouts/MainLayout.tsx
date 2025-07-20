import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../auth-store';
import routes from '../router';

export default function MainLayout() {
  const { loggedInUser, logOut } = useAuthStore((state) => state);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRoles: string[] = loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];

  return (
    <div>
      {/* Navigation bar */}
      <div className='flex justify-between items-center p-4 bg-gray-100 whitespace-nowrap'>
        <nav className='flex gap-4'>
          {routes.map((route) => {
            if (route.showOnMenu === false) return null;

            const routeRoles = route.roles?.map((role: string) => role.toLowerCase()) || [];
            const hasAccess = userRoles.some((role) =>
              role === 'administrators' || routeRoles.includes(role),
            );

            if (!hasAccess) return null;

            return (
              <NavLink 
                key={route.path}
                to={route.path}
                className={({ isActive }) => isActive ? 'font-bold' : 'font-normal hover:text-blue-500'}
              >
                {route.name}
              </NavLink>
            );
          })}
        </nav>
        <div>
          <span className='mr-4'>
            Welcome, {loggedInUser?.username || 'Guest'}
          </span>
          <button className='bg-red-500 text-white px-4 py-2 rounded-md'
            onClick={() => {
              logOut().then(() => {
                navigate('/login');
               });
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
}