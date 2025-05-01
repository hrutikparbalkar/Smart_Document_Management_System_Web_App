import React, { useState } from "react";
import { auth, db } from "../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "user", // Default role is user
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Authenticate user
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Fetch user details from Firestore
            const userDoc = await getDoc(doc(db, "loginData", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Check if the selected role matches the stored role
                if (userData.role !== formData.role) {
                    toast.error("Selected role does not match your registered role!");
                    return;
                }

                // Store user data in local storage
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);

                // Show success toast
                toast.success("Login successful!", {
                    onClose: () => {
                        navigate("/"); // Redirect after toast closes
                    }
                });

            } else {
                toast.error("User data not found!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold" htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold" htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Select Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
            </p>

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Login;
