import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Document Management System</h1>
        <p className="mt-3 text-lg text-gray-600">
          Store, manage, and access your documents securely from anywhere.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src="/images/upload.svg" alt="Upload" className="mx-auto h-24 mb-4"/>
          <h2 className="text-xl font-semibold">Easy Uploads</h2>
          <p className="text-gray-600 mt-2">Quickly upload and organize your documents.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src="/images/security.svg" alt="Security" className="mx-auto h-24 mb-4"/>
          <h2 className="text-xl font-semibold">Secure Storage</h2>
          <p className="text-gray-600 mt-2">Your files are encrypted and stored safely.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src="/images/access.svg" alt="Access" className="mx-auto h-24 mb-4"/>
          <h2 className="text-xl font-semibold">Anywhere Access</h2>
          <p className="text-gray-600 mt-2">Access your files from any device at any time.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <Link to="">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
