import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FiSearch,
    FiArrowRight,
    FiSmartphone,
    FiCamera,
    FiHeadphones,
    FiWatch,
    FiZap,
    FiWifi,
    FiMonitor,
    FiCpu,
    FiServer
} from 'react-icons/fi';
import {
    IoGameController,
    IoLaptop,
    IoTabletLandscape,
    IoSparkles
} from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const BannerComponent = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();


    const [searchQuery, setSearchQuery] = useState('');
    const [activeGadget, setActiveGadget] = useState(0);
    const [isHovering, setIsHovering] = useState(false);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };


    // Auto-rotate featured gadgets
    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setActiveGadget((prev) => (prev + 1) % featuredGadgets.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovering]);


    const handleGadgetHover = (index) => {
        setActiveGadget(index);
        setIsHovering(true);
    };


    const handleGadgetLeave = () => {
        setIsHovering(false);
    };


    /*const categories = [
        { name: 'Smartphones', icon: <FiSmartphone size={20} /> },
        { name: 'Laptops', icon: <IoLaptop size={20} /> },
        { name: 'Cameras', icon: <FiCamera size={20} /> },
        { name: 'Gaming', icon: <IoGameController size={20} /> },
        { name: 'Audio', icon: <FiHeadphones size={20} /> },
        { name: 'Wearables', icon: <FiWatch size={20} /> },
        { name: 'VR', icon: <FiMonitor size={20} /> },
        { name: 'Drones', icon: <FiWifi size={20} /> },
    ];*/


    const featuredGadgets = [
        {
            name: "iPhone 14 Pro",
            category: "Smartphone",
            price: "$8/day",
            image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            color: "from-blue-500 to-indigo-600"
        },
        {
            name: "MacBook Pro M2",
            category: "Laptop",
            price: "$25/day",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            color: "from-gray-500 to-gray-700"
        },
        {
            name: "Sony A7 IV",
            category: "Camera",
            price: "$20/day",
            image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            color: "from-black to-gray-800"
        },
        {
            name: "DJI Mini 3 Pro",
            category: "Drone",
            price: "$18/day",
            image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            color: "from-gray-400 to-gray-600"
        },
        {
            name: "Oculus Quest 2",
            category: "VR Headset",
            price: "$15/day",
            image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            color: "from-white to-gray-200"
        }
    ];


    return (
        <div className={`w-full overflow-hidden transition-all duration-300 ${
            darkMode
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-900'
        }`}>

            {/* Hero Section with 3D-like elements */}
            <div className="relative">

                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl"></div>
                    <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-3xl"></div>

                    {/* Animated Circuit-like Lines */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
                        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>

                        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
                        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse" style={{animationDelay: '2.5s'}}></div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12 md:py-24">

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                        {/* Left Content - 5 columns */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-10">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                                    darkMode
                                        ? 'bg-purple-900/40 text-purple-300 border border-purple-800/50'
                                        : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                }`}>
                                    <IoSparkles className="mr-1" size={16} />
                                    <span>Revolutionizing Gadget Access</span>
                                </div>

                                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${
                                    darkMode
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                                        : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                                }`}>
                                    Tech On Demand.<br/>
                                    <span className={`relative inline-block ${
                                        darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    Without The{' '}
                                    <span className="relative">
                                        Commitment
                                        <svg className="absolute -bottom-5 left-0 w-full" viewBox="0 0 100 15"
                                           preserveAspectRatio="none" height="15">
                                        <path
                                            d="M0,5 Q40,0 50,5 Q60,10 100,5 L100,15 L0,15 Z"
                                            fill={darkMode ? 'rgba(147, 51, 234, 0.3)' : 'rgba(79, 70, 229, 0.2)'}
                                        />
                                        </svg>
                                    </span>
                                  </span>
                                </h1>

                                <p className={`text-lg md:text-xl max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Rent premium gadgets at a fraction of the cost. Try before you buy or earn by sharing your tech.
                                </p>
                            </div>

                            {/* Search Bar with Floating Labels */}
                            <div className={`h-24 relative max-w-md transition-all duration-300 transform hover:scale-[1.02] ${
                                darkMode
                                    ? 'bg-gray-800/70 rounded-2xl border border-purple-900/30 shadow-lg shadow-purple-900/10'
                                    : 'bg-white rounded-2xl border border-indigo-200/50 shadow-lg shadow-indigo-600/5'
                            }`}>
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="What gadget are you looking for?"
                                        className={`w-full px-5 py-4 pr-12 rounded-2xl focus:outline-none transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-transparent text-white placeholder-gray-400'
                                                : 'bg-transparent text-gray-900 placeholder-gray-500'
                                        }`}
                                    />
                                    <button
                                        type="submit"
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90'
                                        }`}
                                        aria-label="Search"
                                    >
                                        <FiSearch size={20} />
                                    </button>
                                </form>

                                {/* Floating Search Suggestions */}
                                <div className={`absolute bottom-0 left-4 right-6 flex space-x-2 overflow-x-auto pb-3 no-scrollbar`}>
                                    {['iPhone', 'Drone', 'Camera', 'MacBook', 'VR Headset'].map((term, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSearchQuery(term)}
                                            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gray-700/80 text-gray-300 hover:bg-purple-900/40 hover:text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                                            }`}
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Buttons with Animated Accents */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/rent"
                                    className={`group w-6/12 relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                                        darkMode
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-900/20'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-600/20'
                                    }`}
                                >
                                    <span className="relative z-10 flex items-center">
                                        Rent a Gadget <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                    <span className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-pink-600 to-purple-600"></span>
                                </Link>

                                {/*<Link
                                    to="/lend"
                                    className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                                        darkMode
                                            ? 'bg-gray-800 text-white border border-purple-600/30'
                                            : 'bg-white text-indigo-600 border border-indigo-200/50'
                                    }`}
                                >
                                    <span className="relative z-10 flex items-center">
                                        Lend Your Gadget <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                    <span className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${
                                        darkMode ? 'bg-purple-900/40' : 'bg-indigo-50/80'
                                    }`}></span>
                                </Link>*/}
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-full mr-3 ${
                                        darkMode ? 'bg-purple-900/40 text-purple-400' : 'bg-indigo-100 text-indigo-600'
                                    }`}>
                                        <FiZap size={16} />
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fast Delivery</p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Same-day in select areas</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className={`p-2 rounded-full mr-3 ${
                                        darkMode ? 'bg-purple-900/40 text-purple-400' : 'bg-indigo-100 text-indigo-600'
                                    }`}>
                                        <FiCpu size={16} />
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tech Support</p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>24/7 expert assistance</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - 7 columns with 3D Gadget Showcase */}
                        <div className="lg:col-span-7 relative">

                            {/* 3D-like Rotating Gadget Display */}
                            <div className="relative h-[500px] perspective-1000">
                                <div className={`absolute inset-0 rounded-3xl overflow-hidden ${
                                    darkMode
                                        ? 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 border border-purple-900/30'
                                        : 'bg-gradient-to-br from-white/50 to-indigo-100/30 border border-indigo-200/30'
                                } backdrop-blur-md shadow-xl`}>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-2xl"></div>
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-2xl"></div>
                                    </div>

                                    {/* Gadget Display */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {featuredGadgets.map((gadget, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${
                                                    index === activeGadget
                                                        ? 'opacity-100 scale-100 rotate-0 translate-z-0'
                                                        : 'opacity-0 scale-90 rotate-3 -translate-z-10'
                                                }`}
                                            >
                                                <div className="relative w-full h-full">

                                                    {/* Gadget Image */}
                                                    <div className="absolute inset-0 overflow-hidden">
                                                        <img
                                                            src={gadget.image || "/placeholder.svg"}
                                                            alt={gadget.name}
                                                            className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                                                        />
                                                    </div>

                                                    {/* Gradient Overlay */}
                                                    <div className={`absolute inset-0 bg-gradient-to-t ${
                                                        darkMode
                                                            ? 'from-gray-900/90 via-gray-900/30 to-transparent'
                                                            : 'from-gray-900/70 via-gray-900/20 to-transparent'
                                                    }`}></div>

                                                    {/* Gadget Info */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                                        <div className="flex items-end justify-between">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-300 mb-1">{gadget.category}</p>
                                                                <h3 className="text-3xl font-bold text-white mb-1">{gadget.name}</h3>
                                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm`}>
                                                                    {gadget.price}
                                                                </div>
                                                            </div>

                                                            <Link
                                                                to={`/rent/${gadget.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                className={`flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-300`}
                                                            >
                                                                <FiArrowRight size={20} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Gadget Selection Indicators */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {featuredGadgets.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveGadget(index)}
                                                onMouseEnter={() => handleGadgetHover(index)}
                                                onMouseLeave={handleGadgetLeave}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    index === activeGadget
                                                        ? 'w-8 bg-white'
                                                        : 'bg-white/50 hover:bg-white/80'
                                                }`}
                                                aria-label={`View gadget ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Pills */}
                    {/*<div className="mt-12 relative z-10">
                        <div className={`flex items-center justify-center flex-wrap gap-3 py-4 px-6 rounded-2xl mx-auto max-w-4xl ${
                            darkMode
                                ? 'bg-gray-800/70 border border-purple-900/30 backdrop-blur-md'
                                : 'bg-white/70 border border-indigo-200/30 backdrop-blur-md shadow-lg'
                        }`}>
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    to={`/category/${category.name.toLowerCase()}`}
                                    className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                                        darkMode
                                            ? 'bg-gray-700/70 text-white hover:bg-purple-900/40'
                                            : 'bg-gray-100/70 text-gray-800 hover:bg-indigo-100/70'
                                    }`}
                                >
                                    <span className={`mr-2 ${
                                        darkMode ? 'text-purple-400' : 'text-indigo-600'
                                    }`}>{category.icon}</span>
                                    <span className="text-sm font-medium">{category.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default BannerComponent;
