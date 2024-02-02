import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ILogin } from "../interface/type";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useLogin } from "../customHooksRQ/User";
import { paths } from "../routes/path";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required()
    .typeError("Please enter the PhoneNumber")
    .matches(/^[0-9]{10}$/, "Please enter a valid phone number"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const handleLogin: SubmitHandler<ILogin> = (data: ILogin) => {
    console.log(data);

    if (data) {
      loginMutation
        .mutateAsync(data)
        .then(() => {
          navigate(`${paths.PRODUCT}`);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Invalid username and password");
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Box>
        <Typography variant="h6" align="center" my={2}>
          <b>Login</b>
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.7 }}>
              PhoneNumber<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              type="tel"
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message?.toString()}
              autoComplete="new"
              required
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.7 }}>
              Password<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
              required
              autoComplete="new"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
