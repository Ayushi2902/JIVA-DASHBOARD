import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import UserManagementPage from '../pages/UserManagementPage.jsx';
import UserProfilePage from '../pages/UserProfilePage.jsx';
import PlaceholderPage from '../pages/PlaceholderPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UserManagementPage /> },
      { path: 'users/:id', element: <UserProfilePage /> },
      { path: 'organization', element: <PlaceholderPage title="Organization" /> },
      { path: 'services/*', element: <PlaceholderPage title="Services" /> },
      { path: 'report', element: <PlaceholderPage title="Reports" /> },
      { path: 'access', element: <PlaceholderPage title="User Access" /> },
      { path: 'settings', element: <PlaceholderPage title="Settings" /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
