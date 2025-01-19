import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useRegisterValidate } from "../../../lib/validation/useRegistervalidation";
import { UseRegister } from "./useRegisterFunction";

const RegisterPage = () => {
  const { control, reset, handleSubmit } = useRegisterValidate();
  const { onSubmit, onErrorSubmit } = UseRegister({ reset });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#F6E6DA">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "300px",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
        onSubmit={handleSubmit(onSubmit, onErrorSubmit)}
      >
        <Typography variant="h5" color="#613D2B" fontWeight="bold" textAlign="center">
          Register
        </Typography>

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                sx: {
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#613D2B",
                    },
                    "&:hover fieldset": {
                      borderColor: "#613D2B",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#613D2B",
                    },
                    backgroundColor: "#F6E6DA",
                  },
                },
              }}
              {...field}
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
            />
          )}
        />

        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <TextField
              label="Full Name"
              type="text"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                sx: {
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#613D2B",
                    },
                    "&:hover fieldset": {
                      borderColor: "#613D2B",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#613D2B",
                    },
                    backgroundColor: "#F6E6DA",
                  },
                },
              }}
              {...field}
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                sx: {
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#613D2B",
                    },
                    "&:hover fieldset": {
                      borderColor: "#613D2B",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#613D2B",
                    },
                    backgroundColor: "#F6E6DA",
                  },
                },
              }}
              {...field}
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#613D2B",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#4b2e1e",
            },
          }}
          fullWidth
        >
          Register
        </Button>

        <Typography variant="body2" textAlign="center" marginTop={2}>
          Already have an account?
          <Link
            to="/auth/login"
            style={{
              color: "#613D2B",
              marginLeft: 1,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Klik Here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
