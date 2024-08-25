import { message } from "antd";
import React from "react";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://portfolio-mern-1-78st.onrender.com/api/portfolio/admin-login",
        user
      );
      console.log("first")
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        // Delay the redirection
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000); // 1 seconds delay
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white">
        <h1 className="text-2xl">Portfolio - Admin Login</h1>
        <hr />
        <input
          className="border border-gray-400 p-2 rounded-md"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />

        <input
          className="border border-gray-400 p-2 rounded-md"
          type="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button className="bg-primary text-white p-2 rounded" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
