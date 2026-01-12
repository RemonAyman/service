import React from 'react';

const LoadingSkeleton = ({ type = 'card' }) => {
    if (type === 'card') {
        return (
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full animate-pulse">
                <div className="aspect-[16/11] bg-slate-100" />
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                         <div className="h-10 bg-slate-50 rounded-xl w-12" />
                         <div className="h-8 bg-slate-100 rounded-lg w-3/4" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-4 bg-slate-50 rounded-lg w-full" />
                        <div className="h-4 bg-slate-50 rounded-lg w-5/6" />
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                        <div className="h-12 bg-slate-900/5 rounded-2xl w-28" />
                        <div className="h-6 bg-slate-100 rounded-lg w-16" />
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'table') {
        return (
            <div className="space-y-6 animate-pulse">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex space-x-6 rtl:space-x-reverse h-20 bg-white rounded-[2rem] border border-gray-50 px-8 items-center">
                        <div className="h-10 bg-slate-100 rounded-xl w-1/4" />
                        <div className="h-10 bg-slate-100 rounded-xl w-2/4" />
                        <div className="h-10 bg-slate-100 rounded-xl w-1/4" />
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default LoadingSkeleton;
