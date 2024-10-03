import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            setError('Error fetching blogs: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (id) => {
        console.log('Liking blog with ID:', id); // Add this line
        try {
            await axios.post(`http://localhost:5000/api/blogs/${id}/like`);
            fetchBlogs(); // Refresh the blog list to show updated likes
        } catch (error) {
            console.error('Error liking blog:', error);
        }
    };    

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`http://localhost:5000/api/blogs/${id}`);
                fetchBlogs(); // Refresh the blog list after deletion
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container">
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div className="blog-post" key={blog._id}>
                        <h2>{blog.title}</h2>
                        <img src={blog.image} alt={blog.title} />
                        <p>{blog.content}</p>
                        <button id="like-button" onClick={() => handleLike(blog._id)}>
                            <FontAwesomeIcon icon={faThumbsUp} /> Like ({blog.likes})
                        </button>
                        <button id="delete-button" onClick={() => handleDelete(blog._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </button>
                    </div>
                ))
            ) : (
                <div>No blogs available</div>
            )}
        </div>
    );
};

export default BlogList;