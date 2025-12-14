import React, { useState } from 'react';
import { BiTrash, BiEdit, BiCheck, BiX } from 'react-icons/bi';
import clsx from 'clsx';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, readOnly }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Safety check for legacy data
    const initialTitle = todo.title || todo.text || '';
    const initialCompleted = todo.isCompleted !== undefined ? todo.isCompleted : (todo.completed || false);

    const [editTitle, setEditTitle] = useState(initialTitle);
    const [editDescription, setEditDescription] = useState(todo.description || '');

    const handleUpdate = () => {
        if (editTitle.trim() !== initialTitle || editDescription !== todo.description) {
            onUpdate(todo._id, { title: editTitle, description: editDescription });
        }
        setIsEditing(false);
    };

    return (
        <div className={clsx(
            "grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 transition-all duration-200",
            "hover:bg-gray-50 dark:hover:bg-gray-800/80",
            "data-[theme='neon']:hover:shadow-[0_0_15px_rgba(255,0,255,0.15)] data-[theme='neon']:hover:border-neon-primary/30 data-[theme='neon']:border data-[theme='neon']:border-transparent",
            "animate-in fade-in slide-in-from-bottom-1"
        )}>
            {/* Task Details Column (Spans 8) */}
            <div className="col-span-12 sm:col-span-8 flex items-start sm:items-center gap-3 w-full overflow-hidden">
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={initialCompleted}
                    onChange={() => !readOnly && onToggle(todo._id, !initialCompleted)}
                    disabled={readOnly}
                    className={clsx(
                        "mt-1 sm:mt-0 w-5 h-5 rounded cursor-pointer accent-blue-600 dark:accent-indigo-500",
                        "data-[theme='neon']:accent-neon-primary shrink-0",
                        readOnly ? "cursor-not-allowed opacity-50" : ""
                    )}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full px-2 py-1 rounded border bg-transparent text-inherit focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                                autoFocus
                                placeholder="Task Title"
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full px-2 py-1 rounded border bg-transparent text-inherit focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm h-16 resize-none"
                                placeholder="Description"
                            />
                        </div>
                    ) : (
                        <div className="flex items-start gap-3">
                            {/* Optional Image Thumbnail */}
                            {todo.imageUrl && (
                                <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden border dark:border-gray-700 hidden sm:block">
                                    <img src={todo.imageUrl} alt={initialTitle} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div>
                                <h3 className={clsx(
                                    "text-lg font-medium truncate pr-2",
                                    initialCompleted && "line-through text-gray-400 dark:text-gray-500",
                                    !initialCompleted && "dark:text-gray-100 data-[theme='neon']:text-white"
                                )}>
                                    {initialTitle}
                                </h3>
                                {todo.description && (
                                    <p className={clsx(
                                        "text-sm",
                                        initialCompleted ? "text-gray-300 dark:text-gray-600" : "text-gray-600 dark:text-gray-400"
                                    )}>
                                        {todo.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Column (Spans 2) - Centered */}
            <div className="col-span-6 sm:col-span-2 flex sm:justify-center">
                <span className={clsx(
                    "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
                    initialCompleted
                        ? "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                )}>
                    {initialCompleted ? "Completed" : "Active"}
                </span>
            </div>

            {/* Actions Column (Spans 2) - Right Aligned */}
            <div className="col-span-6 sm:col-span-2 flex justify-end gap-2">
                {!readOnly && (
                    isEditing ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors dark:hover:bg-green-900/30"
                                title="Save"
                            >
                                <BiCheck size={20} />
                            </button>
                            <button
                                onClick={() => { setIsEditing(false); setEditTitle(initialTitle); setEditDescription(todo.description || ''); }}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors dark:hover:bg-red-900/30"
                                title="Cancel"
                            >
                                <BiX size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors dark:hover:bg-blue-900/30"
                                title="Edit"
                            >
                                <BiEdit size={20} />
                            </button>
                            <button
                                onClick={() => onDelete(todo._id)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors dark:hover:bg-red-900/30"
                                title="Delete"
                            >
                                <BiTrash size={20} />
                            </button>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default TodoItem;
