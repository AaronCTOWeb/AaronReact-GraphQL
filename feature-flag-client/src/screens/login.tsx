import React, { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { FlagContext } from "../App";

export const LoginScreen = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Get the flag for rendered promotionalBanner in the login and dashboard
  const {generalRender} = useContext(FlagContext);


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      history.push("/dashboard");
    }
  };

  return (
    // Pass the general-render-launch-banner flag value as child
    <PageLayout className="login" promotionalBannerStatus={generalRender}>
      <h1>Welcome back 👋</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </PageLayout>
  );
};
