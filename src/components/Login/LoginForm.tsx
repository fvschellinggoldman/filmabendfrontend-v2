import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginRequest } from "../../api/auth/Login";
import styles from "./LoginPage.module.scss"; // Import the styles
import { Button as DefaultButton } from "@mui/base";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

type ILoginFormInput = {
  username: string;
  password: string;
  remember: boolean;
};

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ILoginFormInput>();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    const { username, password, remember } = data;
    const tokenDetails: Record<string, string> = await loginRequest("/token", {
      username,
      password,
      remember,
    });

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
      />
      <input
        placeholder="Password"
        className={styles.FormInput}
        {...register("password", { required: true })}
        type="password"
        defaultValue=""
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="primary"
              {...register("remember")}
            />
          }
          label={
            <Typography variant="subtitle2">Keep me logged in?</Typography>
          }
        />
      </FormGroup>
      <DefaultButton className={styles.LoginSubmitButton} type="submit">
        Login
      </DefaultButton>
    </form>
  );
};

export default LoginForm;
