import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import clsx from 'clsx';
import { FaCalendarAlt, FaChartPie, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const Analytics = ({ todos }) => {
    const [timeframe, setTimeframe] = useState('all'); // 'day', 'week', 'month', 'all'

    // Calculate Data based on Timeframe
    const stats = useMemo(() => {
        const now = new Date();

        const filteredTodos = todos.filter(todo => {
            if (timeframe === 'all') return true;

            const todoDate = new Date(todo.createdAt); // Ensure your Todo model has createdAt
            const diffTime = Math.abs(now - todoDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (timeframe === 'day') return diffDays <= 1;
            if (timeframe === 'week') return diffDays <= 7;
            if (timeframe === 'month') return diffDays <= 30;
            return true;
        });

        const total = filteredTodos.length;
        const completed = filteredTodos.filter(t => t.isCompleted || t.completed).length; // Handle both key styles
        const active = total - completed;
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        return { total, completed, active, progress, data: filteredTodos };
    }, [todos, timeframe]);

    const chartData = [
        { name: 'Completed', value: stats.completed },
        { name: 'Active', value: stats.active },
    ];

    const COLORS = ['#10B981', '#F59E0B']; // Emerald-500, Amber-500

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <FaChartPie className="text-purple-500" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Task Analytics</h3>
                </div>

                {/* Timeframe Filter */}
                <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer appearance-none"
                    >
                        <option value="all">All Time</option>
                        <option value="day">Last 24 Hours</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-w-0">
                {/* Chart Section */}
                <div className="h-64 w-full relative">
                    {stats.total === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col">
                            <FaChartPie size={40} className="mb-2 opacity-50" />
                            <p>No data for this period</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Stats Cards Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
                        <div className="flex items-center gap-2 mb-1 text-green-600 dark:text-green-400">
                            <FaCheckCircle />
                            <span className="text-sm font-medium">Completed</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.completed}</p>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                        <div className="flex items-center gap-2 mb-1 text-amber-600 dark:text-amber-400">
                            <FaHourglassHalf />
                            <span className="text-sm font-medium">Active</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.active}</p>
                    </div>

                    <div className="col-span-2 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="text-sm font-bold text-blue-600">{stats.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${stats.progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
