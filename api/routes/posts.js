import express from "express";

const router = express.Router();
import {getPosts, getPost, deletePost, addPost, updatePost} from "../controllers/post.js";

router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.post("/", addPost);
router.put("/:id", updatePost);
export default router;
