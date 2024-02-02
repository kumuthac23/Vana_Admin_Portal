import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import React from "react";
import { Box } from "@mui/material";
function PrivateRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // Function to check the authentication token from the backend
  const checkTokenInBackend = async () => {
    try {
      // Make a request to your backend endpoint to fetch the token
      const response = await axios.get("YOUR_BACKEND_AUTH_ENDPOINT");

      // Assuming your backend returns a structure like { token: "your_token" }
      const { token } = response.data;

      if (token) {
        // If token exists, verify it or perform any necessary actions
        var isLoggedIn = await axios.get("http://localhost:3000/login");

        if (isLoggedIn.data) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      // Handle any errors that may occur during the request
      console.error("Error fetching token:", error);
      navigate("/login"); // Redirect to login page in case of an error
    }
  };

  // To check the token when the component mounts
  useEffect(() => {
    checkTokenInBackend();
  }, []);

  return <Box>{children}</Box>;
}

export default PrivateRoute;
