import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.scss";
import { BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
 <Routes>
  <Route path="/">
    <Route index element={<Home/>} />
    <Route path="register" element={<Register/>} />
    <Route path="login" element={<Login/>} />
  </Route>
 </Routes>
 </BrowserRouter>
 </AuthProvider>
</>
  
  )
};

export default App;
