import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Small } from "shadcn-typography";
import imgUrl from "../../assets/loginPage.jpeg";
import NeonText from "../Typography/NeonText";

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  return (
    <div
      className={`m-0 flex items-center justify-end h-screen bg-cover bg-right w-full`}
      style={
        {
          backgroundImage: `url(${imgUrl})`,
        } as React.CSSProperties
      }
    >
      <div className="p-5 rounded-lg shadow-md mr-[2%] mt-[15%] bg-white/50">
        <NeonText text={"Filmabend"} />
        {showLoginForm ? (
          <>
            <LoginForm />
            <div className="flex flex-row justify-center items-center gap-1 pt-6">
              <Small className="italic">No Account yet?</Small>
              <Small
                className="italic underline cursor-pointer"
                onClick={() => {
                  setShowLoginForm(!showLoginForm);
                }}
              >
                Register
              </Small>
            </div>
          </>
        ) : (
          <>
            <RegisterForm />
            <Small
              className="italic underline cursor-pointer pt-6"
              onClick={() => {
                setShowLoginForm(!showLoginForm);
              }}
            >
              Back to Login
            </Small>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
