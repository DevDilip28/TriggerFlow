import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SignInSchema } from "@triggerflow/common";
import axios from "axios";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const parsed = SignInSchema.safeParse(formData);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://triggerflow-production.up.railway.app/api/auth/login",
        parsed.data,
        { withCredentials: true },
      );

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-white px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-100 rounded-full blur-[150px] opacity-40"></div>
      </div>

      <div className="flex flex-col justify-center px-8 lg:px-20 py-12 lg:w-1/2 space-y-8 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 tracking-tight">
          Welcome Back to <span className="text-blue-600">TriggerFlow</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
          Continue building powerful automation workflows. Connect triggers,
          execute actions, and scale your systems effortlessly.
        </p>
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Login</h2>
              <p className="text-gray-500 text-sm">
                Access your workflow dashboard
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-blue-300/40 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-500 font-semibold transition"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
