import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const DashboardHeader = ({ activeTab, setActiveTab, onProfileClick }) => {
    const { user } = useAuth();

    // Fallback if user is null (though auth context should handle this)
    const username = user?.username || 'User';

    const tabs = [
        { id: 'all', label: 'All Tasks' },
        { id: 'active', label: 'Active Tasks' },
        { id: 'completed', label: 'Completed Tasks' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Left Side: User Info */}
            <div
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onProfileClick}
                title="Click to edit profile"
            >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                    <FaUserCircle size={28} />
                </div>
                <div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Hello, {username}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Welcome to your dashboard</p>
                </div>
            </div>

            {/* Right Side: Navigation Tabs */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                            ${activeTab === tab.id
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-600/50'
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashboardHeader;
