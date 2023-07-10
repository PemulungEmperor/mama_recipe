import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import {  useSelector } from 'react-redux'

// api
import API_URL from "../backend";

const ProfileRecipe = ({ productResult }) => {
  //data from redux
  //  const { dataProducts } = useSelector(state=>state.product)

  const navigate = useNavigate();

  // const deleteProduct = async ()=>{
  //   await axios.delete(`/product/delete/`+productId)
  //   navigate('/')
  // }

  // const setAndDelete = async (id)=>{
  //   setProductId(id)
  //   console.log(productId)
  // }

  const showAlert = () => {
    //   console.log(productId)
    Swal.fire({
      title: "Do you want to delete the product?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        navigate("/");
        window.location.reload();
      } else if (result.isDenied) {
        Swal.fire("Product is not deleted", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="container">
        {/* <h5 className='text-center mt-5'>These are all the recipes you posted</h5> */}
        <div className="row justify-content-center ">
          {productResult.map((product, index) => (
            <div className="col-3 mx-3" key={product.id}>
              <Link to={`/detail-recipe/${product.id}`} state={{ detailProduct: product }} className="text-decoration-none link text-black">
                <img className="img-fluid mb-3" src={"/img/" + product.photo_path} alt="" style={{ padding: "0", maxWidth: "100%", borderRadius: "20px" }} />
              </Link>
              <div className="row">
                <div className="col-6">
                  <p>{product.food_name}</p>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col">
                      <Link to={"/update-recipe/" + product.id}>
                        <button className="btn p-0">
                          <i className=" text-warning fa fa-edit"></i>
                        </button>
                      </Link>
                      <button
                        className="btn p-0 ms-2"
                        onClick={async (e) => {
                          await axios.delete(`${API_URL}/product/delete/` + product.id);
                          showAlert();
                        }}
                      >
                        <i className=" text-danger fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileRecipe;
