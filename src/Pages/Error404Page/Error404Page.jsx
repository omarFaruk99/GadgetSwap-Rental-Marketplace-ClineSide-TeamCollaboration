import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiWifi, FiAlertTriangle } from 'react-icons/fi';
import useTheme from "../../CustomHooks/useTheme.jsx";


const Error404Page = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();


    const handleGoBack = () => {
        window.history.back();
    };


    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <div className="container px-4 mx-auto">
                <div className={`max-w-5xl mx-auto relative overflow-hidden ${
                    darkMode
                        ? 'bg-gray-800/70 border border-purple-900/30'
                        : 'bg-white/80 border border-indigo-200/30'
                } backdrop-blur-md rounded-2xl shadow-xl transition-all duration-300`}>

                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl -z-10"></div>

                    {/* Circuit-like Lines */}
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
                        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>

                        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
                        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse" style={{animationDelay: '2.5s'}}></div>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">

                        {/* Left Side - Error Code */}
                        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                                darkMode
                                    ? 'bg-red-900/40 text-red-300 border border-red-800/50'
                                    : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                                <FiAlertTriangle className="mr-2" />
                                <span>Error 404</span>
                            </div>

                            <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 ${
                                darkMode
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                                    : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                            }`}>
                                Oops!
                            </h1>

                            <p className={`text-xl md:text-2xl font-bold mb-2 ${
                                darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Page not found
                            </p>

                            <p className={`text-base mb-8 max-w-md ${
                                darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                            </p>

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <button
                                    onClick={handleGoBack}
                                    className={`group relative flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-800 text-white border border-purple-600/30 hover:bg-gray-700'
                                            : 'bg-white text-indigo-600 border border-indigo-200/50 hover:bg-gray-50'
                                    }`}
                                >
                                    <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                                    Go Back
                                </button>

                                <Link
                                    to="/"
                                    className={`group relative flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                                    }`}
                                >
                                    <FiHome className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                                    Return to Homepage
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Illustration */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative">

                                {/* Animated Gadget Illustration */}
                                <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full ${
                                    darkMode
                                        ? 'bg-gray-700/50 border border-purple-900/30'
                                        : 'bg-gray-100/50 border border-indigo-200/30'
                                } flex items-center justify-center relative overflow-hidden`}>

                                    {/* Animated Circles */}
                                    <div className="absolute inset-0">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-dashed animate-spin-slow opacity-20"
                                             style={{animationDuration: '15s'}}
                                             className={darkMode ? 'border-purple-500' : 'border-indigo-500'}
                                        ></div>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-4 border-dashed animate-spin-slow opacity-10"
                                             style={{animationDuration: '30s', animationDirection: 'reverse'}}
                                             className={darkMode ? 'border-cyan-500' : 'border-purple-500'}
                                        ></div>
                                    </div>

                                    {/* 404 Text */}
                                    <div className="relative z-10 text-center">
                                        <div className={`text-9xl font-black ${
                                            darkMode
                                                ? 'text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900'
                                                : 'text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-300'
                                        }`}>
                                            404
                                        </div>

                                        {/* Disconnected Wifi Icon */}
                                        <div className={`mt-4 flex justify-center ${
                                            darkMode ? 'text-red-400' : 'text-red-500'
                                        }`}>
                                            <FiWifi size={48} className="animate-pulse" />
                                            <div className="absolute top-1/2 left-1/2 w-12 h-1 bg-current transform -translate-x-1/2 rotate-45"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-lg transform rotate-12 animate-float"
                                     style={{animationDelay: '0s'}}
                                     className={darkMode
                                         ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-purple-500/20'
                                         : 'bg-gradient-to-br from-indigo-600/30 to-purple-600/30 backdrop-blur-md border border-indigo-500/20'
                                     }
                                ></div>
                                <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-lg transform -rotate-12 animate-float"
                                     style={{animationDelay: '1s'}}
                                     className={darkMode
                                         ? 'bg-gradient-to-br from-blue-600/30 to-cyan-600/30 backdrop-blur-md border border-blue-500/20'
                                         : 'bg-gradient-to-br from-blue-600/30 to-indigo-600/30 backdrop-blur-md border border-blue-500/20'
                                     }
                                ></div>
                                <div className="absolute top-1/2 -right-8 w-10 h-10 rounded-full transform animate-float"
                                     style={{animationDelay: '2s'}}
                                     className={darkMode
                                         ? 'bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-md border border-cyan-500/20'
                                         : 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-purple-500/20'
                                     }
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add animation keyframes to the global style */}
            <style>{`
                @keyframes spin-slow {
                    from {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }

                @keyframes float {
                    0% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(5deg);
                    }
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                }

                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Error404Page;
