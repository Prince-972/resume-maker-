
import { Link } from 'react-router-dom';
import { Sparkles, Zap, ShieldCheck, FileDown } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-5xl mx-auto text-center space-y-8 pt-12 pb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-bold animate-fade-in">
                    <Sparkles className="w-4 h-4" />
                    <span>New: Canva-style editor is now live!</span>
                </div>

                <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                    Create a resume that <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        lands you the job.
                    </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Our intelligent Canva-style builder helps you create a professional,
                    ATS-friendly resume in minutes. No design skills required.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                    <Link to="/builder" className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition transform hover:scale-105 shadow-xl text-lg flex items-center justify-center gap-2">
                        Build Now — It's Free
                    </Link>
                    <Link to="/templates" className="px-10 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition transform hover:scale-105 shadow-sm text-lg">
                        Browse Templates
                    </Link>
                </div>

                {/* Feature Grid */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition group">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 dark:text-white">Lightning Fast</h3>
                        <p className="text-gray-600 dark:text-gray-400">Save hours with our visual editor. Just click, type, and download.</p>
                    </div>

                    <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition group">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 dark:text-white">ATS-Optimized</h3>
                        <p className="text-gray-600 dark:text-gray-400">Our templates are scanned by top recruitment software to ensure you get seen.</p>
                    </div>

                    <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition group">
                        <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition">
                            <FileDown className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 dark:text-white">PDF Ready</h3>
                        <p className="text-gray-600 dark:text-gray-400">Instant PDF export with perfect formatting every single time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
