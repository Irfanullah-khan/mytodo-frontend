import React, { useState } from 'react';
import { IoAddCircleOutline, IoImageOutline } from 'react-icons/io5';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        onAdd(formData);

        // Reset form
        setTitle('');
        setDescription('');
        setImage(null);
        setPreview('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Task Title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={clsx(
                        "flex-1 px-4 py-2 rounded-lg border focus:outline-none transition-all",
                        "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
                        "data-[theme='neon']:bg-black data-[theme='neon']:border-neon-primary data-[theme='neon']:text-neon-primary"
                    )}
                />
            </div>

            <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={clsx(
                    "w-full px-4 py-2 rounded-lg border focus:outline-none transition-all resize-none h-20",
                    "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
                    "data-[theme='neon']:bg-black data-[theme='neon']:border-neon-primary data-[theme='neon']:text-neon-primary"
                )}
            />

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <label className={clsx(
                        "cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
                        "hover:bg-gray-100 dark:hover:bg-gray-700",
                        "dark:border-gray-600 dark:text-gray-300"
                    )}>
                        <IoImageOutline size={20} />
                        <span className="text-sm">Add Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    {preview && (
                        <div className="relative w-10 h-10 rounded overflow-hidden border dark:border-gray-600">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className={clsx(
                        "px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all active:scale-95",
                        "bg-blue-600 text-white hover:bg-blue-700",
                        "dark:bg-indigo-600 dark:hover:bg-indigo-700",
                        "data-[theme='neon']:bg-transparent data-[theme='neon']:border data-[theme='neon']:border-neon-primary data-[theme='neon']:text-neon-primary"
                    )}
                >
                    <IoAddCircleOutline size={24} />
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TodoForm;