import React from "react";
import "./Write.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Logo from "../../images/logo.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
// import axios from "axios";
import { makeRequest } from "../../axios.js";
const Write = () => {
    // const [value, setValue] = useState('');
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate();


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
    // const imgUrl="";

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try{
            state ? await makeRequest.put(`/posts/${state.id}`, {
                title, 
                desc: value,
                cat,
                img: file ? imgUrl : "",
            })
            : await makeRequest.post("/posts", {
                title: title,
                desc: value,
                cat,
                img: file ? imgUrl : "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });

            navigate("/");
        }catch(err){
            console.log(err);
        }
    }
    
    // console.log(value);
    return (
        <div className="add">
            <div className="content">
                <span>Title :</span>
                <input type="text" placeholder="Title" style={{backgroundColor:"none", color:"wheat", padding:"5px"}} onChange={(e) => setTitle(e.target.value)} value={title}/>
                <span>Description : </span>
                <div className="editorContainer">
                    
                    <ReactQuill  className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">

                {/* <h1>Publish</h1>
                    <input type="file" id="file" />
                    <label htmlFor="file">Upload Image</label> */}
                <div className="file">
                    <label htmlFor="file">
                        <span>Upload Image</span>
                        <div className="imgContainer">
                            {/* <img src={`../upload/${imgUrl}`} alt=""/> */}
                            <CloudUploadIcon className="icon" />

                        </div>
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} name="" onChange={(e)=>setFile(e.target.files[0])} />

                </div>
                <div className="buttons">
                    <button onClick={handleClick}>Publish</button>
                    
                </div>


                <div className="item">
                    <h1>CATEGORY</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === "art"} name="cat" value="art" id="art"  onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="art">ART</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "science"} name="cat" value="science" id="science"  onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor="science">SCIENCE</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology"   onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="technology">TECHNOLOGY</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema"  onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="cinema">CINEMA</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "sports"} name="cat" value="sports" id="sports"  onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor="sports">SPORTS</label>
                    </div>
                    
                    <div className="cat">
                        <input type="radio" checked={cat === "food"} name="cat" value="food" id="food"  onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="food">FOOD</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "others"} name="cat" value="others" id="others"  onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor="others">OTHERS</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write;