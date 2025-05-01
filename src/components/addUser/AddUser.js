import React, { useState } from "react";
import { auth, db } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    last: "",
    email: "",
    password: "",
    role: "user", // Default role as 'user'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user data in loginData collection
      await setDoc(doc(db, "loginData", user.uid), {
        uid: user.uid,
        name: formData.name,
        last: formData.last,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      });

      Swal.fire({
        text: 'User added successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      // Clear form data
      setFormData({
        name: "",
        last: "",
        email: "",
        password: "",
        role: "user",
      });
      navigate('/allUser')
    } catch (error) {
      Swal.fire({
        text: 'User not added',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Add User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block mb-2 text-gray-700 font-medium"
            htmlFor="name"
          >
            First Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 shadow-sm transition duration-200 outline-none"
            placeholder="Enter first name"
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-gray-700 font-medium"
            htmlFor="last"
          >
            Last Name
          </label>
          <input
            id="last"
            type="text"
            value={formData.last}
            onChange={(e) => setFormData({ ...formData, last: e.target.value })}
            className="w-full px-5 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 shadow-sm transition duration-200 outline-none"
            placeholder="Enter last name"
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-gray-700 font-medium"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-5 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 shadow-sm transition duration-200 outline-none"
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-gray-700 font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-5 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 shadow-sm transition duration-200 outline-none"
            placeholder="Enter password"
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-gray-700 font-medium"
            htmlFor="role"
          >
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-5 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 shadow-sm transition duration-200 outline-none"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transition duration-300"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
