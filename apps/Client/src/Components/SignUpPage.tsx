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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const parsed = SignUpSchema.safeParse(formData);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/api/auth/signup", parsed.data, {
        withCredentials: true,
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-15 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Start Building with
            <span className="text-blue-600"> TriggerFlow</span>
          </h1>

          <p className="text-gray-900 text-lg leading-relaxed">
            Create powerful automation workflows using triggers and actions.
            Monitor events like time or crypto prices and automatically execute
            actions such as sending emails or executing trades.
          </p>

          <p className="text-gray-900 leading-relaxed">
            TriggerFlow allows developers and traders to build automation
            systems without writing complex backend logic.
          </p>

          <div className="grid grid-cols-2 gap-4 text-lg text-gray-900 pt-1">
            <div>⚡ Real-time Triggers</div>
            <div>🔁 Automated Execution</div>
            <div>📊 Visual Workflow Builder</div>
            <div>🔐 Secure Architecture</div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Create your account</h2>
                <p className="text-sm text-gray-500">
                  Start automating workflows today
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
