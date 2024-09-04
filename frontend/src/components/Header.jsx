import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
// import store from "../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../utils/constants";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setToggle } from "../redux/MovieSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);

  const logoutHandler = async () => {
    const res = await axios.get(`${API_END_POINT}/logout`);
    if (res.data.success) {
      toast.success(res.data.message);
    }
    dispatch(setUser(null));
    // console.log("Logged Out");
    navigate("/");
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  return (
    <div className="sm:bg-gradient-to-b from-black flex justify-between w-[100%] items-center sm:px-6 absolute px-2 z-20 ">
      <img className="sm:w-[220px] w-[140px]" src={logo} alt="netflix logo" />
      {user && (
      <div className="flex  gap-3 items-center text-white">
        {/* <IoIosArrowDropdown size={25} /> */}
        <h1 className="font-bold text-medium hidden sm:block">{(user.fullName).toUpperCase()}</h1>
        <div className="flex gap-2 ">
          <button
            className="px-4 py-2 bg-red-800 text-white rounded"
            onClick={logoutHandler}
          >
            Logout
          </button>
          <button
            className="px-4 py-2 bg-red-800 text-white rounded"
            onClick={toggleHandler}
          >
            {toggle ? "Home" : "Search"}
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Header;
