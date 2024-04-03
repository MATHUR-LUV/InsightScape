import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
});

app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(cookieParser());

//post image 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});




const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

//profile image
// const profileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/profileImg");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });




// const uploadProfile = multer({ profileStorage });

// app.post("/api/uploadProfile", uploadProfile.single("profile"), function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("connected to api!!!");
})