import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Loader from "./components/Header/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  ReloadData,
  SetPortfolioData,
  ShowLoading,
} from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";

function App() {
  // const [showLoading, setShowLoading] = useState(false);

  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        "https://portfolio-mern-1-78st.onrender.com/api/portfolio/get-portfolio-data"
      );
      // console.log(response.data);
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching portfolio data:", error);
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    getPortfolioData();
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        {/* Ceated a Page for Log in */}
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
