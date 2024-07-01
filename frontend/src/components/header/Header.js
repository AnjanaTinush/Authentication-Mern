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
            <nav>
                <div className='logo' onClick={goHome}>
                    <FaHome size={35} />
                    <span>AUTH:Z</span>
                </div>

                <ul className='home-links'>
                    <li className='--flex-center'>
                        <FaUserCircle size={20} />
                        <p className='--color-white'>Hi, Anjana |</p>
                    </li>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to="/login">Login</Link>
                        </button>
                    </li>
                    <li>
                        <NavLink to="/profile" className={activelink}>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <button className='--btn --btn-secondary'>
                            <Link to="/login">Logout</Link>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
