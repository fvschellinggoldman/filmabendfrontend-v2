import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginRequest } from "../../api/auth/Login";
import React from "react";
import styles from "./Login.module.scss"; // Import the styles

type ILoginFormInput = {
  username: string;
  password: string;
};

const Login = () => {
  const { isLoggedIn, login } = useAuth();

  const { register, handleSubmit } = useForm<ILoginFormInput>();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    const { username, password } = data;
    const tokenDetails: Record<string, string> = await loginRequest("/token", {
      username,
      password,
    });

    tokenDetails.detail
      ? alert(tokenDetails.detail)
      : login(tokenDetails.access_token);
  };

  return (
    <div className={styles.BackgroundContainer}>
      <div className={styles.LoginContainer}>
        <h2 className={styles.LoginTitle}>Login</h2>
        {isLoggedIn ? (
          <div>
            <Navigate to="/home" />
          </div>
        ) : (
          <form className={styles.LoginForm} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.LoginLabel}>Username</label>
            <input
              className={styles.LoginInput}
              {...register("username", { required: true })}
              defaultValue=""
            />
            <label className={styles.label}>Password</label>
            <input
              className={styles.LoginInput}
              {...register("password", { required: true })}
              type="password"
              defaultValue=""
            />
            <input
              className={styles.LoginSubmitButton}
              type="submit"
              value="Login"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
