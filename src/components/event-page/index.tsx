import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

// Lazy load the EventPage component from the eventApp MFE
//@ts-ignore
const Event = lazy(() => import("eventApp/Event"));

const EventPage: React.FC<any> = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AccountCircle />
            </IconButton>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Suspense fallback={<div>Loading Event Page...</div>}>
        <Event />
      </Suspense>
    </div>
  );
};

export default EventPage;
