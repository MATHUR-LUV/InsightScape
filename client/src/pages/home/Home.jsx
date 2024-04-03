import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import "./Home.scss";
// import axios from "axios";
import { makeRequest } from "../../axios.js";

const Home = () => {
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
    const cat = useLocation().search;
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await makeRequest.get(`/posts${cat}`);
                setPosts(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
    return ( 
        <div className="home">
            <div className="posts">
                {
                    posts.map((post)=>(
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img src={`../upload/${post.img}`} alt="" />
                                {/* <img src={`../../../public/upload/${post.img}`} alt="" /> */}
                            </div>
                            <div className="content">
                                <Link className="link" to={`/post/${post.id}`}
                                
                                style={{textDecoration:"none", color:"goldenrod", fontSize: "40px", fontFamily:"cursive"}}>
                                {post.title}</Link>
                                <p>{getText(post.desc)}</p>
                                
                                <Link className="link" to={`/post/${post.id}`}>
                                <button>Read More</button></Link>
                            </div>

                        </div>
                    )

                    )
                }
            </div>
        </div>
    )
}

export default Home;