import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    FiSmartphone,
    FiMonitor,
    FiCamera,
    FiHeart,
    FiStar,
    FiMenu,
    FiX
} from 'react-icons/fi';
import {
    IoGameControllerOutline,
    IoHeadsetOutline,
    IoWatchOutline,
    IoSparklesOutline,
    IoGlassesOutline,
    IoAirplaneOutline
} from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const FeaturedProductsComponent = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();


    const [selectedCategory, setSelectedCategory] = useState(null);
    const [displayedGadgets, setDisplayedGadgets] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();


    // Gadget data with categories
    const gadgetsData = useMemo(() => [
        // Smartphones
        {
            id: 's1',
            name: 'iPhone 14 Pro',
            category: 'smartphone',
            image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 12.99,
            rating: 4.8,
            description: 'Latest iPhone with A16 Bionic chip and Pro camera system'
        },
        {
            id: 's2',
            name: 'Samsung Galaxy S23 Ultra',
            category: 'smartphone',
            image: 'https://images.unsplash.com/photo-1678911820864-e5cfd0309d3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 11.99,
            rating: 4.7,
            description: '200MP camera, S Pen, and powerful Snapdragon processor'
        },
        {
            id: 's3',
            name: 'Google Pixel 7 Pro',
            category: 'smartphone',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 10.99,
            rating: 4.6,
            description: 'Best-in-class camera with Google AI features'
        },

        // Laptops
        {
            id: 'l1',
            name: 'MacBook Pro 16"',
            category: 'laptop',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 24.99,
            rating: 4.9,
            description: 'M2 Pro chip, 16GB RAM, 1TB SSD, stunning Liquid Retina XDR display'
        },
        {
            id: 'l2',
            name: 'Dell XPS 15',
            category: 'laptop',
            image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 19.99,
            rating: 4.7,
            description: 'Intel Core i9, 32GB RAM, 1TB SSD, NVIDIA RTX 3050 Ti'
        },
        {
            id: 'l3',
            name: 'Razer Blade 17',
            category: 'laptop',
            image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 22.99,
            rating: 4.6,
            description: 'Gaming powerhouse with RTX 4080, 32GB RAM, 240Hz display'
        },

        // Cameras
        {
            id: 'c1',
            name: 'Sony Alpha A7 IV',
            category: 'camera',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 18.99,
            rating: 4.8,
            description: 'Full-frame mirrorless with 33MP sensor and 4K60p video'
        },
        {
            id: 'c2',
            name: 'Canon EOS R5',
            category: 'camera',
            image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 21.99,
            rating: 4.9,
            description: '45MP full-frame sensor with 8K video recording'
        },
        {
            id: 'c3',
            name: 'Fujifilm X-T5',
            category: 'camera',
            image: 'https://images.unsplash.com/photo-1588372405219-e40d64efafcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 15.99,
            rating: 4.7,
            description: 'Classic design with 40MP APS-C sensor and film simulations'
        },

        // Gaming
        {
            id: 'g1',
            name: 'PlayStation 5',
            category: 'gaming',
            image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 14.99,
            rating: 4.8,
            description: 'Next-gen gaming with DualSense controller and 3D audio'
        },
        {
            id: 'g2',
            name: 'Xbox Series X',
            category: 'gaming',
            image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 13.99,
            rating: 4.7,
            description: 'Most powerful Xbox ever with 4K gaming at up to 120FPS'
        },
        {
            id: 'g3',
            name: 'Nintendo Switch OLED',
            category: 'gaming',
            image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 9.99,
            rating: 4.6,
            description: 'Hybrid console with vibrant OLED display and enhanced audio'
        },

        // Audio
        {
            id: 'a1',
            name: 'Sony WH-1000XM5',
            category: 'audio',
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 8.99,
            rating: 4.9,
            description: 'Industry-leading noise cancellation with premium sound quality'
        },
        {
            id: 'a2',
            name: 'Apple AirPods Pro 2',
            category: 'audio',
            image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 7.99,
            rating: 4.8,
            description: 'Active noise cancellation with transparency mode and spatial audio'
        },
        {
            id: 'a3',
            name: 'Bose SoundLink Revolve+',
            category: 'audio',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 6.99,
            rating: 4.7,
            description: '360° sound with deep bass and 16-hour battery life'
        },

        // Wearables
        {
            id: 'w1',
            name: 'Apple Watch Ultra',
            category: 'wearable',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 11.99,
            rating: 4.8,
            description: 'Rugged smartwatch with precision GPS and 36-hour battery life'
        },
        {
            id: 'w2',
            name: 'Samsung Galaxy Watch 5 Pro',
            category: 'wearable',
            image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 9.99,
            rating: 4.6,
            description: 'Advanced health tracking with sapphire crystal display'
        },
        {
            id: 'w3',
            name: 'Garmin Fenix 7',
            category: 'wearable',
            image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 12.99,
            rating: 4.7,
            description: 'Multi-sport GPS watch with advanced training features'
        },

        // VR
        {
            id: 'v1',
            name: 'Meta Quest 3',
            category: 'vr',
            image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 15.99,
            rating: 4.7,
            description: 'Standalone VR headset with mixed reality capabilities'
        },
        {
            id: 'v2',
            name: 'Valve Index',
            category: 'vr',
            image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 19.99,
            rating: 4.8,
            description: 'Premium PC VR with finger tracking and high-resolution display'
        },
        {
            id: 'v3',
            name: 'PlayStation VR2',
            category: 'vr',
            image: 'https://images.unsplash.com/photo-1626387346567-68d0b1ee4f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 16.99,
            rating: 4.6,
            description: 'Next-gen VR for PS5 with eye tracking and haptic feedback'
        },

        // Drones
        {
            id: 'd1',
            name: 'DJI Mavic 3 Pro',
            category: 'drone',
            image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 29.99,
            rating: 4.9,
            description: 'Professional-grade drone with Hasselblad camera system'
        },
        {
            id: 'd2',
            name: 'Autel EVO Lite+',
            category: 'drone',
            image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 24.99,
            rating: 4.7,
            description: '6K camera drone with 40-minute flight time'
        },
        {
            id: 'd3',
            name: 'DJI Mini 3 Pro',
            category: 'drone',
            image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            pricePerDay: 19.99,
            rating: 4.8,
            description: 'Ultralight drone with 4K HDR video and obstacle avoidance'
        }
    ], []);


    // Categories configuration
    const categories = useMemo(() => [
        {id: 'smartphone', name: 'Smartphones', icon: <FiSmartphone className="text-purple-400" size={20}/>},
        {id: 'laptop', name: 'Laptops', icon: <FiMonitor className="text-indigo-400" size={20}/>},
        {id: 'camera', name: 'Cameras', icon: <FiCamera className="text-blue-400" size={20}/>},
        {id: 'gaming', name: 'Gaming', icon: <IoGameControllerOutline className="text-pink-400" size={20}/>},
        {id: 'audio', name: 'Audio', icon: <IoHeadsetOutline className="text-cyan-400" size={20}/>},
        {id: 'wearable', name: 'Wearables', icon: <IoWatchOutline className="text-green-400" size={20}/>},
        {id: 'vr', name: 'VR', icon: <IoGlassesOutline className="text-amber-400" size={20}/>},
        {id: 'drone', name: 'Drones', icon: <IoAirplaneOutline className="text-rose-400" size={20}/>}
    ], []);


    // Get random gadget from each category
    const getRandomGadgetsFromEachCategory = useCallback(() => {
        const categoryIds = categories.map(cat => cat.id);
        const randomGadgets = [];

        categoryIds.forEach(categoryId => {
            const categoryGadgets = gadgetsData.filter(gadget => gadget.category === categoryId);
            if (categoryGadgets.length > 0) {
                const randomIndex = Math.floor(Math.random() * categoryGadgets.length);
                randomGadgets.push(categoryGadgets[randomIndex]);
            }
        });

        return randomGadgets;
    }, [categories, gadgetsData]);


    // Update displayed gadgets based on selected category
    useEffect(() => {
        if (selectedCategory) {
            const filteredGadgets = gadgetsData.filter(gadget => gadget.category === selectedCategory);
            setDisplayedGadgets(filteredGadgets);
        } else {
            setDisplayedGadgets(getRandomGadgetsFromEachCategory());
        }
    }, [selectedCategory, gadgetsData, getRandomGadgetsFromEachCategory]);


    // Handle category selection
    const handleCategoryClick = (categoryId) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(categoryId);
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
        <div className={`px-4 py-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div
                    className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
                <div
                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Section Header */}
            <div className="mb-8 text-center">
                <h2 className={`text-4xl md:text-5xl font-bold mb-2 ${
                    darkMode
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                }`}>
                    Featured Gadgets
                </h2>
                <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Explore our premium selection of high-tech gadgets available for rent
                </p>
            </div>

            {/* Category Selection - Desktop */}
            <div className="hidden lg:flex justify-center mb-8">
                <div className={`inline-flex flex-wrap justify-center gap-2 p-2 rounded-2xl ${
                    darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-md'
                }`}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                                selectedCategory === category.id
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
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                        darkMode ? 'bg-gray-800/70 text-white' : 'bg-white/90 text-gray-900 shadow-sm'
                    }`}
                >
                    <span className="flex items-center gap-2">
                    {selectedCategory
                        ? <>
                            {categories.find(c => c.id === selectedCategory)?.icon}
                            <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
                        </>
                        : <>
                            <IoSparklesOutline className={darkMode ? 'text-purple-400' : 'text-indigo-500'} size={20}/>
                            <span>All Categories</span>
                        </>
                    }
                    </span>
                    {isMenuOpen ? <FiX size={20}/> : <FiMenu size={20}/>}
                </button>

                {isMenuOpen && (
                    <div className={`absolute z-20 mt-2 w-full rounded-xl overflow-hidden shadow-xl ${
                        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`flex items-center gap-2 w-full px-4 py-3 text-left transition-colors ${
                                    selectedCategory === category.id
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
                        className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                            darkMode
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
                            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                                darkMode
                                    ? 'bg-gray-900/70 text-white backdrop-blur-md'
                                    : 'bg-white/70 text-gray-900 backdrop-blur-md'
                            }`}>
                                {categories.find(c => c.id === gadget.category)?.icon}
                            </div>

                            {/* View Details Button (visible on hover) */}
                            <div
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    darkMode
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
                                <div className={`flex items-center ${
                                    darkMode ? 'text-purple-400' : 'text-indigo-600'
                                }`}>
                                    <span className="font-bold">${gadget.pricePerDay.toFixed(2)}</span>
                                    <span
                                        className={`text-xs ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/day</span>
                                </div>

                                <div className="flex items-center">
                                    <FiStar className={`${
                                        darkMode ? 'text-amber-400' : 'text-amber-500'
                                    } mr-1`} size={16}/>
                                    <span className="font-medium">{gadget.rating}</span>
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
