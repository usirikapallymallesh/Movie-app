import React, { useState } from "react";
import Header from "./Header";
import background from "../assets/loginBackground.jpg";
import axios from "axios";
import { API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const loading = useSelector((store) => store.app.loading);
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (isLogin) {
      // LOGIN
      dispatch(setLoading(true));
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
        // console.log(res);

        dispatch(setUser(res.data.user));
        // console.log(res);
        navigate("/browse");
      } catch (e) {
        toast.error(e.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      // register
      dispatch(setLoading(true));
      const user = { email, password, fullName };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
        setIsLogin(true);
      } catch (e) {
        // console.log(e);
        toast.error(e.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    }

    setFullName("");
    setEmail("");
    setPassword("");
    setButtonClicked(false);
  };

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className=" bg-black relative sm:h-[100vh] overflow-hidden  h-[45rem] sm:overflow-hidden">
      <Header />
      <div className="sm:absolute -z-0 sm:w-[100vw] sm:h-[100vh] absolute h-[100vh] w-[100vw]  border-yellow-950">
        <img
          className="sm:w-full brightness-50 hidden sm:block"
          src={background}
          alt="background image"
        />
      </div>
      <form
        action=""
        className=" absolute sm:bg-black sm:p-12 top-11 flex flex-col sm:my-32 my-36 mx-auto items-center  justify-center left-0 right-0 sm:w-3/12  opacity-90 rounded-md "
        onSubmit={submitHandler}
      >
        <h1 className="text-white text-3xl mb-5 font-bold">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <div className="flex flex-col  w-11/12">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none p-3 my-2 rounded-sm w-full bg-gray-800 text-white"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm w-full bg-gray-800 text-white"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className=" bg-gray-800 my-2 text-white flex items-center pr-2 ">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Password"
              className="outline-none p-3  rounded-sm w-full bg-gray-800"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          <button
            id="submit-btn"
            disabled={buttonClicked}
            className={`${
              buttonClicked
                ? "bg-red-900 opacity-70 cursor-not-allowed"
                : "bg-red-900 "
            }    py-2 text-base  text-white mt-2 rounded`}
          >
            <div className="flex items-center justify-center">
              {
                loading? (
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  ""
                )
              }
               
              <span>
                {`${loading ? "" : `${isLogin ? "Login" : "sign up"}`}`}
              </span>
             
            </div>
          </button>
          <p className="text-white py-2">
            {isLogin ? "New to Netflix" : " Already have an account"}{" "}
            <span
              className="text-blue-900 cursor-pointer"
              onClick={loginHandler}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
