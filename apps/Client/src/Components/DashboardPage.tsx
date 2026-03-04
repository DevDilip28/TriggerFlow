import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-7xl mx-auto px-4 lg:px-10 py-16 space-y-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              TriggerFlow Dashboard
            </h1>

            <p className="text-gray-900 text-lg leading-relaxed">
              TriggerFlow lets you build powerful automation workflows using
              triggers and actions. Monitor crypto prices or time-based events
              and automatically execute tasks such as sending email
              notifications or placing trades.
            </p>

            <p className="text-gray-900 leading-relaxed">
              Start by creating a trigger node. Then drag an edge from the
              trigger to add an action. After configuring the action, publish
              the workflow and TriggerFlow will execute it whenever the trigger
              condition is met.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/create-workflow"
                className="px-7 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Create Workflow
              </Link>

              <Link
                to="/view-workflows"
                className="px-7 py-3 border border-gray-300 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition"
              >
                View Workflows
              </Link>

              <button
                onClick={handleLogout}
                className="px-7 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="border border-blue-200 rounded-xl shadow-lg p-2 bg-white">
              <img
                src="/one.png"
                alt="TriggerFlow workflow preview"
                className="rounded-lg w-full max-w-xl"
              />
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center">
            How TriggerFlow Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">
                1. Create Trigger Node
              </h3>

              <p className="text-gray-900 text-sm leading-relaxed">
                Choose a trigger to start the workflow. Triggers determine when
                your automation should begin. Currently supported triggers
                include Time triggers and Price triggers.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">
                2. Drag Edge & Add Action
              </h3>

              <p className="text-gray-900 text-sm leading-relaxed">
                Drag an edge from the trigger node. This opens the action
                configuration panel where you can select what should happen
                after the trigger fires.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">
                3. Publish Workflow
              </h3>

              <p className="text-gray-900 text-sm leading-relaxed">
                Once your workflow is ready, click Publish. TriggerFlow will
                automatically monitor the trigger condition and execute the
                workflow when the condition is met.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center">
            Supported Triggers & Actions
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">⏱ Time Trigger</h3>
              <p className="text-sm text-gray-900">
                Start workflows after a specified delay.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">📈 Price Trigger</h3>
              <p className="text-sm text-gray-900">
                Execute workflows when crypto price conditions are met.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">📩 Send Email</h3>
              <p className="text-sm text-gray-900">
                Send automated notifications after trigger execution.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">💰 Execute Trade</h3>
              <p className="text-sm text-gray-900">
                Place automated trades using Backpack Exchange API.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-xl bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">
            Security & Trading Disclaimer
          </h2>

          <p className="text-sm text-gray-900 leading-relaxed">
            TriggerFlow supports automated crypto trading using the Backpack
            Exchange API. To execute trades, users must provide valid Backpack
            API credentials including an API Key and API Secret.
          </p>

          <p className="text-sm text-gray-900 mt-3 leading-relaxed">
            These credentials are required to authorize trade execution on
            behalf of your account. If valid API credentials are not provided,
            trade actions will failed.
          </p>

          <p className="text-sm text-gray-900 mt-3 leading-relaxed">
            Automated trading carries financial risk. TriggerFlow is a
            development project and should be used at your own risk. The
            platform is not responsible for any financial losses resulting from
            automated workflows or trading strategies.
          </p>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
