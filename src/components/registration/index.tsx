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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ApiService from "../../utils/apis";

export interface ComponentProps {
  userId: number;
  setUserId: (id: number) => void;
}

const UserRegistration: React.FC<ComponentProps> = (props: ComponentProps) => {

  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    ApiService.registerUser(name)
    .then(result => {
      setErrorMessage("");
      ApiService.validateUser(name)
      .then(
        res=> {
          props.setUserId(res?.data?.user_id);
          navigate("/events?userId="+res?.data?.user_id);        } 
      )
      .catch(err => {
        setErrorMessage(err?.response?.data?.detail);
  
      })
    })
    .catch(err => {
      setErrorMessage(err?.response?.data?.detail);

    })
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
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid2 container spacing={2}>
              <Grid2>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="user-name"
                  label="User Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid2>
            </Grid2>
                { errorMessage?.length ? <Alert severity="error">{errorMessage}</Alert> : null}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid2 container justifyContent="flex-end">
              <Grid2>
                <Link to="/">Already have an account? Login</Link>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserRegistration;