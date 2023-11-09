import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginRequest } from "../../api/auth/Login";

type ILoginFormInput = {
  username: string;
  password: string;
};

const Login = () => {
  const { isLoggedIn, login } = useAuth();

  const { register, handleSubmit } = useForm<ILoginFormInput>();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    const { username, password } = data;
    const token_details: Record<string, string> = await loginRequest("/token", {
      username,
      password,
    });

    token_details.detail
      ? alert(token_details.detail)
      : login(token_details.access_token);
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoggedIn ? (
        <div>
          <Navigate to="/home" />;
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username </label>
          <input
            {...register("username", { required: true })}
            defaultValue=""
          />
          <br></br>
          <label>Password </label>
          <input
            {...register("password", { required: true })}
            type="password"
            defaultValue=""
          />
          <br></br>

          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default Login;
