import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiStar,
    FiMenu,
    FiX,
} from 'react-icons/fi';
import {
    IoSparklesOutline,
} from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedGadgets } from "../../Features/featuredGadgetsForHomePage/featuredGadgetsForHomePageSlice.js";
import {
    FaCamera,
    FaClock,
    FaGamepad,
    FaHeadphones,
    FaLaptop,
    FaMobileAlt, FaPlane, FaProjectDiagram,
    FaTabletAlt,
    FaVolumeUp, FaVrCardboard, FaWifi
} from "react-icons/fa";


const FeaturedProductsComponent = () => {

    const dispatch = useDispatch();
    const { featuredGadgets } = useSelector((state) => state.featuredGadgetsForHomePage);

    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [gadgetsData, setGadgetsData] = useState([]);
    const [displayedGadgets, setDisplayedGadgets] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();


    // Gadget data with categories
    /*const gadgetsData = useMemo(() => [featuredGadgets?.data], [featuredGadgets?.data]);*/


    // Categories configuration
    const categories = useMemo(() => [
        { name: "Smartphones", icon: <FaMobileAlt className="mr-2 text-blue-500" /> },
        { name: "Laptops", icon: <FaLaptop className="mr-2 text-purple-500" /> },
        // { name: "Tablets", icon: <FaTabletAlt className="mr-2 text-green-500" /> },
        // { name: "Smartwatches", icon: <FaClock className="mr-2 text-pink-500" /> },
        { name: "Cameras", icon: <FaCamera className="mr-2 text-red-500" /> },
        { name: "Gaming", icon: <FaGamepad className="mr-2 text-indigo-500" /> },
        // { name: "Audio", icon: <FaVolumeUp className="mr-2 text-yellow-500" /> },
        // { name: "Headphones", icon: <FaHeadphones className="mr-2 text-cyan-500" /> },
        { name: "Speakers", icon: <FaVolumeUp className="mr-2 text-blue-500" /> },
        { name: "Wearables", icon: <FaWifi className="mr-2 text-lime-500" /> },
        { name: "VR", icon: <FaVrCardboard className="mr-2 text-orange-500" /> },
        { name: "Drones", icon: <FaPlane className="mr-2 text-teal-500" /> },
        { name: "Projectors", icon: <FaProjectDiagram className="mr-2 text-amber-500" /> },
    ], []);


    // Fetch gadgets on mount
    useEffect(() => {
        dispatch(fetchFeaturedGadgets());
    }, [dispatch]);


    // Fetch gadgets data
    useEffect(() => {
        const fetchFeaturedGadgets = async () => {
            if (featuredGadgets?.data?.length > 0) {
                // console.log(featuredGadgets?.data);
                setGadgetsData(featuredGadgets?.data);
            }
        }
        fetchFeaturedGadgets().then()
    }, [featuredGadgets?.data])


    // Get random gadget from each category
    const getRandomGadgetsFromEachCategory = useCallback(() => {
        const categoryNames = categories.map(cat => cat.name);
        const randomGadgets = [];

        if (gadgetsData.length !== 0) {
            categoryNames.forEach(categoryName => {
                const categoryGadgets = gadgetsData.filter(gadget => gadget?.category === categoryName);
                if (categoryGadgets.length > 0) {
                    const randomIndex = Math.floor(Math.random() * categoryGadgets.length);
                    randomGadgets.push(categoryGadgets[randomIndex]);
                }
            });
        }
        return randomGadgets;
    }, [categories, gadgetsData]);


    // Update displayed gadgets based on selected category
    useEffect(() => {
        if (selectedCategory) {
            const filteredGadgets = gadgetsData.filter(gadget => gadget?.category === selectedCategory);
            setDisplayedGadgets(filteredGadgets);
        } else {
            setDisplayedGadgets(getRandomGadgetsFromEachCategory());
        }
    }, [selectedCategory, gadgetsData, getRandomGadgetsFromEachCategory]);


    // Handle category selection
    const handleCategoryClick = (categoryName) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(categoryName);
        }
        // Close mobile menu when category is selected
        setIsMenuOpen(false);
    };


    // Handle gadget card click
    const handleGadgetClick = (gadgetId) => {
        navigate(`/all-gadgets/gadget-details/${gadgetId}`);
    };


    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <div className={`px-4 py-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div
                    className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
                <div
                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Section Header */}
            <div className="mb-12 text-center space-y-4">
                <h2
                    className={`text-4xl md:text-5xl font-extrabold tracking-tight inline-block transition-all duration-500 ${darkMode
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-lg'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-md'
                        }`}
                >
                    Featured Gadgets
                </h2>
                <div className="flex justify-center">
                    <span className="w-24 h-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></span>
                </div>
                <p
                    className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                >
                    Explore our premium selection of high-tech gadgets available for rent
                </p>
            </div>



            {/* Category Selection - Desktop */}
            <div className="hidden lg:flex justify-center mb-8">
                <div className={`max-w-7xl inline-flex flex-wrap justify-center gap-2 p-2 rounded-2xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-md'
                    }`}>
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(category?.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.name
                                ? darkMode
                                    ? 'bg-gray-700 text-white shadow-lg shadow-purple-900/20'
                                    : 'bg-gray-100 text-gray-900 shadow-md'
                                : darkMode
                                    ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                                    : 'bg-white/50 text-gray-700 hover:bg-gray-100/80'
                                }`}
                        >
                            {category.icon}
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Selection - Mobile */}
            <div className="lg:hidden mb-6 relative">
                <button
                    onClick={toggleMenu}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-gray-800/70 text-white' : 'bg-white/90 text-gray-900 shadow-sm'
                        }`}
                >
                    <span className="flex items-center gap-2">
                        {selectedCategory
                            ? <>
                                {categories.find(c => c.id === selectedCategory)?.icon}
                                <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
                            </>
                            : <>
                                <IoSparklesOutline className={darkMode ? 'text-purple-400' : 'text-indigo-500'} size={20} />
                                <span>All Categories</span>
                            </>
                        }
                    </span>
                    {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>

                {isMenuOpen && (
                    <div className={`absolute z-20 mt-2 w-full rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category?.name)}
                                className={`flex items-center gap-2 w-full px-4 py-3 text-left transition-colors ${selectedCategory === category.id
                                    ? darkMode
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                    : darkMode
                                        ? 'text-gray-300 hover:bg-gray-700/80'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {category.icon}
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Gadgets Grid */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedGadgets.map((gadget) => (
                    <div
                        key={gadget.id}
                        onClick={() => handleGadgetClick(gadget.id)}
                        className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${darkMode
                            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50 hover:shadow-lg hover:shadow-purple-900/20'
                            : 'bg-white/80 backdrop-blur-md border border-gray-200/50 hover:shadow-lg hover:shadow-indigo-200/50'
                            }`}
                    >
                        {/* Hover Effect */}
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={gadget.image || "/placeholder.svg"}
                                alt={gadget.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Category Badge */}
                            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${darkMode
                                ? 'bg-gray-900/70 text-white backdrop-blur-md'
                                : 'bg-white/70 text-gray-900 backdrop-blur-md'
                                }`}>
                                {categories.find(c => c.id === gadget.category)?.icon}
                            </div>

                            {/* View Details Button (visible on hover) */}
                            <div
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${darkMode
                                    ? 'bg-purple-600/90 text-white backdrop-blur-md'
                                    : 'bg-indigo-600/90 text-white backdrop-blur-md'
                                    }`}>
                                    View Details
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-1 truncate">{gadget.name}</h3>
                            <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {gadget.description}
                            </p>

                            {/* Price and Rating */}
                            <div className="flex justify-between items-center">
                                <div className={`flex items-center ${darkMode ? 'text-purple-400' : 'text-indigo-600'
                                    }`}>
                                    <span className="font-bold">${gadget.pricePerDay.toFixed(2)}</span>
                                    <span
                                        className={`text-xs ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/day</span>
                                </div>

                                <div className="flex items-center">
                                    <FiStar className={`${darkMode ? 'text-amber-400' : 'text-amber-500'
                                        } mr-1`} size={16} />
                                    <span className="font-medium">{gadget?.average_rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Animated Border Effect */}
                        <div
                            className="absolute inset-0 border border-transparent group-hover:border-purple-500/30 rounded-xl transition-colors duration-300"></div>
                    </div>
                ))}
            </div>

            {/* Animation Keyframes */}
            <style>{`
                @keyframes pulse-slow {
                    0% {
                        opacity: 0.4;
                    }
                    50% {
                        opacity: 0.7;
                    }
                    100% {
                        opacity: 0.4;
                    }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `}</style>

        </div>
    );
};

export default FeaturedProductsComponent;
