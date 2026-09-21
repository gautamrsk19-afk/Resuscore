import React, { useState } from "react";
import SignIn from "./SignIn.jsx";
import ResuScoreApp from "./ResuScoreApp.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <SignIn onSignIn={(u) => setUser(u)} />;
  }

  // recruiterEmail is used inside ResuScoreApp to send scorecard emails.
  return <ResuScoreApp recruiterEmail={user.email} />;
}
