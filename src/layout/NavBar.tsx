import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router";
import { paths } from "../routes/path";
const menuItems = [
  { text: "Orders", icon: <AddShoppingCartIcon />, path: `${paths.ORDER}` },
  { text: "Products", icon: <StoreIcon />, path: `${paths.PRODUCT}` },
  { text: "Collections", icon: <CategoryIcon />, path: `${paths.CATEGORY}` },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePageNavigate = (path: string) => {
    navigate(`${path}`);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ height: "50px", display: "flex", justifyContent: "center" }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Avatar
            alt="Company Logo"
            src="/path-to-your-logo.jpg"
            sx={{ marginRight: 2 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            VANA
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: "250px",
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            alignItems: "center",
            paddingX: 2,
          }}
        >
          <Typography variant="h6">Company</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handlePageNavigate(item.path)}
              sx={{
                cursor: "pointer",
                gapX: 0,
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
