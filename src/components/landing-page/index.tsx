import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login-page";
import UserRegistration from "../registration";
import EventPage from "../event-page";

const LandingPage = () => {
  const [userId, setUserId] = useState(-1);
  return (
    <Routes>
      <Route
        path="/"
        element={<Login userId={userId} setUserId={setUserId} />}
      />
      <Route
        path="/register"
        element={<UserRegistration userId={userId} setUserId={setUserId} />}
      />
      <Route path="/events*" element={<EventPage userId={userId} />} />
    </Routes>
  );
};

export default LandingPage;
