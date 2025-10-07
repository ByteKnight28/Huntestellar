// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import AuthScreen from './pages/AuthScreen.jsx';
import StarJourney from './pages/StarJourney.jsx';
import './index.css';

// Define all the URL paths for your application
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // This makes AuthScreen the default page for the "/" path
        element: <AuthScreen />,
      },
      {
        path: 'starjourney', // This page will be at "localhost:5173/starjourney"
        element: <StarJourney />,
      },
    ],
  },
]);

// Provide the router to your app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);