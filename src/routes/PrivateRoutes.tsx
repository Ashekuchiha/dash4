import { Navigate } from 'react-router-dom';
import {isAuthenticated} from "../routes/AuthUtils"; // Import the authentication check

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return children; // If authenticated, render the children (protected route)
};

export default PrivateRoute;
