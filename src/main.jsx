import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './MainLayout/MainLayout';
import Error from './pages/Error';
import Home from './pages/Home';
import AuthProvider from './AuthProvider/AuthProvider';
import LogInPage from './pages/LogInPage';
import Register from './pages/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ManageUser from './AdminPage/ManageUser';
import ContestAdd from './hostpage/ContestAdd';
import MyContest from './hostpage/MyContest';
import Update from './hostpage/Update';
import ManageContest from './AdminPage/ManageContest';
import AllContest from './pages/Allcontest';
import Details from './components/Details';

import Private from './Private/Private';
import HostPrivate from './Private/HostPrivate';
import AdMinPrivate from './Private/AdMinPrivate';
import RegisterContest from './UserDashboard/RegisterContest';
import Payment from './UserDashboard/Payment';
import MyParticipate from './UserDashboard/MyParticipate';
import MyProfile from './UserDashboard/MyProfile';
import SubmitedPage from './hostpage/SubmitedPage';
import SeeSubmission from './hostpage/SeeSubmission';
import WinningContest from './UserDashboard/WinningContest';
import Upcoming from './pages/Upcoming';
import LeaderBoard from './pages/LeaderBoard';
import News from './pages/News';
import Dashboard from './Dashboard/Dashboard';

import axios from 'axios';

// ---------------- Helper function ----------------
const getAxiosSecure = () => {
  const token = localStorage.getItem('access-token');
  return axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};
// -------------------------------------------------

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/LeaderBoard',
        element: <LeaderBoard />
      },
      {
        path: '/allContests/:id',
        element: (
          <Private>
            <Details />
          </Private>
        ),
        loader: async ({ params }) => {
          const axiosSecure = getAxiosSecure();
          const res = await axiosSecure.get(`/singleData/details/${params.id}`);
          return res.data;
        },
      },
      {
        path: '/login',
        element: <LogInPage />
      },
      {
        path: '/signup',
        element: <Register />
      },
      {
        path: '/allContest',
        element: <AllContest />,
        loader: async () => {
          const axiosSecure = getAxiosSecure();
          const res = await axiosSecure.get('/allData');
          return res.data;
        },
      },
      {
        path: 'register',
        element: <RegisterContest />
      },
      {
        path: '/payment/:id',
        element: <Payment />,
        loader: async ({ params }) => {
          const axiosSecure = getAxiosSecure();
          const res = await axiosSecure.get(`/getSingleContest/${params.id}`);
          return res.data;
        },
      },
      {
        path: '/upcomingContest',
        element: <Upcoming />
      },
      {
        path: '/news',
        element: <News />
      },
    ],
  },
  {
    path: '/dashBoard',
    element: <Dashboard />,
    children: [
      {
        path: 'ManageUser',
        element: (
          <AdMinPrivate>
            <ManageUser />
          </AdMinPrivate>
        ),
        loader: async () => {
          const axiosSecure = getAxiosSecure();
          const res = await axiosSecure.get('/allusers');
          return res.data;
        },
      },
      {
        path: 'AddContest',
        element: (
          <HostPrivate>
            <ContestAdd />
          </HostPrivate>
        ),
      },
      {
        path: 'myContest',
        element: (
          <HostPrivate>
            <MyContest />
          </HostPrivate>
        ),
      },
      {
        path: 'update/:id',
        element: <Update />,
        loader: async ({ params }) => {
          const axiosSecure = getAxiosSecure();
          const res = await axiosSecure.get(`/single/contest/${params.id}`);
          return res.data;
        },
      },
      {
        path: 'ManageContests',
        element: (
          <AdMinPrivate>
            <ManageContest />
          </AdMinPrivate>
        ),
        loader: async () => {
          const axiosSecure = getAxiosSecure();
          const res = await axiosSecure.get('/allData');
          return res.data;
        },
      },
      { path: 'participate', element: <MyParticipate /> },
      {
        path: 'myProfile',
        element: (
          <Private>
            <MyProfile />
          </Private>
        ),
      },
      {
        path: 'submitted',
        element: <SubmitedPage />
      },
      {
        path: 'submission',
        element: <SeeSubmission />
      },
      {
        path: 'WinningContest',
        element: <WinningContest />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
