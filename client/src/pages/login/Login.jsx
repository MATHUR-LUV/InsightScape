import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";

import { AuthContext } from "../../context/authContext";
const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value }));
    }

    const {login} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            // await axios.post("/auth/login", inputs);
            await login(inputs);
            navigate("/");

        }catch(err){
            setErr(err.response.data);
        }
    };


    return (
        <div className="auth">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="card">
                <h1>Login</h1>
                <form >
                    <input type="text" placeholder="enter your name...." name="username" onChange={handleChange}/>
                    <input type="password" placeholder="enter your password...." name="password" onChange={handleChange}/>
                    <button onClick={handleSubmit}>Login</button>
                    {err && <p>{err}</p>}
                    <span>
                        Don't you have an account ? <Link to="/register" style={{textDecoration: "none", color: "wheat", fontFamily:"cursive", fontWeight: "bolder"}}>Register</Link>

                    </span>
                </form>
            </div>

        </div>
    )
}

export default Login;