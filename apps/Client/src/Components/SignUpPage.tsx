import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SignUpSchema } from "@triggerflow/common";
import axios from "axios";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const parsed = SignUpSchema.safeParse(formData);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        parsed.data,
        { withCredentials: true },
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-gray-100 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-100 rounded-full blur-[150px] opacity-40"></div>
      </div>

      <div className="flex flex-col justify-center px-8 lg:px-20 py-12 lg:w-1/2 space-y-8 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 tracking-tight">
          Automate Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Workflows
          </span>
        </h1>

        <p className="text-black text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
          Build powerful trigger-action systems visually. Connect services,
          automate processes, and scale your productivity effortlessly with{" "}
          <span className="text-blue-600 font-semibold">TriggerFlow</span>.
        </p>

        <div className="grid grid-cols-2 gap-6 text-black-800 text-sm max-w-md mx-auto lg:mx-0">
          <div>⚡ Real-time Triggers</div>
          <div>🔁 Automated Execution</div>
          <div>📊 Visual Flow Builder</div>
          <div>🔐 Secure Architecture</div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm">
                Start building automated workflows today.
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
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-500 font-semibold transition"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
