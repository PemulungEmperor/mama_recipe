import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/editProduct.css";

const DetailRecipe = () => {
  const [product, setProduct] = useState([]);
  const location = useLocation();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    //title
    document.title = "Mama Recipe - detail recipe";
    // animation
    AOS.init({ duration: 1000 });
    //  scroll to top
    window.scrollTo(0, 0);
    // get product
    if (location.state) {
      setProduct(location.state.detailProduct);
    }
  }, [location, id]);

  //conditonal render
  let productTitle = (
    <h1 className="text-center" style={{ color: "#2E266F", margin: "5vh 0vh 5vh 0vh" }}>
      {product.food_name}
    </h1>
  );

  // <i id="editProduct" className="fa-regular fa-pen-to-square ms-3" style={{ "color": "#EFC81A", "margin": "2px 0px 0px 4px" }} data-bs-toggle="modal" data-bs-target="#exampleModal"></i> <i id="editProduct"  className="text-danger fa fa-trash" style={{ "color": "#EFC81A", "margin": "2px 0px 0px 4px" }} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
  return (
    <div>
      <div className="container" data-aos="fade-up">
        <div className="row d-flex justify-content-center align-items-center p-5">
          {productTitle}
          <div className="col d-flex justify-content-center position-relative">
            <img className="img-fluid p-0 m-0 rounded-3 mb-3" src={"/img/" + product.photo_path} alt="" style={{ width: "40%", height: "40%", maxWidth: "40%" }} />

            <div className="position-absolute bottom-0" style={{ marginLeft: "30vh" }}>
              <button className="btn">
                <img src="/img/icon/Group 74.png" alt="like" />
                <p className="bg-danger text-white rounded-5 mt-1">{product.like_count}</p>
              </button>
            </div>
            <div className="position-absolute bottom-0" style={{ marginLeft: "50vh" }}>
              <button className="btn">
                <img src="/img/icon/Group 73.png" alt="save" />
                <p className="bg-danger text-white rounded-5 mt-1">{product.save_count}</p>
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg">
            <h3>Ingredients</h3>
            <p style={{ marginTop: "25px", lineHeight: "30px", fontSize: "20px" }}> - {product.ingredients}</p>
          </div>
        </div>

        <div className="row" style={{ marginTop: "10vh" }}>
          <div className="col-lg">
            <h3>Video Recipe</h3>
            <div className="ratio ratio-16x9 mt-3">
              <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${product.video_recipe}`}
                title="Food"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        {/* <div className="row" style={{ marginTop: "10vh" }}>
          <form action="">
            <div className="col-lg">
              <div className="mb-3">
                <textarea className="form-control rounded-2" id="exampleFormControlTextarea1" placeholder="Comment :" rows="10" style={{ backgroundColor: "#F6F5F4" }}></textarea>
              </div>
              <div className="d-flex justify-content-center m-2">
                <button type="button" className="btn mb-3 p-2 rounded-2 text-white" style={{ backgroundColor: "#EFC81A", width: "350px", fontSize: "10px", height: "40px" }}>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div> */}
      </div>

      {/* Modal edit product */}
      {/* <form>
        <div className="modal fade" id="exampleModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Recipe
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div>
                  <label className="mb-2" htmlFor="name">
                    Title :{" "}
                  </label>
                  <div className="input-group mb-3">
                    <input type="text" name="name" className="form-control" />
                  </div>
                </div>

                <div>
                  <label className="mb-2" htmlFor="name">
                    Ingredients :{" "}
                  </label>
                  <div className="input-group mb-3">
                    <input type="text" name="name" className="form-control" />
                  </div>
                </div>

                <div>
                  <label className="mb-2" htmlFor="name">
                    Video :{" "}
                  </label>
                  <div className="input-group mb-3">
                    <input type="text" name="name" className="form-control" />
                  </div>
                </div>

                <div>
                  <label className="mb-2" htmlFor="photo">
                    Upload New Photo Product :{" "}
                  </label>
                  <div className="input-group mb-3">
                    <input type="file" name="photo" className="form-control" />
                  </div>

                  <div className="d-flex justify-content-center">
                    <img className="img-fluid" alt="" src={"/img/" + product.photo_path} style={{ width: "100px", height: "100px", borderRadius: "100px" }} />
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
      </form> */}

      {/* Comment Section */}
      <div className="container mb-3" data-aos="fade-up">
        <div className="row" style={{ marginTop: "10vh" }}>
          <h1 style={{ marginBottom: "8vh" }}>Comment</h1>
          <div className="col-lg-1">
            <img className="img-fluid rounded-circle" src={require("../img/icon/fake.jpg")} alt="" style={{ maxWidth: "75px" }} />
          </div>
          <div className="col-lg-10 ms-4 mt-3">
            <div className="">
              <strong>Marcelle R</strong>
            </div>
            <div>
              <p>Nice Recipe. Simple And Delicious, Thankyou</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRecipe;
