import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-blue-100 rounded-full blur-[140px] opacity-40"></div>
      </div>

      <div className="max-w-3xl text-center space-y-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight">
          Build Powerful{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Automation
          </span>
          <br />
          With <span className="text-blue-600">TriggerFlow</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          TriggerFlow helps you visually create advanced trigger-action
          workflows. Connect events, automate execution, and build scalable
          systems without writing complex logic.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/signup"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-blue-300/40"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 rounded-lg border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-semibold text-gray-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
