import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import SearchBar from '../components/SearchBar';
import DashboardHeader from '../components/DashboardHeader';
import Analytics from '../components/Analytics';
import ProfileModal from '../components/ProfileModal';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'completed'
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(Array.isArray(data) ? data : []);
            setFilteredTodos(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                logout();
            } else {
                toast.error('Failed to fetch todos');
            }
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Filter Logic based on Tab and Search
    useEffect(() => {
        let result = todos;

        // 1. Tab Filter
        if (activeTab === 'completed') {
            result = result.filter(todo => todo.isCompleted || todo.completed);
        } else if (activeTab === 'active') {
            result = result.filter(todo => !(todo.isCompleted || todo.completed));
        }

        // 2. Search Filter
        if (searchQuery) {
            result = result.filter(todo =>
                (todo.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (todo.text || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTodos(result);
    }, [todos, activeTab, searchQuery]);


    const handleAddTodo = async (todoData) => {
        try {
            const newTodo = await createTodo(todoData);
            setTodos([newTodo, ...todos]);
            toast.success('Task added successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to add task');
        }
    };

    const handleToggleTodo = async (id, isCompleted) => {
        try {
            const updatedTodo = await updateTodo(id, { isCompleted });
            setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
        } catch (err) {
            console.error(err);
            toast.error('Failed to update task');
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo._id !== id));
            toast.success('Task deleted successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete task');
        }
    };

    const handleUpdateTodo = async (id, updates) => {
        try {
            const updatedTodo = await updateTodo(id, updates);
            setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
            toast.success('Task updated successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update task');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header with Nav */}
            <DashboardHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onProfileClick={() => setIsProfileModalOpen(true)}
            />

            {/* Analytics Section - Always shows global stats regardless of tab */}
            <Analytics todos={todos} />

            {/* Main Content Area */}
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold dark:text-white capitalize">
                        {activeTab.replace('-', ' ')} List
                    </h2>
                    <div className="w-full sm:w-auto">
                        <SearchBar onSearch={setSearchQuery} />
                    </div>
                </div>

                {/* Todo Form - Only visible in 'all' tab */}
                {activeTab === 'all' && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <TodoForm onAdd={handleAddTodo} />
                    </div>
                )}

                <TodoList
                    todos={filteredTodos}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                    readOnly={activeTab === 'completed'}
                />
            </div>

            {/* Profile Update Modal */}
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        </div>
    );
};

export default Dashboard;
