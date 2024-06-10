import React from 'react'; import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/home/homepage";
import Login from "./pages/login";

import Signup from "./pages/signup";

import Main from "./pages/main";

import Usergoals from "./pages/Usergoals/Usergoalspage";
import Updateuserpage from "./pages/Updateuser/Updateuserpage";
import Userprofile from "./pages/Userprofile/Userprofilepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";



function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
     
      
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/updateuser" exact element={<Updateuserpage />} />
      <Route path="/userprofile" element={<Userprofile />} />
      <Route path="/goals" element={<Usergoals />} />
    </Routes>
  );

}
export default App;
