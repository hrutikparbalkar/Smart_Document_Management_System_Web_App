import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        toast.success("Logged out successfully!", { autoClose: 2000 });

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <>
            <nav className="bg-gray-900 text-white py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center px-6">
                    {/* Brand Name */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition duration-300"
                    >
                        📄 Document Management System
                    </Link>

                    {/* Navigation Links */}
                    <ul className="flex items-center space-x-6 text-lg font-medium">
                        {user && (
                            <>
                                <Link to="/view" className="hover:text-blue-300 transition duration-300">
                                    <li>📂 View</li>
                                </Link>
                                <Link to="/notices" className="hover:text-blue-300 transition duration-300">
                                    <li>📢 Notices</li>
                                </Link>
                                
                            </>
                        )}

                        {/* Admin-only Links */}
                        {user?.role === "admin" && (
                            <>
                                <Link to="/allUser" className="hover:text-blue-300 transition duration-300">
                                    <li>👥 Manage Users</li>
                                </Link>
                                <Link to="/addDoc" className="hover:text-blue-300 transition duration-300">
                                    <li>➕ Add Doc</li>
                                </Link>
                                <Link to="/addUser" className="hover:text-blue-300 transition duration-300">
                                    <li>➕ Add User</li>
                                </Link>
                            </>
                        )}

                        {/* User Info & Authentication */}
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-green-400 font-semibold">
                                    👋 Welcome, {user.name}!
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                                >
                                     Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md">
                                    ✍️ Login
                                </button>
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </>
    );
};

export default Navbar;
