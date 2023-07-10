import React, { useEffect, useState } from "react";
import "../style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "./Pagination";
//redux
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/apiCall";

// api
import API_URL from "../backend";

const MainPage = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [productResult, setProductResult] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [latestProduct, setLatestProduct] = useState([]);

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 6;

  // sorting by
  const [selectedOption, setSelectedOption] = useState("");
  const sortOption = ["name", "newest", "oldest"];

  // get latest product
  const LatestProduct = async () => {
    const response = await axios.get(`${API_URL}/latestProduct`);
    setLatestProduct(response.data[0]);
  };
  const Search = async (e) => {
    e.preventDefault();

    if (search.length === 0 || search === "") {
      const response = await axios.get(`${API_URL}/product`);
      setProductResult(response.data);
      // console.log(response.data[0].id)
    } else {
      const response = await axios.get(`${API_URL}/product/${search}`);
      setProductResult(response.data);
    }

    //set search true
    setSearchState(true);

    //scroll to view
    const result = document.getElementById("searchResult");
    result.scrollIntoView();
  };

  //pagination support variables
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = productResult.slice(firstPostIndex, lastPostIndex);

  //sort products function
  const sortProductResult = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "name") {
      setProductResult(
        productResult.sort((a, b) => {
          let fa = a.food_name.toLowerCase(),
            fb = b.food_name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        })
      );
      console.log(productResult);
    } else if (e.target.value === "oldest") {
      setProductResult(
        productResult.sort((a, b) => {
          let da = new Date(a.created_at),
            db = new Date(b.created_at);
          return da - db;
        })
      );
      console.log(productResult);
    } else if (e.target.value === "newest") {
      setProductResult(
        productResult.sort((a, b) => {
          let da = new Date(a.created_at),
            db = new Date(b.created_at);
          return db - da;
        })
      );
      console.log(productResult);
    }
  };

  //conditional rendering for title after search
  let resultTitle;

  if (productResult.length > 0) {
    resultTitle = (
      <div className="row mb-3">
        <div id="yellowStripe" className="col-lg">
          <h3 className="ms-5" id="newRecipeText">
            All Result By:
          </h3>
          <div className="d-flex justify-content-center">
            <select className="form-select form-select-lg ms-4 w-100" value={selectedOption} onChange={(e) => sortProductResult(e)}>
              {sortOption.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  } else if (searchState === true) {
    resultTitle = (
      <div className="row mb-3">
        {" "}
        <div id="yellowStripe" className="col-lg">
          <h3 className="ms-5" id="newRecipeText">
            No Result Found ....
          </h3>
        </div>
      </div>
    );
  }

  useEffect(() => {
    document.title = "Mama Recipe - Home Page";
    getProducts(dispatch);
    LatestProduct();
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ backgroundColor: "#FFF5EC" }}>
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center" style={{ height: "80vh" }}>
            <div className="m-5">
              <h1 className="discoverText" style={{ color: "#2E266F" }}>
                <p>
                  Discover Recipe <br />& Delicious Food
                </p>
              </h1>
              <form className="d-flex form">
                <input id="sb" className="form-control me-2 rounded-3 p-3" type="search" size="45" placeholder="&#xF002; Search" value={search} onChange={(e) => setSearch(e.target.value)} style={{ fontFamily: "Arial, FontAwesome" }} />
                <button className="btn btn-info" hidden onClick={Search}>
                  Get
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-4" style={{ backgroundColor: "#EFC81A" }}></div>

          <div className="d-flex justify-content-center position-absolute" style={{ display: "none" }}>
            <img className="img-fluid position-absolute" id="LpImg1" alt="" src={require("../img/l.png")} />
            <img className="img-fluid position-absolute" id="LpImg2" alt="" src={require("../img/l2.png")} />
            <img className="img-fluid position-absolute" id="LpImg3" alt="" src={require("../img/dot.png")} />
            <img className="img-fluid position-absolute" id="LpImg4" alt="" src={require("../img/dot.png")} />
          </div>
        </div>
      </div>

      <div className="container-fluid" id="searchResult" style={{ marginTop: "10vh" }}>
        {resultTitle}
        <div className="row d-flex" style={{ marginTop: "1vh" }}>
          {currentPost.map((product, index) => (
            <div className="col-3 mx-5 my-3" key={product.id} data-aos="zoom-in">
              <Link to={`/detail-recipe/${product.id}`} state={{ detailProduct: product }} className="text-decoration-none link" style={{ zIndex: "1", marginTop: "-15vh", fontSize: "20px", color: "#3F3A3A" }}>
                <img className="img-fluid mb-2" src={"/img/" + product.photo_path} alt="" style={{ width: "100%", borderRadius: "20px" }} />
                {product.food_name}
              </Link>
            </div>
          ))}
        </div>
        <Pagination totalPosts={productResult.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>

      {/* Recipe With highest saved (must have category but i I haven't created the database yet lol) */}
      <div className="container-fluid" data-aos="fade-up">
        <div className="row mb-3">
          <div id="yellowStripe" className="col-lg">
            <h3 className="ms-5" id="popularText">
              Popular For You !
            </h3>
          </div>
        </div>
        <div className="row mx-3" style={{ marginTop: "1vh" }}>
          <div className="col-5">
            <img className="img-fluid rounded-3" src={require("../img/pizza.png")} style={{ maxWidth: "85%" }} alt="" />
            <p className="text-dark m-3" style={{ "zIndex:1; fontSize": "20px" }}>
              Pizza
              <br />
              Lamoa{" "}
            </p>
          </div>
          <div className="col-5">
            <img className="img-fluid rounded-3" src={require("../img/burger.png")} style={{ maxWidth: "85%" }} alt="" />
            <p className="text-dark m-3" style={{ "zIndex:1; fontSize": "20px" }}>
              King
              <br />
              Burger
            </p>
          </div>
        </div>
      </div>

      {/* New Recipe Store / add in here */}
      <div className="container-fluid" style={{ marginTop: "1vh" }} data-aos="fade-up">
        <div className="row mb-3">
          <div id="yellowStripe" className="col-lg">
            <h3 className="ms-5" id="newRecipeText">
              New Recipe
            </h3>
          </div>
        </div>
        <div id="yellowSpot" className="row" style={{ marginTop: "1vh", height: "75vh" }}>
          <div className="col-lg-6"></div>

          <div className="d-flex justify-content-start position-absolute" style={{ display: "none" }}>
            <img className="img-fluid p-1" style={{ maxWidth: "40%" }} id="newRecipeImg" alt="" src={"/img/" + latestProduct.photo_path} />
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="newRecipe" style={{ marginTop: "30vh" }}>
              <h2>
                {latestProduct.food_name}
                <br />
                (New + Delicious)
              </h2>
              <hr
                style={{
                  maxWidth: "20%",
                  border: "none",
                  height: "3px",
                  background: "black",
                  opacity: "75%",
                }}
              />
              <p>
                New + Delicious {latestProduct.food_name}
                <br />
                Try Our Latest Recipe In Here!
              </p>
              <Link to={`/detail-recipe/${latestProduct.id}`} state={{ detailProduct: latestProduct }} className="btn text-white position-relative" style={{ backgroundColor: "#EFC81A", fontSize: "10px", maxWidth: "40%", padding: "3%" }}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe With highest liked */}
      <div className="container-fluid" style={{ marginTop: "25vh", paddingBottom: "20vh", backgroundColor: "#FFF5EC" }} data-aos="fade-up">
        <div className="row mb-3">
          <div id="yellowStripe" className="col-lg">
            <h3 className="ms-5" id="newRecipeText">
              Popular Recipe
            </h3>
          </div>
        </div>
        <div className="row d-flex justify-content-center" style={{ marginTop: "1vh" }}>
          <div className="col-3">
            <img className="img-fluid" src={require("../img/kare.png")} alt="" style={{ padding: "0", maxWidth: "100%", borderRadius: "20px" }} />

            <p className=" m-2" style={{ zIndex: "1", marginTop: "-15vh", fontSize: "20px", color: "#3F3A3A" }}>
              Chicken
              <br />
              Kare{" "}
            </p>
          </div>
          <div className="col-3">
            <img className="img-fluid" src={require("../img/dumplings.png")} alt="" style={{ padding: "0", maxWidth: "100%", borderRadius: "20px" }} />
            <p className=" m-2" style={{ zIndex: "1", marginTop: "-15vh", fontSize: "20px", color: "#3F3A3A" }}>
              Bomb
              <br />
              Chicken{" "}
            </p>
          </div>
          <div className="col-3">
            <img className="img-fluid" src={require("../img/smoothie.png")} alt="" style={{ padding: "0", maxWidth: "100%", borderRadius: "20px" }} />
            <p className="m-2" style={{ zIndex: "1", marginTop: "-15vh", fontSize: "20px", color: "#3F3A3A" }}>
              Banana
              <br />
              Smothie Pop{" "}
            </p>
          </div>
        </div>

        <div className="row d-flex justify-content-center" style={{ marginTop: "1vh" }}>
          <div className="col-3">
            <img className="img-fluid" src={require("../img/cake.png")} alt="" style={{ padding: "0", maxWidth: "100%", borderRadius: "20px" }} />
            <p className=" m-2" style={{ zIndex: "1", marginTop: "-15vh", fontSize: "20px", color: "#3F3A3A" }}>
              Coffe Lava
              <br />
              Cake{" "}
            </p>
          </div>
          <div className="col-3">
            <img className="img-fluid" src={require("../img/salmon.png")} alt="" style={{ padding: "0", maxWidth: "100%", borderRadius: "20px" }} />
            <p className=" m-2" style={{ zIndex: "1", marginTop: "-15vh", fontSize: "20px", color: "#3F3A3A" }}>
              Sugar
              <br />
              Salmon{" "}
            </p>
          </div>
          <div className="col-3">
            <img className="img-fluid" src={require("../img/salad.png")} alt="" style={{ padding: "0", maxWidth: "100%", borderRadius: "20px" }} />
            <p className=" m-2" style={{ zIndex: "1", marginTop: "-15vh", fontSize: "20px", color: "#3F3A3A" }}>
              Indian
              <br />
              Salad{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
