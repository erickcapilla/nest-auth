import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL ||"http://localhost:3000/api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || "An error occurred while fetching data.");
    if (errorData.message !== "Unauthorized") {
      toast.error(error.message);
    }
    throw error;
  }

  if (response.status === 204) return null;

  return response.json();
};
