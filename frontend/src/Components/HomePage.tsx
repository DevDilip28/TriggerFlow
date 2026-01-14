import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Welcome to TriggerFlow
            </h1>

            <p className="mt-4 max-w-md text-center text-lg text-gray-600">
                Build visual workflows using triggers and actions to automate your
                tasks.
            </p>

            <Link
                to="/create-workflow"
                className="mt-8 inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
                Create Workflow
            </Link>
        </div>
    );
}

export default HomePage;
