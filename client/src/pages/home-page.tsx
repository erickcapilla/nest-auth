import { useAuth } from "../hooks/use-auth";

export default function HomePage() {
  const { logout } = useAuth();

  return (
    <div className="p-2">
      <h1>Logging in successful</h1>
      <button onClick={logout} className="mt-4 text-red-500">
        Logout
      </button>
    </div>
  );
}
