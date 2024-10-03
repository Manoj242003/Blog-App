const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const multer = require('multer');
const path = require('path');
const blogRoutes = require('.//routes/blogs'); // Adjust the path as necessary
const Blog = require('.//models/Blog'); // Ensure this is the correct path

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all requests
app.use('/api', blogRoutes); // Ensure this is correctly set up
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BLOGIFY')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to create a new blog
app.post('/api/blogs', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Image upload failed' });
    }

    const { title, content } = req.body;
    const image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    try {
        const newBlog = new Blog({ title, content, image });
        await newBlog.save();
        res.json(newBlog);
    } catch (error) {
        console.error('Error saving blog:', error);
        res.status(500).json({ error: 'Failed to save blog' });
    }
});

// Route to fetch all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/api/blogs/:id/like', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found');

        blog.likes += 1; // Increment the like count
        await blog.save();

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});
