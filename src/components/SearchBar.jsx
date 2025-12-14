import React from 'react';
import { BiSearch } from 'react-icons/bi';
import clsx from 'clsx';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="relative w-full">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
                type="text"
                placeholder="Search todos..."
                onChange={(e) => onSearch(e.target.value)}
                className={clsx(
                    "w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none transition-all",
                    "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
                    "data-[theme='neon']:bg-black data-[theme='neon']:border-neon-secondary data-[theme='neon']:text-neon-secondary data-[theme='neon']:shadow-[0_0_5px_#00ffff]"
                )}
            />
        </div>
    );
};

export default SearchBar;
