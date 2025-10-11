import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import AuthScreen from './pages/AuthScreen.jsx';
import StarJourney from './pages/StarJourney.jsx';
import AnswerPage from './pages/AnswerPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// NotFoundPage import has been removed.
import './index.css';

// --- 1. DEFINE ALL CLUE COMPONENTS USING REACT.LAZY ---
const clueComponents = {
  Path1Clue1: lazy(() => import('./pages/clues/Path1Clue1.jsx')),
  Path1Clue2: lazy(() => import('./pages/clues/Path1Clue2.jsx')),
  Path1Clue3: lazy(() => import('./pages/clues/Path1Clue3.jsx')),
  Path1Clue4: lazy(() => import('./pages/clues/Path1Clue4.jsx')),
  Path2Clue1: lazy(() => import('./pages/clues/Path2Clue1.jsx')),
  Path2Clue2: lazy(() => import('./pages/clues/Path2Clue2.jsx')),
  Path2Clue3: lazy(() => import('./pages/clues/Path2Clue3.jsx')),
  Path2Clue4: lazy(() => import('./pages/clues/Path2Clue4.jsx')),
  Path3Clue1: lazy(() => import('./pages/clues/Path3Clue1.jsx')),
  Path3Clue2: lazy(() => import('./pages/clues/Path3Clue2.jsx')),
  Path3Clue3: lazy(() => import('./pages/clues/Path3Clue3.jsx')),
  Path3Clue4: lazy(() => import('./pages/clues/Path3Clue4.jsx')),
  Path4Clue1: lazy(() => import('./pages/clues/Path4Clue1.jsx')),
  Path4Clue2: lazy(() => import('./pages/clues/Path4Clue2.jsx')),
  Path4Clue3: lazy(() => import('./pages/clues/Path4Clue3.jsx')),
  Path4Clue4: lazy(() => import('./pages/clues/Path4Clue4.jsx')),
};

// --- 2. CREATE A CONFIGURATION ARRAY FOR ALL CLUES ---
const clueRoutesConfig = [];
for (let path = 1; path <= 4; path++) {
  for (let clue = 1; clue <= 4; clue++) {
    const Component = clueComponents[`Path${path}Clue${clue}`];
    if (Component) {
      clueRoutesConfig.push({
        path,
        clue,
        Component,
      });
    }
  }
}

// --- 3. GENERATE THE ROUTE OBJECTS PROGRAMMATICALLY ---
const generatedClueRoutes = clueRoutesConfig.map(({ path, clue, Component }) => ({
  path: `path${path}clue${clue}`,
  element: (
    <ProtectedRoute requiredPath={String(path)} requiredClue={String(clue)}>
      <Component />
    </ProtectedRoute>
  ),
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // The errorElement property has been removed.
    children: [
      { index: true, element: <AuthScreen /> },
      { path: 'starjourney', element: <StarJourney /> },
      {
        path: 'answer/:clueId',
        element: (
          <ProtectedRoute>
            <AnswerPage />
          </ProtectedRoute>
        ),
      },
      // --- 4. SPREAD THE GENERATED ROUTES INTO THE ROUTER ---
      ...generatedClueRoutes,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);