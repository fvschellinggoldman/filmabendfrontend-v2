import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginRequest } from "../../api/auth/Login";
import styles from "./LoginPage.module.scss"; // Import the styles
import { Button as DefaultButton } from "@mui/base";
import { Alert, Stack } from "@mui/material";

type IRegisterFormInput = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    const { username, password } = data;
    const tokenDetails: Record<string, string> = await loginRequest(
      "/api/users/register",
      {
        username,
        password,
      }
    );

    if (!tokenDetails.detail) {
      login(tokenDetails.access_token);
      navigate("/home");
    } else {
      alert(tokenDetails.detail);
    }
  };

  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Username"
        className={styles.LoginInput}
        {...register("username", { required: true })}
        defaultValue=""
        aria-invalid={errors.username ? "true" : "false"}
      />
      <input
        placeholder="Password"
        className={styles.LoginInput}
        {...register("password", { required: true })}
        type="password"
        defaultValue=""
      />
      <input
        placeholder="Confirm Password"
        className={styles.FormInput}
        {...register("confirmPassword", {
          required: true,
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "Your passwords do no match";
            }
          },
        })}
        type="password"
        defaultValue=""
      />
      <Stack spacing={2} marginBottom={2}>
        {errors.username && (
          <Alert severity="error">No Username provided</Alert>
        )}
        {errors.confirmPassword && (
          <Alert severity="error">Your password don't match</Alert>
        )}
      </Stack>

      <DefaultButton className={styles.LoginSubmitButton} type="submit">
        Register
      </DefaultButton>
    </form>
  );
};

export default RegisterForm;
