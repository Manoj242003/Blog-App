const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [commentSchema], // Embed comments schema
}, { timestamps: true });

//module.exports = mongoose.model('Blog', blogSchema);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;