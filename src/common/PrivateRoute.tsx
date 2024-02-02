// import { ReactNode, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Box } from "@mui/material";
// import { paths } from "../routes/path";

// function PrivateRoute({ children }: { children: ReactNode }) {
//   const navigate = useNavigate();

//   // Function to check the authentication token from the backend
//   const checkTokenInBackend = async () => {
//     try {
//       // Make a request to your backend endpoint to fetch the token
//       const response = await axios.get(
//         "http://localhost:4000/Vana_Admin_Portal/user/getRegisteredUser",
//         {
//           withCredentials: true, // Send cookies along with the request
//         }
//       );

//       // Assuming your server responds with { success: true } upon successful authentication
//       if (response.data.success) {
//         navigate(`${paths.ORDER}`);
//       } else {
//         navigate(`${paths.LOGIN}`);
//       }
//     } catch (error) {
//       // Handle any errors that may occur during the request
//       console.error("Error fetching token:", error);
//       navigate("/login"); // Redirect to login page in case of an error
//     }
//   };

//   // To check the token when the component mounts
//   useEffect(() => {
//     checkTokenInBackend();
//   }, []);

//   return <Box>{children}</Box>;
// }

// export default PrivateRoute;
