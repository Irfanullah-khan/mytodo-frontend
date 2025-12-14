import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaCheckDouble, FaSun, FaMoon, FaBolt as Fabolt } from 'react-icons/fa';

const Header = () => {
    const { user, logout } = useAuth();
    const { theme, cycleTheme } = useTheme();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                            <FaCheckDouble size={20} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            MyTodoApp
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${isActive('/')
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
                                }`}
                        >
                            Home
                        </Link>

                        <button
                            onClick={cycleTheme}
                            className={`p-2 rounded-lg transition-colors ${theme === 'light'
                                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                : theme === 'dark'
                                    ? 'bg-gray-800 text-gray-400 hover:text-white'
                                    : 'bg-black text-neon-primary border border-neon-primary shadow-[0_0_5px_#ff00ff]'
                                }`}
                            title={`Current theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
                        >
                            {theme === 'light' ? <FaSun size={18} /> : theme === 'dark' ? <FaMoon size={18} /> : <Fabolt size={18} />}
                        </button>

                        {!user && (
                            <>
                                <Link
                                    to="/about"
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                                >
                                    About
                                </Link>
                                <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
                            </>
                        )}

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Hi, {user.username}
                                </span>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/login')
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
