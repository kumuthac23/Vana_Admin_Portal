import { Container } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{
          pb: 3,
          pt: 3,
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
