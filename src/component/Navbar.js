import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { logoutUser } from "../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";

// api
import API_URL from "../backend";

const Navbar = () => {
  //redux
  const dispatch = useDispatch();
  const { isError, isPending } = useSelector((state) => state.logout);

  const [isLogin, setIsLogin] = useState(false);
  //credentials from jwt
  const [userId, setUserId] = useState();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [userList, setUserList] = useState([])
  // const [token, setToken] = useState('')
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${API_URL}/token`);
      // setToken(response.data.accessToken)
      const decode = jwt_decode(response.data.accessToken);
      localStorage.setItem("token", response.data.accessToken);
      // console.log(decode)
      setUserId(decode.userId);
      setName(decode.username);
      setAvatar(decode.photo);
      setIsLogin(true);
      setExpire(decode.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentData = new Date();
      if (expire * 1000 < currentData.getTime()) {
        const response = await axios.get(`${API_URL}/token`);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        // setToken(response.data.accessToken)
        const decode = jwt_decode(response.data.accessToken);
        setUserId(decode.userId);
        setName(decode.name);
        setAvatar(decode.photo);
        setIsLogin(true);
        setExpire(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject();
    }
  );

  // Logout
  const goLogout = async (e) => {
    if (isPending === null && isError === null) {
      await logoutUser(dispatch);
    }
  };

  //use effet
  useEffect(() => {
    refreshToken();
    if (isError === false && isPending === false) {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isPending]);

  // rendering conditional
  let profileElement;

  if (window.location.pathname === "/") {
    profileElement = (
      <ul className="navbar-nav mb-2 mb-lg-0 ms-auto" style={{ marginRight: "25vh" }}>
        <li className="nav-item dropdown">
          <Link to="/login" className="nav-link" href="/" id="navbarDropdown" role="button" data-bs-toggle={isLogin ? "dropdown" : ""}>
            <img className="position-relative rounded-5" alt="" src={avatar || avatar === "undefined" ? `/img/userPhoto/` + avatar : "/img/icon/user.png"} width="50" style={{ width: "50px", height: "50px" }} />
            <span className="position-absolute translate-middle p-2 bg-success border border-light rounded-circle"></span>
            <span className="visually-hidden"></span>
            <span className="ms-2" style={{ color: "black", position: "absolute", marginTop: "2vh" }}>
              {isLogin ? name : "Login"}
            </span>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={goLogout} style={{ color: "black" }}>
                Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </li>
            {/* if error from redux state */}
          </ul>
        </li>
      </ul>
    );
  } else {
    profileElement = <div></div>;
  }
  return (
    <div>
      <nav id={window.location.pathname === "/" ? "gradbox" : ""} className="navbar navbar-expand-lg top-0" style={{ backgroundColor: "#FFF5EC" }}>
        <div className="container-fluid">
          <div className="navbar-brand"></div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-2">
                <Link className="nav-link" style={{ textDecoration: "underline" }} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item me-2">
                <Link className="nav-link" to={isLogin ? "/add-recipe/" + userId : "/login"}>
                  Add Recipe
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={isLogin ? "/profile/" + userId : "/login"}>
                  Profile
                </Link>
              </li>
              <li>{isError ? <p className="nav-item m-3 text-danger">something when wrong</p> : ""}</li>
            </ul>

            {/* <div>
          <button className='btn btn-info' onClick={getUsers}>Get</button>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
              {userList.map((user, index)=> (
                <tr key={user.id}>
                <td>{index+1}</td>
                <td>{user.username}</td>
              </tr>
              ))}
          </tbody>
        </table> */}
            {profileElement}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
