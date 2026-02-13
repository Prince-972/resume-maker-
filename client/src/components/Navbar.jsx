import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                ResumeMaker
                            </span>
                        </Link>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-900 dark:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium">
                                Build
                            </Link>
                            <Link to="/templates" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition">
                                Templates
                            </Link>
                            <Link to="/welcome" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition">
                                About
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 shadow-md">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden space-x-2">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-all duration-300`}>
                <div className="pt-2 pb-3 space-y-1 px-4">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="bg-blue-50 dark:bg-gray-800 border-blue-500 text-blue-700 dark:text-blue-400 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/templates"
                        onClick={() => setIsOpen(false)}
                        className="border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    >
                        Templates
                    </Link>
                    <Link
                        to="/builder"
                        onClick={() => setIsOpen(false)}
                        className="border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    >
                        Builder
                    </Link>
                    <div className="mt-4 pb-3">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
