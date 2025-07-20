import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../auth-store';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser, logOut } = useAuthStore();

  if (!loggedInUser) return null;

  const userRoles = loggedInUser.roles || [];

  const navItems = [
    {
      path: '/tasks',
      label: 'Tasks',
      exact: true,
      allowedRoles: ['Managers', 'Leaders'],
    },
    {
      path: '/create',
      label: 'Create Task',
      exact: false,
      allowedRoles: ['Leaders'],
    },
    {
      path: '/my-task',
      label: 'My Task',
      exact: false,
      allowedRoles: ['Users', 'Managers', 'Leaders'],
    },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const hasRoleAccess = (allowedRoles?: string[]) => {
    return (
      !allowedRoles ||
      allowedRoles.some((role) =>
        userRoles.some((userRole: { id: string | number; name: string }) => userRole.name === role)
      )
    );
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-800">Tasks Management</h1>

          <div className="flex space-x-1 whitespace-nowrap">
            {navItems
              .filter((item) => hasRoleAccess(item.allowedRoles))
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path, item.exact)
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

            <button
              onClick={async () => {
                await logOut();
                navigate('/login');
              }}
              className="px-4 py-2 rounded-md text-sm bg-red-500 font-medium transition-colors duration-200 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
