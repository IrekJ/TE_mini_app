import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Paper, Typography } from "@mui/material";

type LoginFormProps = {
  onSubmit: (data: { email: string; password: string }) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Paper elevation={3} className="mt-8 p-8 w-full sm:w-96">
        <Typography
          variant="h5"
          gutterBottom
          className="text-center font-semibold mb-6"
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            className="mb-4"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            className="mb-4"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="mt-4"
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};
