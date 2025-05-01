import React, { useEffect, useState } from "react";
import { db } from "../firebase/Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { ThreeCircles } from 'react-loader-spinner'

const AllUser = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const loginDataRef = collection(db, "loginData"); // Fetching from loginData

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const data = await getDocs(loginDataRef);
            const users = data.docs.map((item) => ({ id: item.id, ...item.data() }));
            setUserData(users);
            setLoading(false)
        }
        getData();
    }, []);

    // Delete User Function
    const handleDelete = async (userId) => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          });
      
          if (result.isConfirmed) {
            await deleteDoc(doc(db, "loginData", userId));
            setUserData((prev) => prev.filter((user) => user.id !== userId));
      
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success"
            });
          }
      
        } catch (error) {
          console.error("Error deleting document: ", error);
          Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
    };
      

    // Handle Chat (Navigate to Chat Page)
    const handleChat = (userId, userName) => {
        navigate(`/chat/${userId}/${userName}`);
    };
    
    

    return (
        <div>
            {
                loading ? <div className="flex items-center justify-center h-screen"><ThreeCircles color="#233142"/></div>:
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Sr No</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">First Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Last Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y divide-gray-200">
                    {userData.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{user.last}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button 
                                    onClick={() => alert(`Edit ${user.email}`)} 
                                    className="text-blue-600 hover:text-blue-800 px-2 py-1">
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(user.id)} 
                                    className="ml-4 text-red-600 hover:text-red-800 px-2 py-1">
                                    Delete
                                </button>
                                <button 
                                    onClick={() => handleChat(user.id, user.name)} 
                                    className="ml-4 text-green-600 hover:text-green-800 px-2 py-1"
                                >
                                    Chat
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            }
        </div>
    );
};

export default AllUser;
