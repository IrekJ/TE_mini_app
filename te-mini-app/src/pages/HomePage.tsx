import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 2,
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Test Post Review Site!
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "600px", marginBottom: 4 }}>
        Here you can:
        <ul>
          <li>Register to create a new account.</li>
          <li>Log in to access exclusive features.</li>
          <li>Review existing posts created by others.</li>
          <li>Create and share your own posts.</li>
        </ul>
        Get started now and explore the exciting features of our site!
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/posts")}
        >
          View Posts
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
