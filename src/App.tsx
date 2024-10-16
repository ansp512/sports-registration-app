import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login-page";
import UserRegistration from "./components/registration";
import EventPage from "./components/event-page";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [userId, setUserId] = useState(-1);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login userId={userId} setUserId={setUserId} />}
            />
            <Route
              path="/register"
              element={
                <UserRegistration userId={userId} setUserId={setUserId} />
              }
            />
            <Route path="/events*" element={<EventPage userId={userId} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
