import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const checks = {
        length: password.length >= 5,
        digit: /\d/.test(password),
        special: /[!@#$%^&*]/.test(password)
    };

    const isPasswordValid = Object.values(checks).every(Boolean);

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!isPasswordValid) {
            toast.error('Please meet all password requirements');
            return;
        }

        try {
            const data = await signup({ username, email, password });
            authLogin(data.token, data.user);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Signup failed');
        }
    };

    const CheckItem = ({ satisfied, label }) => (
        <div className={clsx(
            "flex items-center gap-2 text-sm transition-all duration-300",
            satisfied ? "text-green-500 opacity-50 line-through" : "text-gray-500 dark:text-gray-400"
        )}>
            {satisfied ? <FaCheck size={12} /> : <div className="w-3 h-3 rounded-full border border-gray-400" />}
            {label}
        </div>
    );

    return (
        <div className="flex flex-grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">Join us to manage your tasks</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaUser />
                        </div>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                            placeholder="Username"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaEnvelope />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaLock />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={onChange}
                            onFocus={() => setPasswordFocused(true)}
                            required
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Live Password Validation Checklist */}
                    <div className={clsx(
                        "grid grid-cols-1 gap-1 pl-2 transition-all duration-500 overflow-hidden",
                        passwordFocused || password ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                    )}>
                        <CheckItem satisfied={checks.length} label="At least 5 characters" />
                        <CheckItem satisfied={checks.special} label="One special character (!@#$%^&*)" />
                        <CheckItem satisfied={checks.digit} label="One digit" />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaLock />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            placeholder="Confirm Password"
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={!isPasswordValid}
                        className={clsx(
                            "w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold shadow-lg transition duration-300 transform",
                            isPasswordValid
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                                : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        )}
                    >
                        <FaUserPlus /> Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
