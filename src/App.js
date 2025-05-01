import './App.css';
import Navbar from './components/navbar/Navbar';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddUser from './components/addUser/AddUser';
import Dashboard from './components/dashboard/Dashboard';
import AllUser from './components/Alluser/AllUser';
import AddDoc from './components/adddoc/AddDoc';
import CreateFolder from './components/folderCreate/CreateFolder';
import Home from './components/home/Home';
import Notices from './components/notices/Notices';
import AddNotice from './components/notices/AddNotice';
import MessageTab from './components/MessageTab'; 
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';

import { useState,useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        console.log("User loaded from localStorage:", JSON.parse(storedUser));
        setUser(JSON.parse(storedUser));
    }
}, []);

  return (
    <div className="App">
      <Navbar setUser={setUser} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<Dashboard />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/allUser" element={<AllUser />} />
        <Route path="/addDoc" element={<AddDoc />} />
        <Route path="/createFolder" element={<CreateFolder />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/add-notice" element={<AddNotice />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp/>} />
        {/* <Route 
          path="/messages" 
          element={<MessageTab currentUser="user1" recipientUserId="user2" />} 
        /> */}
        <Route 
        path="/chat/:recipientUserId/:recipientName" 
        element={<MessageTab currentUser={user?.uid} currentUserName={user?.name} />} 
        />
        



        {/* <Route 
          path="/chat/:recipientUserId" 
          element={<MessageTab currentUser="user1" />} 
        /> */}
        

        
        <Route path="*" element={<Home />} /> {/* Redirect to Home for unmatched routes */}
      </Routes>
    </div>
  );
}

export default App;
