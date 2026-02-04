import { useState } from "react";
import { signupSchema } from "../schemas/auth-schemas";
import { apiFetch } from "../api/api-config";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { PATHS } from "../lib/constants";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] | null }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(result.data),
      });

      toast.success("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("Error signing up", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 m-auto min-w-96 p-6 ">
        <h2 className="text-2xl font-bold">Sign up</h2>
        <div className="grid gap-2">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-10 rounded border border-gray-300 px-3"
          />
          {errors.name && (
            <span className="text-sm text-red-700">{errors.name[0]}</span>
          )}
        </div>

        <div className="grid gap-2">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-10 rounded border border-gray-300 px-3"
          />
          {errors.email && (
            <span className="text-sm text-red-700">{errors.email[0]}</span>
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
          {loading ? "Processing..." : "Sign up"}
        </button>

        <div>
          <p>
            Have an account?{" "}
            <Link to={PATHS.login} className="text-blue-500 underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
