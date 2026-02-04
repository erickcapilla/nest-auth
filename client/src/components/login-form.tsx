import { useState } from "react";
import { apiFetch } from "../api/api-config";
import { toast } from "sonner";
import { PATHS } from "../lib/constants";
import { useNavigate } from "react-router";
import { loginSchema } from "../schemas/auth-schemas";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string[] | null }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);

      console.log("Validation errors:", fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const validation = loginSchema.safeParse(formData);
      if (!validation.success) {
        toast.error(validation.error.message);
        return;
      }
      const userData = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...formData }),
      });

      setUser(userData);
      setIsAuthenticated(true);

      toast.success("Login successful!");
      navigate(PATHS.home);
    } catch (err) {
      console.error("Error logging in", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 m-auto min-w-96 p-6">
        <h2 className="text-2xl font-bold">Login</h2>
        <div className="grid gap-2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-10 rounded border border-gray-300 px-3"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email[0]}</span>
          )}
        </div>
        <div className="grid gap-2">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-10 rounded border border-gray-300 px-3"
          />
          {errors.password && (
            <span className="text-sm text-red-700">{errors.password[0]}</span>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Validating..." : "Login"}
        </button>

        <div>
          <p>
            Don't have an account?{" "}
            <Link to={PATHS.signup} className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
