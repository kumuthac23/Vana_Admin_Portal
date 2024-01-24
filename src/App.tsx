import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./layout/Layout";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Category from "./pages/Category";
import { theme } from "./theme.ts/Theme";
import Login from "./login/Login";
import { paths } from "./routes/path";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout />
        <Routes>
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.PRODUCT} element={<Product />} />
          <Route path={paths.ORDER} element={<Order />} />
          <Route path={paths.CATEGORY} element={<Category />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
