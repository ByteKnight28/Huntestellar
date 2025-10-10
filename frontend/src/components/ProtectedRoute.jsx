// src/components/ProtectedRoute.jsx
import React from 'react';
import { useOutletContext, Navigate, useParams } from 'react-router-dom';

function ProtectedRoute({ children, requiredPath, requiredClue }) {
  const { gameData } = useOutletContext();
  const { clueId } = useParams(); // Gets the ID from a route like /answer/:clueId

  if (!gameData) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // --- THIS IS THE FIX ---
  // The API gives us `currentProgress` which is 0-indexed (0 for the first clue).
  // Our routes and requiredClue props are 1-indexed (1 for the first clue).
  // So, we add 1 to the player's progress to get the current clue number.
  const currentPlayerClueNumber = gameData.currentProgress + 1;

  // Determine which clue number this route is for.
  const routeClueNumber = requiredClue || clueId;

  // Check if the player's path and progress match the route's requirements.
  const isAuthorized = 
    (requiredPath ? gameData.teamData.assignedPath == requiredPath : true) && 
    (routeClueNumber ? currentPlayerClueNumber == routeClueNumber : true);


  if (isAuthorized) {
    // If they are on the correct step, show the clue page.
    return children;
  } else {
    // Otherwise, send them back to the StarJourney home page.
    return <Navigate to="/starjourney" replace />;
  }
}

export default ProtectedRoute;