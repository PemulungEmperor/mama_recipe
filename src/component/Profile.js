import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import ProfileRecipe from "./ProfileRecipe";
import Swal from "sweetalert2";

// api
import API_URL from "../backend";

const Profile = () => {
  //credentials from jwt
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  //state for update profile
  const [newAvatar, setnewAvatar] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [newName, setNewName] = useState("");

  //active is to handle handle components tab change
  const [active, setActive] = useState("");

  const [productResult, setProductResult] = useState([]);
  const [userId, setUserId] = useState();
  const a = "No Data......... Cooming Soon";

  const navigate = useNavigate();
  const { id } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(`${API_URL}/token`);
      const decode = jwt_decode(response.data.accessToken);
      setName(decode.username);
      setAvatar(decode.photo);
      setUserId(decode.userId);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };
  const getAllProduct = async () => {
    const response = await axios.get(`${API_URL}/productUser/${id}`);
    setProductResult(response.data);
  };

  //photo preview
  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    if (e.target.files.length !== 0) {
      setPreviewImage(URL.createObjectURL(uploaded));
      setnewAvatar(uploaded);
    }
  };

  //edit profile
  const saveChanges = async (e) => {
    e.preventDefault();

    if (!newAvatar && !newName) {
      showAlertError();
    } else if (newAvatar) {
      let formData = new FormData();
      formData.append("username", name);
      formData.append("photoPath", newAvatar);

      fetch("/update/profile/" + userId, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            console.log("Success");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      showAlert();
    } else if (newName) {
      try {
        await axios.post(`${API_URL}/update/username/${userId}`, { username: newName });
        showAlert();
      } catch (e) {
        console.log(e.response.message);
      }
    }
  };
  // end edit profile

  //child components tab
  const tabMyRecipe = () => {
    setActive("MyRecipe");
    getAllProduct();
  };

  const tabSavedRecipe = () => {
    setActive("SavedRecipe");
    getAllProduct();
  };

  const tabLikedRecipe = () => {
    setActive("LikedRecipe");
    getAllProduct();
  };

  //use Effect
  useEffect(() => {
    document.title = "Mama Recipe - Profile";
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //SWEET ALERT
  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Profile updated!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location = "/";
    });
  };

  const showAlertError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: " Looks like your data has not changed!",
    });
  };
  return (
    <div>
      <div className="container">
        <div className="row" style={{ marginTop: "15vh" }}>
          <div className="col-lg-12 d-flex justify-content-center">
            <img className="img-fluid object-fit-cover" src={avatar ? "/img/userPhoto/" + avatar : "/img/icon/user.png"} alt="" style={{ width: "120px", maxWidth: "120px", maxHeight: "120px", height: "120px", borderRadius: "100px" }} />
          </div>
          <div className="d-flex justify-content-center mt-1">
            <label htmlFor="profilePic">
              {name} <i className="fa-regular fa-pen-to-square" style={{ color: "#EFC81A", margin: "2px 0px 0px 4px" }} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </label>
          </div>
        </div>
        {/* Modal edit profile */}
        <form onSubmit={saveChanges}>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Profile
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div>
                    <label className="mb-2" htmlFor="name">
                      Name :{" "}
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setNewName(e.target.value);
                          setName(e.target.value);
                        }}
                        name="name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2" htmlFor="photo">
                      Upload New Photo Profile :{" "}
                    </label>
                    <div className="input-group mb-3">
                      <input type="file" name="photo" className="form-control" onChange={handleUploadChange} />
                    </div>
                    <div className="d-flex justify-content-center">
                      <img className="img-fluid" src={previewImage ? previewImage : avatar ? "/img/userPhoto/" + avatar : "/img/icon/user.png"} alt="" style={{ width: "100px", height: "100px", borderRadius: "100px" }} />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="row mt-5">
          <ul className="d-flex" style={{ listStyleType: "none" }}>
            <li onClick={tabMyRecipe} className={active === "MyRecipe" ? "profileFirstTab text-warning" : "text-muted"} style={{ cursor: "pointer" }}>
              My Recipe
            </li>
            <li onClick={tabSavedRecipe} className={active === "SavedRecipe" ? "profileTabItem text-warning" : "profileTabItem text-muted"} style={{ cursor: "pointer" }}>
              Saved Recipe
            </li>
            <li onClick={tabLikedRecipe} className={active === "LikedRecipe" ? "profileTabItem text-warning" : " profileTabItem text-muted"} style={{ cursor: "pointer" }}>
              Liked Recipe
            </li>
          </ul>
        </div>
      </div>
      <hr />

      {active === "" && <p className="ms-5 text-warning">Select to check your recipe!</p>}
      {active === "MyRecipe" && <ProfileRecipe productResult={productResult} />}
      {active === "SavedRecipe" && <p className="ms-5">{a}</p>}
      {active === "LikedRecipe" && <p className="ms-5">{a}</p>}

      <footer className="container-fluid" style={{ marginTop: "20vh", padding: "10px", backgroundColor: "#EFC81A", left: "0", bottom: "0" }}>
        <div className="row" style={{ margin: "35px 10px 10px 15px" }}>
          <ul className="d-flex justify-content-center" style={{ listStyleType: "none" }}>
            <li className="footerItem">
              <a className="text-muted" href="/#">
                Product
              </a>
            </li>
            <li className="footerItem">
              <a className="text-muted" href="/#">
                Company
              </a>
            </li>
            <li className="footerItem">
              <a className="text-muted" href="/#">
                Learn More
              </a>
            </li>
            <li className="footerItem">
              <a className="text-muted" href="/#">
                Get In Touch
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
