import React, { useState } from "react";
import { auth, db } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        last:"",
        email: "",
        password: "",
        role: "user",  // Default role is "user"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Store user data in Firestore 
            await setDoc(doc(db, "loginData", user.uid), {
                uid: user.uid,
                name: formData.name,
                email: formData.email,
                last:formData.last,
                role: formData.role,
                password:formData.password
            });

            toast.success("Account created successfully!");
            setTimeout(() => navigate("/login"), 2000);  // Redirect after 2 seconds

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold" htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold" htmlFor="name">Last</label>
                    <input
                        id="last"
                        name="last"
                        type="text"
                        value={formData.last}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
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
                    <label className="block font-semibold" htmlFor="role">Select Role</label>
                    <select
                        id="role"
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
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
            </p>
            
            {/* Toast Container for notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Signup;
