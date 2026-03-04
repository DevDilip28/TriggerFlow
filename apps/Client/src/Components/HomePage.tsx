import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="bg-white text-gray-900">
      <section className="max-w-7xl mx-auto px-4 lg:px-10 py-15 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            Build Powerful Workflow Automation with
            <span className="text-blue-600"> TriggerFlow</span>
          </h1>

          <p className="text-gray-900 text-lg leading-relaxed">
            TriggerFlow is a visual automation platform where you create
            workflows using triggers and actions. Monitor events like time or
            market prices and automatically execute actions such as sending
            emails or executing crypto trades.
          </p>

          <p className="text-gray-900 leading-relaxed">
            The platform currently supports automation for crypto trading using
            Backpack Exchange and allows developers to build automation
            workflows without writing complex backend logic.
          </p>

          <div className="flex gap-4 pt-2">
            <Link
              to="/signup"
              className="px-7 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-7 py-3 border border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="border border-blue-200 rounded-xl shadow-lg p-2 bg-white">
            <img
              src="/one.png"
              alt="Workflow automation preview"
              className="rounded-lg w-full max-w-xl"
            />
          </div>
        </div>
      </section>

      <section className="border-t py-15">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            What TriggerFlow Supports
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "⏱ Time Trigger",
                desc: "Execute workflows after a specific delay or scheduled interval.",
              },
              {
                title: "📈 Price Trigger",
                desc: "Monitor crypto prices and trigger workflows when a target price is reached.",
              },
              {
                title: "📩 Send Email",
                desc: "Automatically send email notifications when workflows execute.",
              },
              {
                title: "💰 Execute Trade",
                desc: "Automatically place buy or sell orders through Backpack Exchange.",
              },
              {
                title: "🔗 Visual Workflows",
                desc: "Connect triggers and actions using an intuitive node based workflow builder.",
              },
              {
                title: "⚡ Scalable Automation",
                desc: "Run multiple workflows reliably without manual monitoring.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="order-1 md:order-2 text-center">
            Developed by{" "}
            <span className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
              Dilip
            </span>
          </div>

          <div className="font-semibold text-lg text-blue-600">TriggerFlow</div>

          <div className="order-3 flex items-center gap-5 text-gray-400">
            <a
              href="https://github.com/DevDilip28"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
