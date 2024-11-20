import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterRequestModel } from '../models/RegisterRequestModel';
import { api } from '../lib/api';
import { toast } from 'react-toastify';
import { useSetAuth } from '../state/setAuth';
import RegisterForm from '../components/RegisterForm';
import { SubmitHandler } from 'react-hook-form';

const RegisterPage: React.FC = () => {
  const setAuth = useSetAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterRequestModel> = async (data) => {
    try {
      // API call to register the user
      const response = await api.authSignup(data);

      toast.success("Registration successful!");
      console.log(response);

      // Set authentication and user states
      setAuth(
        {
          tokens: {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          },
        },
        {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
        }
      );

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default RegisterPage;
