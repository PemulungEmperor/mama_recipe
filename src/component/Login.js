import React, { useEffect, useState } from "react";
import background from "../img/BG.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Login = () => {
  //redux dispatch
  const dispatch = useDispatch();
  const { isError, isPending } = useSelector((state) => state.user);

  // shown password
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("");

  const togglePassword = () => {
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  //for submit form
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  //call api from apiLogincall redux
  //   const [errMsg, setErrMsg] = useState('')

  const goLogin = async (e) => {
    e.preventDefault();
    await loginUser({ email, password }, dispatch);
    localStorage.setItem("token", "dawdawdaw");
  };

  useEffect(() => {
    document.title = "Mama Recipe - Login";
    if (isPending === false && isError === false) {
      showAlert();
    }

    if (isError === true && isPending === true) {
      showAlertError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isPending]);

  //SWEET ALERT
  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Login Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  const showAlertError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong email or password!",
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 rounded-3 bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${background})`, height: "100vh", backgroundSize: " cover", position: "relative", overflow: "hidden" }}>
            <div className="overlay" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "#EFC81A", opacity: "0.65" }}></div>

            <div className="" style={{ position: "absolute" }}>
              <img className="img-fluid" src={require("../img/icon/mamaLogo.png")} style={{ maxWidth: "100px", filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }} alt="logo"></img>
            </div>
          </div>

          <div className="col-sm-6 rounded-3">
            <div className="header"></div>
            <div className="body d-flex flex-column justify-content-center align-items-center">
              <div className="header"></div>
              <div className="body mt-5 mb-3">
                <h3 className="text-center" style={{ color: "#EFC81A" }}>
                  Welcome
                </h3>
                <p className="text-center text-muted mt-4">Log in into your existing account</p>
                <hr />
                <div>
                  <form onSubmit={goLogin}>
                    <div className="form-group text-gray-600">
                      <label className="mb-2 mt-3">E-mail</label>
                      <input id="email" type="email" className="form-control" autoComplete="email" autoFocus required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group text-gray-600">
                      <label className="mb-2 mt-3">Password</label>
                      <div className="input-group bg-white">
                        <input
                          id="passUser"
                          autoComplete="password"
                          type={passwordShown ? "text" : "password"}
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" className="btn btn-light border" onClick={togglePassword}>
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </div>
                    </div>
                    <div className="form-group text-center mt-4">
                      <button type="submit" className="btn btn-oval px-4" style={{ backgroundColor: "#EFC81A", color: "white" }}>
                        Log in
                      </button>
                      <a href="/#" className="btn btn-danger btn-oval shadow px-4 ms-2">
                        Forgot password
                      </a>
                    </div>
                  </form>

                  <div className="mt-4 text-muted text-center">
                    <p>
                      Don't have an account?
                      <Link to="/register"> Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
