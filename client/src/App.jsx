import HomePage from "./Component/HomePage";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import ListProduct from "./Component/ListProduct";
import Header from "./Component/Header";

import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  
  let user = JSON.parse(localStorage.getItem("userTest"));
  let [refresh, setRefresh] = useState(false);
  let handleRefreshApp = () => {
    setRefresh(!refresh);
  };
  return (
    <BrowserRouter>
      <Header handleRefreshApp={handleRefreshApp} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="login"
          element={<Login handleRefreshApp={handleRefreshApp} />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/list-product"
          element={
            user && user?.userName && user?.accessToken ? (
              <ListProduct />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
