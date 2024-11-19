import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSetAuth } from "../state/setAuth";
import { api } from "../lib/api";
import { toast } from "react-toastify";

const LoginPage = () => {
  const setAuth = useSetAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      // API call to authenticate the user
      const response = await api.authLogin(data); 

      console.log('Login Response:', response);
      toast.success("Login successful!");

      // Set authentication and user states
      setAuth(
        {
          tokens: {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          },
        },
        {
          email: response.user.email,
          firstname: response.user.firstname,
          lastname: response.user.lastname,
          createdAt: response.user.createdAt,
          updatedAt: response.user.updatedAt,
          role: response.user.role,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default LoginPage;
