import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import VotingPage from "../VotingPage/VotingPage";

interface ApplicationContainerProps {}

const ApplicationContainer: FC<ApplicationContainerProps> = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === false) {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/login" />;
  }

  return <VotingPage></VotingPage>;
};

export default ApplicationContainer;
