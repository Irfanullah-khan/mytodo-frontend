import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onUpdate, readOnly }) => {
    if (todos.length === 0) {
        return (
            <div className="text-center py-10 opacity-60">
                <p className="text-xl dark:text-gray-400 data-[theme='neon']:text-neon-secondary">
                    No tasks found.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header Row */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-t-lg border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
                <div className="col-span-8">Tasks</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-b-lg shadow-sm border border-t-0 border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        readOnly={readOnly}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
