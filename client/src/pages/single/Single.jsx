import React, { useContext, useEffect, useState } from "react";
import "./Single.scss"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import Menu from "../../components/menu/Menu.jsx";
import moment from "moment";
// import axios from "axios";
import { makeRequest } from "../../axios.js";
import DOMPurify from "dompurify";
const Single = () => {

    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];


    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await makeRequest.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }

        };

        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try{
            await makeRequest.delete(`/posts/${postId}`);
            navigate("/");
        }catch(err){
            console.log(err);
        }

    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent
    }
    return (
        <div className="single">
            <div className="content">
                <img src={`../upload/${post.img}`} alt="" />
                <div className="user">
                    {post.userImg && <img src={`../upload/${post.userImg}`} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>

                    {currentUser.username === post.username && <div className="edit">
                        <Link to={`/write?edit=2`} style={{ textDecoration: "none", color: "black", cursor: "pointer" }} state={post}>
                            <EditIcon />
                        </Link>

                        <DeleteIcon style={{ cursor: "pointer" }} onClick={handleDelete} />
                    </div>}
                </div>

                <h1>{post.title}</h1>
                <p
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                  }}
                ></p>
            </div>
            <div className="menu">
                <Menu cat={post.cat} />
            </div>
        </div>

    )
}

export default Single;