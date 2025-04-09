import React from 'react';
import {useSelector} from "react-redux";

const LoadingSkeleton = () => {

    const darkMode = useSelector((state) => state.darkMode.isDark);



    return (
      <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`h-4 w-1/3 mb-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                        <div className={`h-8 w-1/2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                    </div>
                ))}
            </div>

            <div className={`rounded-xl mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-700">
                    <div className={`h-6 w-1/4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                </div>
                <div className="p-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center mb-4">
                            <div className={`h-12 w-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                            <div className="ml-4 flex-1">
                                <div className={`h-4 w-1/3 mb-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                                <div className={`h-3 w-3/4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>  
    );
};

export default LoadingSkeleton;
