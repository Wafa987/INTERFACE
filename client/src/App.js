
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import Compose from "./pages/Compose";
import Sent from "./pages/Sent";
import ChatLayout from "./pages/ChatLayout";
import Draft from "./pages/Draft";
import Chat from "./pages/Chat";
import ProfileLayout from "./pages/ProfileLayout";

function App() {
  const getProfile = () => {
    if(!localStorage["email"]) {
    const instance = axios.create({
        withCredentials: true
    });

    instance.get(`${process.env.REACT_APP_API_LINK}users/get-user`)
        .then(function (res) {
            localStorage.setItem("user_id", res.data._id)
            localStorage.setItem("email", res.data.email)
        })
      }
  }

  useEffect(() => {
   // getProfile() 
  }, [])
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/profile/" element={<ProfileLayout />}>
            <Route path="/profile/update-profile" element={<Profile />}></Route>
            <Route path="/profile/update-profile-picture" element={<Profile />}></Route>
          </Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/compose" element={<Compose />}></Route>
            <Route path="/inbox" element={<Inbox />}></Route>
            <Route path="/drafts" element={<Draft />}></Route>
            <Route path="/sent" element={<Sent />}></Route>
          
            <Route index element={<Inbox />}></Route>
          </Route>
          <Route path="/chat" element={<Chat />}>
            <Route index element={<Chat />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
