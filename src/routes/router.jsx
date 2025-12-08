import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home/Home';
import AllContest from '../pages/AllContest/AllContest';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';
import ParticipationProgress from '../pages/ParticipationProgress/ParticipationProgress';
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';

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
        path: 'allContest',
        element: <AllContest></AllContest>,
      },
      {
        path: 'leaderBoard',
        element: <LeaderBoard />,
      },
      {
        path: 'progress',
        element: <ParticipationProgress></ParticipationProgress>,
      },
      {
        path: 'about',
        element: <About></About>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
