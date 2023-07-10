import Login from "./component/Login"
import MainPage from "./component/MainPage"
import Navbar from "./component/Navbar";
import { BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom" 
import Footer from "./component/Footer";
import Register from "./component/Register";
import AddRecipe from "./component/AddRecipe";
import Profile from "./component/Profile";
import DetailRecipe from "./component/DetailRecipe";
import NotFound from "./component/NotFound";
import UpdateRecipe from "./component/UpdateRecipe";

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  if(token) {
    return <Outlet/>
  } else {
    return <Navigate to="/login"/>
  }
}

function App() {
  return (
    <BrowserRouter>
     <Routes>
     <Route path="" element={<PrivateRoute/>}>
        <Route path="/" element={<><Navbar/><MainPage/><Footer/></>}></Route>
        <Route path="/add-recipe/:id" element={<><Navbar/><AddRecipe/><Footer/></>}></Route>
        <Route path="/update-recipe/:id" element={<><Navbar/><UpdateRecipe/><Footer/></>}></Route>
        <Route path="/profile/:id" element={<><Navbar/><Profile/></>}></Route>
        <Route path="/detail-recipe/:id" element={<><Navbar/><DetailRecipe/><Footer/></>}></Route>

        <Route path="*" element={<NotFound/>} />
       
     </Route>
     <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<><Login/></>}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
