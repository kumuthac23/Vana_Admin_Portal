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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <ThemeProvider theme={theme}>
        <Router>
          <Layout />
          <Routes>
            <Route path={paths.ROOT} element={<Layout />}>
              <Route path={paths.LOGIN} element={<Login />} />
              <Route path={paths.PRODUCT} element={<Product />} />
              <Route path={paths.ORDER} element={<Order />} />
              <Route path={paths.CATEGORY} element={<Category />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
