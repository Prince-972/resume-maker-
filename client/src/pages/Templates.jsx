
import { Link } from 'react-router-dom';
import { Layout, CheckCircle2 } from 'lucide-react';
import TemplatePreview from '../components/TemplatePreview';

const Templates = () => {
    const templates = [
        { id: 1, type: 'modern', name: "Modern Minimalist", desc: "Clean, spacious design with focus on readability.", category: "Professional" },
        { id: 2, type: 'executive', name: "Executive Suite", desc: "Traditional layout reimagined for 2024.", category: "Corporate" },
        { id: 3, type: 'creative', name: "Creative Edge", desc: "Bold headers and unique sidebar for design roles.", category: "Creative" },
        { id: 4, type: 'student', name: "Student Fresh", desc: "Perfect for entry-level with space for projects.", category: "Academic" },
        { id: 5, type: 'tech', name: "Tech Giant", desc: "Concise items suitable for software engineers.", category: "Tech" },
        { id: 6, type: 'freelance', name: "Freelance Pro", desc: "Highlights skill variety and client feedback.", category: "Portfolio" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-10 text-center">
                <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Pick your canvas</h2>
                <p className="text-gray-500 text-lg">Choose a layout and start building with our interactive editor.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {templates.map((tpl) => (
                    <div key={tpl.id} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="h-80 bg-gray-50 relative flex flex-col p-8 overflow-hidden">
                            <TemplatePreview type={tpl.type} />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                                <h4 className="text-white text-xl font-black mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">{tpl.name}</h4>
                                <Link
                                    to={`/?template=${tpl.type}`}
                                    className="opacity-0 group-hover:opacity-100 bg-white text-blue-600 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 transform translate-y-8 group-hover:translate-y-0 shadow-xl hover:scale-105 active:scale-95"
                                >
                                    Select Template
                                </Link>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full">
                                    {tpl.category}
                                </span>
                                <div className="p-1 bg-green-50 rounded-full opacity-0 group-hover:opacity-100 transition duration-500">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition duration-300">{tpl.name}</h3>
                            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{tpl.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates;
