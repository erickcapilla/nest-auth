import { Navigate, Outlet } from "react-router";
import { PATHS } from "../lib/constants";
import { useAuth } from "../hooks/use-auth";

interface Props {
  isAllowed: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = PATHS.login,
  children,
}: Props) => {
  const { loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children ? children : <Outlet />;
};
