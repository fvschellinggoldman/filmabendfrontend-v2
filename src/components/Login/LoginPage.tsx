import React, { useState } from "react";
import styles from "./LoginPage.module.scss"; // Import the styles
import { Stack, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  return (
    <div className={styles.BackgroundContainer}>
      <div className={styles.LoginContainer}>
        <h2 className={styles.LoginTitle}>Filmabend</h2>
        {showLoginForm ? (
          <>
            <LoginForm />
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent="center"
              spacing={0.5}
            >
              <Typography variant="subtitle2" className={styles.ItalicText}>
                No Account yet?
              </Typography>
              <Typography
                className={styles.ItalicText}
                variant="subtitle2"
                style={{ textDecoration: "underline" }}
                onClick={() => {
                  setShowLoginForm(!showLoginForm);
                }}
              >
                Register
              </Typography>
            </Stack>
          </>
        ) : (
          <>
            <RegisterForm />
            <Typography
              className={styles.ItalicText}
              variant="subtitle2"
              onClick={() => {
                setShowLoginForm(!showLoginForm);
              }}
              style={{ textDecoration: "underline" }}
            >
              Back to Login
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
