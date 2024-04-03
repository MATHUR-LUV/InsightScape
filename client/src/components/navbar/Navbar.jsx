import React, { useContext } from "react";
import Logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import "./Navbar.scss";
import { AuthContext } from "../../context/authContext";
const Navbar = () => {

    const { currentUser, logout} = useContext(AuthContext);
    // const navigate = useNavigate();
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                    <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=art">
                        <h6>ART</h6>
                    </Link>
                    <Link className="link" to="/?cat=science">
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link className="link" to="/?cat=technology">
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link className="link" to="/?cat=cinema">
                        <h6>CINEMA</h6>
                    </Link>
                    <Link className="link" to="/?cat=sports">
                        <h6>SPORTS</h6>
                    </Link>
                    <Link className="link" to="/?cat=food">
                        <h6>FOOD</h6>
                    </Link>
                    <Link className="link" to="/?cat=others">
                        <h6>OTHERS</h6>
                    </Link>
                    <span style={{cursor:"auto"}}>{currentUser?.username}</span>
                    {currentUser? <span onClick={logout} >LOGOUT</span> : <Link className="link" to="/login" style={{textDecoration:"none", color:"gold", fontSize:"18px"}}>LOGIN</Link>}
                    <span className="write">
                        <Link className="link" to="/write" style={{textDecoration:"none", color:"white"}}>
                            POST
                        </Link>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default Navbar;