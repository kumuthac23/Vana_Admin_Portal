import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="textSecondary"></Typography>
    </Box>
  );
};

export default Loader;
