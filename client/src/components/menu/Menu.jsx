import React, { useEffect, useState } from "react";
import "./Menu.scss";
import { Link } from "react-router-dom";
// import axios from "axios";
import { makeRequest } from "../../axios.js";
const Menu = ({cat}) => {
    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/3135801/pexels-photo-3135801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg"
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 4,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/394376/pexels-photo-394376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    // ];

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await makeRequest.get(`/posts/?cat=${cat}`);
                setPosts(res.data);
            }catch(err){
                console.log(err);
            }
        };

        fetchData();
    },[cat]);


    return (
        <div className="menu">
            <h1>Other Posts You May Like</h1>
            {
                posts.map((post)=>(
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={`../upload/${post.img}`} alt="" />
                        
                        <Link className="link" to={`/post/${post.id}`}>
                                <button>Read More</button></Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Menu;