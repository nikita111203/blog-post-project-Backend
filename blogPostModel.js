const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    author: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema)
module.exports = Post;