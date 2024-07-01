import React from 'react';
import "./Header.scss";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';

const activelink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <header className='header'>
           
        </header>
    );
};

export default Header;
