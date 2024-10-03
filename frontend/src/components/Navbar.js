// client/src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.logo}>Blogify</h1>
            <div>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/upload" style={styles.link}>Upload Blog</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'black',
        color: 'white',
    },
    logo: {
        margin: 0,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
    },
};

export default Navbar;