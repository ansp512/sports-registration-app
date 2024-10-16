import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid2,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ApiService from "../../utils/apis";

export interface ComponentProps {
  userId: number;
  setUserId: (id: number) => void;
}
const Login: React.FC<ComponentProps> = (props : ComponentProps) => {
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    ApiService.validateUser(userName)
      .then(
        res => {
          props.setUserId(res?.data?.user_id);
          navigate("/events?userId="+res?.data?.user_id);
        }
      )
      .catch(
        err => {
          setErrorMessage(err?.response?.data?.detail);
        }
      )
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user-name"
              label="User Name"
              name="email"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
                { errorMessage?.length ? <Alert severity="error">{errorMessage}</Alert> : null}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid2 container justifyContent={"flex-end"}>
              <Grid2>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;