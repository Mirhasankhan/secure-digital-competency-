import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const UserRoutes = ({ children }: { children: ReactNode }) => {
  const { email } = useAppSelector(useCurrentUser);
  console.log(email);
  if (!email) {
    return <Navigate to="/" replace></Navigate>;
  }
  return <div>{children}</div>;
};

export default UserRoutes;
