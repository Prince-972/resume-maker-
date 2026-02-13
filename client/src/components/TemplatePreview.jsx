
import React from 'react';

const TemplatePreview = ({ type }) => {
    const renderModern = () => (
        <div className="bg-white h-full w-full rounded shadow-inner border border-gray-100 p-3 space-y-2">
            <div className="h-4 w-1/2 bg-blue-100 rounded mx-auto" />
            <div className="h-1 w-1/3 bg-gray-100 rounded mx-auto" />
            <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="h-2 w-1/4 bg-blue-50 rounded" />
                <div className="h-1 w-full bg-gray-50 rounded" />
                <div className="h-1 w-full bg-gray-50 rounded" />
                <div className="h-1 w-4/5 bg-gray-50 rounded" />
            </div>
            <div className="pt-2 space-y-2">
                <div className="h-2 w-1/4 bg-blue-50 rounded" />
                <div className="h-1 w-full bg-gray-50 rounded" />
                <div className="h-1 w-5/6 bg-gray-50 rounded" />
            </div>
        </div>
    );

    const renderExecutive = () => (
        <div className="bg-white h-full w-full rounded shadow-inner border border-gray-100 p-3 flex flex-col">
            <div className="flex justify-between items-start border-b-2 border-gray-200 pb-2 mb-2">
                <div className="space-y-1">
                    <div className="h-3 w-20 bg-gray-800 rounded" />
                    <div className="h-1 w-12 bg-gray-400 rounded" />
                </div>
                <div className="space-y-1 text-right">
                    <div className="h-1 w-12 bg-gray-300 rounded ml-auto" />
                    <div className="h-1 w-16 bg-gray-300 rounded ml-auto" />
                </div>
            </div>
            <div className="space-y-3">
                <div className="space-y-1">
                    <div className="h-2 w-16 bg-gray-600 rounded" />
                    <div className="h-1 w-full bg-gray-100 rounded" />
                    <div className="h-1 w-full bg-gray-100 rounded" />
                </div>
                <div className="space-y-1">
                    <div className="h-2 w-16 bg-gray-600 rounded" />
                    <div className="h-1 w-full bg-gray-100 rounded" />
                    <div className="h-1 w-11/12 bg-gray-100 rounded" />
                </div>
            </div>
        </div>
    );

    const renderCreative = () => (
        <div className="bg-white h-full w-full rounded shadow-inner border border-gray-100 flex overflow-hidden">
            <div className="w-1/3 bg-gray-900 p-2 space-y-3">
                <div className="h-6 w-6 bg-gray-700 rounded-full mx-auto" />
                <div className="space-y-1">
                    <div className="h-1 w-full bg-gray-600 rounded" />
                    <div className="h-1 w-4/5 bg-gray-600 rounded" />
                </div>
                <div className="pt-2 space-y-1">
                    <div className="h-1 w-full bg-gray-700 rounded" />
                    <div className="h-1 w-3/4 bg-gray-700 rounded" />
                    <div className="h-1 w-5/6 bg-gray-700 rounded" />
                </div>
            </div>
            <div className="flex-1 p-3 space-y-4">
                <div className="space-y-1">
                    <div className="h-3 w-24 bg-blue-600 rounded" />
                    <div className="h-1 w-16 bg-gray-400 rounded" />
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-1/2 bg-gray-200 rounded" />
                    <div className="h-1 w-full bg-gray-50 rounded" />
                    <div className="h-1 w-full bg-gray-50 rounded" />
                </div>
            </div>
        </div>
    );

    const renderStudent = () => (
        <div className="bg-white h-full w-full rounded shadow-inner border border-gray-100 p-3 space-y-4">
            <div className="border-l-4 border-indigo-500 pl-2 space-y-1">
                <div className="h-3 w-24 bg-gray-800 rounded" />
                <div className="h-1 w-16 bg-gray-400 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-2 rounded space-y-1">
                    <div className="h-1.5 w-10 bg-indigo-200 rounded" />
                    <div className="h-1 w-full bg-gray-200 rounded" />
                </div>
                <div className="bg-gray-50 p-2 rounded space-y-1">
                    <div className="h-1.5 w-10 bg-indigo-200 rounded" />
                    <div className="h-1 w-full bg-gray-200 rounded" />
                </div>
            </div>
            <div className="space-y-1">
                <div className="h-2 w-20 bg-gray-300 rounded" />
                <div className="h-1 w-full bg-gray-100 rounded" />
            </div>
        </div>
    );

    const renderTech = () => (
        <div className="bg-white h-full w-full rounded shadow-inner border border-gray-100 p-3 font-mono">
            <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <div className="h-3 w-24 bg-gray-800 rounded" />
            </div>
            <div className="space-y-3">
                <div className="border-l border-gray-200 pl-2 space-y-1">
                    <div className="h-2 w-16 bg-gray-600 rounded" />
                    <div className="h-1 w-full bg-gray-50 rounded" />
                    <div className="h-1 w-full bg-gray-50 rounded" />
                </div>
                <div className="border-l border-gray-200 pl-2 space-y-1">
                    <div className="h-2 w-16 bg-gray-600 rounded" />
                    <div className="h-1 w-full bg-gray-50 rounded" />
                </div>
            </div>
        </div>
    );

    const renderFreelance = () => (
        <div className="bg-white h-full w-full rounded shadow-inner border border-gray-100 p-3 space-y-3">
            <div className="h-12 w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg -mt-3 -mx-3 mb-2 flex items-center justify-center">
                <div className="h-4 w-20 bg-white/30 rounded" />
            </div>
            <div className="space-y-2">
                <div className="h-2 w-1/3 bg-gray-800 rounded mx-auto" />
                <div className="grid grid-cols-3 gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-1 bg-purple-100 rounded" />
                    ))}
                </div>
                <div className="space-y-1">
                    <div className="h-1 w-full bg-gray-50 rounded" />
                    <div className="h-1 w-full bg-gray-50 rounded" />
                    <div className="h-1 w-3/4 bg-gray-50 rounded" />
                </div>
            </div>
        </div>
    );

    switch (type) {
        case 'modern': return renderModern();
        case 'executive': return renderExecutive();
        case 'creative': return renderCreative();
        case 'student': return renderStudent();
        case 'tech': return renderTech();
        case 'freelance': return renderFreelance();
        default: return renderModern();
    }
};

export default TemplatePreview;
