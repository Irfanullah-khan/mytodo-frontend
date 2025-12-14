import React from 'react';
import { BsSun, BsMoonStars, BsLightningFill } from 'react-icons/bs';
import clsx from 'clsx';

const ThemeToggle = ({ theme, setTheme }) => {
    return (
        <div className={clsx(
            "flex items-center gap-2 p-1 rounded-full border shadow-sm transition-all",
            theme === 'light' ? "bg-white border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                    "bg-black border-neon-primary shadow-[0_0_10px_#ff00ff]"
        )}>
            {['light', 'dark', 'neon'].map((t) => (
                <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={clsx(
                        "p-2 rounded-full transition-all duration-300",
                        theme === t ? "bg-opacity-100 text-white transform scale-110 shadow-lg" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10",
                        theme === t && t === 'light' && "bg-yellow-400 text-yellow-900 shadow-yellow-400/50",
                        theme === t && t === 'dark' && "bg-slate-700 text-sky-100 shadow-slate-900/50",
                        theme === t && t === 'neon' && "bg-black text-neon-primary border border-neon-primary shadow-[0_0_15px_#ff00ff]",
                        theme !== t && t === 'neon' && "text-gray-400 hover:text-neon-primary"
                    )}
                    title={`${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
                >
                    {t === 'light' && <BsSun size={18} />}
                    {t === 'dark' && <BsMoonStars size={18} />}
                    {t === 'neon' && <BsLightningFill size={18} />}
                </button>
            ))}
        </div>
    );
};

export default ThemeToggle;
