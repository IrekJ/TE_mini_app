import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterRequestModel } from '../models/RegisterRequestModel';

type RegisterFormProps = {
  onSubmit: SubmitHandler<RegisterRequestModel>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequestModel>();

  return (
    <Paper elevation={3} className="mt-8 p-8 w-full sm:w-96">
      <Typography variant="h5" gutterBottom className="text-center font-semibold mb-6">
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          {...register('firstname', { required: 'First name is required' })}
          label="First Name"
          variant="outlined"
          fullWidth
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          className="mb-4"
        />
        <TextField
          {...register('lastname', { required: 'Last name is required' })}
          label="Last Name"
          variant="outlined"
          fullWidth
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          className="mb-4"
        />
        <TextField
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email address',
            },
          })}
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          className="mb-4"
        />
        <TextField
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
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
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterForm;
