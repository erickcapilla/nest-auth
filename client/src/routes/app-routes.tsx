import { Routes, Route } from "react-router";
import { ProtectedRoute } from "./protected-route";
import { useAuth } from "../hooks/use-auth";

import NotFoundPage from "../pages/not-found-page";
import LoginPage from "../pages/login-page";
import SignupPage from "../pages/signup-page";
import HomePage from "../pages/home-page";

import { PATHS } from "../lib/constants";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute
            redirectTo={PATHS.home}
            isAllowed={!isAuthenticated}
          />
        }
      >
        <Route path={PATHS.login} element={<LoginPage />} />
        <Route path={PATHS.signup} element={<SignupPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            redirectTo={PATHS.login}
            isAllowed={isAuthenticated}
          />
        }
      >
        <Route path={PATHS.home} element={<HomePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
