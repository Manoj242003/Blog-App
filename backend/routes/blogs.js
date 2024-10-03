const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer'); // If you're using multer for image uploads
const Blog = require('../models/Blog'); // Adjust the path to your Blog model
const router = express.Router();

// Like a blog post
router.post('/blogs/:id/like', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found');

        blog.likes += 1; // Increment the likes
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Delete a blog post
router.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).send('Blog not found');
        res.send({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Make sure to export the router
module.exports = router;
