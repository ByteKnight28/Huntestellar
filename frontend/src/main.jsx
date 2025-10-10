// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import AuthScreen from './pages/AuthScreen.jsx';
import StarJourney from './pages/StarJourney.jsx';
import AnswerPage from './pages/AnswerPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './index.css';

// --- ADD IMPORTS FOR YOUR 16 CLUE PAGES ---
import Path1Clue1 from './pages/clues/Path1Clue1.jsx';
import Path1Clue2 from './pages/clues/Path1Clue2.jsx';
import Path1Clue3 from './pages/clues/Path1Clue3.jsx';
import Path1Clue4 from './pages/clues/Path1Clue4.jsx';
import Path2Clue1 from './pages/clues/Path2Clue1.jsx';
import Path2Clue2 from './pages/clues/Path2Clue2.jsx';
import Path2Clue3 from './pages/clues/Path2Clue3.jsx';
import Path2Clue4 from './pages/clues/Path2Clue4.jsx';
import Path3Clue1 from './pages/clues/Path3Clue1.jsx';
import Path3Clue2 from './pages/clues/Path3Clue2.jsx';
import Path3Clue3 from './pages/clues/Path3Clue3.jsx';
import Path3Clue4 from './pages/clues/Path3Clue4.jsx';
import Path4Clue1 from './pages/clues/Path4Clue1.jsx';
import Path4Clue2 from './pages/clues/Path4Clue2.jsx';
import Path4Clue3 from './pages/clues/Path4Clue3.jsx';
import Path4Clue4 from './pages/clues/Path4Clue4.jsx';
// ... import your other 15 clue pages here ...

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <AuthScreen /> },
      { path: 'starjourney', element: <StarJourney /> },
      
      // --- THIS IS THE NEWLY ADDED ROUTE ---
      {
        path: 'answer/:clueId',
        element: (
          <ProtectedRoute>
            <AnswerPage />
          </ProtectedRoute>
        ),
      },
      
      // --- ROUTES FOR YOUR 16 CLUE PAGES ---
      {
        path: 'path1clue1',
        element: (
          <ProtectedRoute requiredPath="1" requiredClue="1">
            <Path1Clue1 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path1clue2',
        element: (
          <ProtectedRoute requiredPath="1" requiredClue="2">
            <Path1Clue2 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path1clue3',
        element: (
          <ProtectedRoute requiredPath="1" requiredClue="3">
            <Path1Clue3 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path1clue4',
        element: (
          <ProtectedRoute requiredPath="1" requiredClue="4">
            <Path1Clue4 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path2clue1',
        element: (
          <ProtectedRoute requiredPath="2" requiredClue="1">
            <Path2Clue1 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path2clue2',
        element: (
          <ProtectedRoute requiredPath="2" requiredClue="2">
            <Path2Clue2 />
          </ProtectedRoute>
        ),
      },
      {
        path: 'path2clue3',
        element: (
          <ProtectedRoute requiredPath="2" requiredClue="3">
            <Path2Clue3 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path2clue4',
        element: (
          <ProtectedRoute requiredPath="2" requiredClue="4">
            <Path2Clue4 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path3clue1',
        element: (
          <ProtectedRoute requiredPath="3" requiredClue="1">
            <Path3Clue1 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path3clue2',
        element: (
          <ProtectedRoute requiredPath="3" requiredClue="2">
            <Path3Clue2 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path3clue3',
        element: (
          <ProtectedRoute requiredPath="3" requiredClue="3">
            <Path3Clue3 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path3clue4',
        element: (
          <ProtectedRoute requiredPath="3" requiredClue="4">
            <Path3Clue4 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path4clue1',
        element: (
          <ProtectedRoute requiredPath="4" requiredClue="1">
            <Path4Clue1 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path4clue2',
        element: (
          <ProtectedRoute requiredPath="4" requiredClue="2">
            <Path4Clue2 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path4clue3',
        element: (
          <ProtectedRoute requiredPath="4" requiredClue="3">
            <Path4Clue3 />
          </ProtectedRoute>
        ),
      },

      {
        path: 'path4clue4',
        element: (
          <ProtectedRoute requiredPath="4" requiredClue="4">
            <Path4Clue4 />
          </ProtectedRoute>
        ),
      },
      // ... continue this pattern for all 16 of your clue routes ...
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);