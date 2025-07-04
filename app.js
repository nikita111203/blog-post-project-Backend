const express = require("express");
const mongoose = require("mongoose");
const Post = require("./blogPostModel")
const cors = require("cors");
const app = express();
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("database connected Successfully!") })
    .catch((err) => { console.error("Something went wrong", err) });

app.use(cors());
app.use(express.json());
app.post("/posts", async (req, res) => {
    try {
        const { title, description, author } = req.body;
        const postData = await Post.create({ title, description, author })
        res.status(201).json(postData)
    } catch (error) {
        res.status(500).json({
            message: "Something error occured",
            error: error.message
        })
    }
});

// READBLOG POST ALL

app.get("/posts", async (req, res) => {
    try {
        const allPost = await Post.find().select("-createdAt -updatedAt -__v");
        res.status(201).json(allPost)
    } catch (error) {
        res.status(500).json({
            message: "fetching post failed",
            error: error.message
        })
    }
});
// Read single post
app.get("/posts/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const singlePost = await Post.findById(id).select("-createdAt -updatedAt -__v");
        res.status(201).json(singlePost);

    } catch (err) {
        res.status(500).json({ message: "fetching single Post failed", error: err.message })
    }
})

// DELETE POST
app.delete('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(id)
        if (!deletedPost) return res.status(404).json("post does not exist");
        res.status(201).json({ message: "Post Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Post Deleted Successfully", error: err.message })
    }
});

// UPDATE POST

app.put("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, author } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, description, author },
            { new: true }
        )
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "updated post failed", error: err.message })
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})