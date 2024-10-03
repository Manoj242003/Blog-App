// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/upload" element={<BlogForm />} />
            </Routes>
        </Router>
    );
};

export default App;
