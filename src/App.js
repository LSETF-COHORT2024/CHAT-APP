import React, { useContext } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.scss";
import { BrowserRouter,
  Routes,
  Route, 
  Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContexts";

const App = () => {
  const {currentUsers}=useContext(AuthContext)
  const ProtectedRoute = ({children}) =>{
    if (currentUsers) {
      return <Navigate to="/login"/>
    }
    return children
  }

  return (
    <>
    <BrowserRouter>
 <Routes>
  <Route path="/">
    <Route index element={
        <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    } />
    <Route path="register" element={<Register/>} />
    <Route path="login" element={<Login/>} />
  </Route>
 </Routes>
 </BrowserRouter>
</>
  
  )
};

export default App;
