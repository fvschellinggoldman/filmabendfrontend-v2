import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import Navbar from "../Navbar/Navbar";
import VotingPage from "../VotingPage/VotingPage";
import styles from "./ApplicationContainer.module.scss";

interface ApplicationContainerProps {}

const ApplicationContainer: FC<ApplicationContainerProps> = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  if (isLoggedIn === false) {
    // Redirect to the login page if the user is not logged in
    console.log("not logged in");
    return <Navigate to="/login" /> //prettier-ignore
  }

  return (
    <>
      <Navbar></Navbar>
      <VotingPage></VotingPage>
    </>
  );
};

export default ApplicationContainer;
