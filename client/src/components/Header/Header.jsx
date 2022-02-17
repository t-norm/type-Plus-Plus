// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const hamburgerToggle = () => {
        document
            .getElementById('hamburger-top')
            .classList.toggle('button-transform-top-active');
        document
            .getElementById('hamburger-middle')
            .classList.toggle('button-transform-middle-active');
        document
            .getElementById('hamburger-bottom')
            .classList.toggle('button-transform-bottom-active');
        document
            .getElementById('nav-list')
            .classList.toggle('navbar-nav-active');
        let navLinks = document.getElementsByClassName('nav-link');
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.toggle('nav-active');
        }
    };

    return (
        <header>
            {/* Colored div to block the sliding links */}
            <div className="absolute w-16 h-10 left-0 top-4 bg-gray-100 z-10"></div>
            {/* Actual navbar */}
            <nav className="relative w-full flex flex-wrap items-center justify-around py-4 bg-gray-100 text-gray-600 shadow-md ">
                <div className="w-full grid grid-cols-3 px-6">
                    {/* Nav menu */}
                    <div className="flex flex-wrap">
                        <button
                            className="text-gray-700 w-10 h-10 relative focus:outline-none z-20"
                            onClick={hamburgerToggle}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger elements */}
                            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span
                                    id="hamburger-top"
                                    aria-hidden="true"
                                    className="block h-0.5 w-5 bg-current transition-all duration-200 -translate-y-1"
                                ></span>
                                <span
                                    id="hamburger-middle"
                                    aria-hidden="true"
                                    className="block h-0.5 w-5 bg-current transition-all duration-200"
                                ></span>
                                <span
                                    id="hamburger-bottom"
                                    aria-hidden="true"
                                    className="block h-0.5 w-5 bg-current transition-all duration-200 translate-y-1"
                                ></span>
                            </div>
                        </button>
                        {/* Nav links */}
                        <div className="flex-grow items-center">
                            <ul
                                id="nav-list"
                                className="navbar-nav flex pl-0 list-style-none mr-auto -translate-x-80 transition-all duration-200"
                            >
                                <li className="nav-item p-2">
                                    <Link
                                        to="/"
                                        className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item p-2">
                                    <Link
                                        to="/leaderboard"
                                        className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                    >
                                        Leaderboard
                                    </Link>
                                </li>
                                {Auth.loggedIn() ? (
                                    <>
                                        <li className="nav-item p-2">
                                            <Link
                                                to="/dashboard"
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item p-2">
                                            <a
                                                href="/"
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                                onClick={logout}
                                            >
                                                Logout
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item p-2">
                                            <Link
                                                to="/login"
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item p-2">
                                            <Link
                                                to="/signup"
                                                className="nav-link p-0 hover:text-theme-red focus:text-theme-red transition-all duration-200 opacity-0"
                                            >
                                                Sign Up
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    {/* Logo column */}
                    <div className="flex justify-center items-center text-2xl h-10">
                        <img
                            src="./assets/images/logo.svg"
                            alt="Text Plus Plus logo"
                            className="h-56"
                        />
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="form-check form-switch pr-2">
                            <input
                                className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                            />
                            <label
                                className="form-check-label inline-block text-gray-800"
                                htmlFor="flexSwitchCheckDefault"
                            >
                                Dark Mode
                            </label>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
