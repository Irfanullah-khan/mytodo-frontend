import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand / Copyright */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                            MyTodoApp
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <a href="https://github.com/Irfanullah-khan" className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                            <FaGithub size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/irfanullah-khan-802605336/" className="text-gray-400 hover:text-blue-700 transition-colors">
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>

                 <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
                     <span className="font-semibold">Crafted by Irfanullah</span>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
