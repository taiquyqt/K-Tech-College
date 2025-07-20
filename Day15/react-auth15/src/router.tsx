import LoginForm from './pages/LoginForm';
import Tasks from './pages/Tasks';
import MyTasks from './pages/MyTask';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';

const routes = [
  {
    path: '/login',
    showOnMenu: false,
    isPublic: true,
    name: 'Login',
    index: true,
    element: <LoginForm />,
  },
  {
    path: '/home',
    showOnMenu: true,
    name: 'Home',
    index: true,
    element: <Tasks />,
    roles: ['Users', 'Managers', 'Leaders'],
  },
  {
    path: '/tasks',
    showOnMenu: true,
    name: 'Tasks',
    index: true,
    element: <Tasks />,
    roles: ['Managers', 'Leaders'],
  },
  {
    path: '/my-tasks',
    showOnMenu: true,
    name: 'My Tasks',
    index: true,
    element: <MyTasks />,
    roles: ['Users'],
  },
  {
    path: '/users',
    showOnMenu: true,
    name: 'Users',
    index: false,
    element: <UsersPage />,
    roles: ['Administrators'],
  },
  {
    path: '/roles',
    showOnMenu: true,
    name: 'Roles',
    index: false,
    element: <RolesPage />,
    roles: ['Administrators'],
  },
];

export default routes;
