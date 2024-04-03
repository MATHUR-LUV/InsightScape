import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// import {makeRequest} from "../../axios.js";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
// import axios from "axios";


const Register = () => {

    // const [inputs, setInputs] = useState({
    //     username: "",
    //     email: "",
    //     password: ""
    // });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");

    const [err, setError] = useState(null);
    const navigate = useNavigate();

    // const [profile, setProfile] = useState(null);

    // const handleChange = (e) => {
    //     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };
    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        }catch(err){
            console.log(err);
        }
    };

    // const upload = async (file) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         const res = await makeRequest.post("/upload", formData);
    //         return res.data;
    //     } catch (err) {
    //         console.log(err);

    //     }
    // };

    // const mutation = useMutation({
    //     mutationFn: (newUser) => {
    //         return makeRequest.post("/auth/register", newUser);
    //     },
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries(["users"]);
    //     }
    // });


    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     let imgUrl = "";
    //     if (file) imgUrl = await upload();

    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await makeRequest.post("/auth/register", inputs);
    //         navigate("/login");
    //     } catch (err) {
    //         setError(err.response.data);
    //         // console.log(err);
    //     }
    // };
    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try{
            await makeRequest.post("/auth/register", {
                username: username,
                email: email,
                password: password,
                img: file ? imgUrl : "",
    
            });

            navigate("/login");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="auth">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="card">
                <h1>Register</h1>
                <form >
                    <div className="file">
                        <label htmlFor="file">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                {/* <img src={} alt="" /> */}
                                <CloudUploadIcon className="icon" />

                            </div>
                        </label>
                        <input required type="file" id="file" style={{ display: "none" }} name="" onChange={(e) => setFile(e.target.files[0])} />
                    </div> 

                    {/* <label htmlFor="profile">
                    <span>Profile Picture</span>
                        <div className="imgContainer">
                            <img
                                src={
                                    profile
                                        ? URL.createObjectURL(profile)
                                        : "/upload/" + user.profilePic
                                }
                                alt=""
                            />
                            <CloudUploadIcon className="icon" />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="profile"
                        style={{ display: "none" }}
                        onChange={(e) => setProfile(e.target.files[0])}
                    />
            </div> */}
                    <input required type="text" placeholder="enter your name...." name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input required type="email" placeholder="enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <input required type="password" placeholder="enter your password...." name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleClick}>Register</button>
                    {err && <p>{err}</p>}
                    <span>
                        Already have an account ? <Link to="/login" style={{ textDecoration: "none", color: "wheat", fontFamily: "cursive", fontWeight: "bolder" }}>Login</Link>

                    </span>
                </form>
            </div >

        </div >
    )
}

export default Register;