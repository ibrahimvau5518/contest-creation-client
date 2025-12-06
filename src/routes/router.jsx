import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home/Home';
import AllContest from '../components/AllContest/AllContest';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import Progress from '../components/Progress/Progress';
import About from '../components/About/About';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/all-contests',
        Component: AllContest,
      },
      {
        path: '/leaderboard',
        Component: Leaderboard,
      },
      {
        path: '/progress',
        Component: Progress,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '*',
        Component: ErrorPage,
      },
    ],
  },
]);
