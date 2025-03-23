import React, { useState, useEffect, useRef } from 'react';
import {
    FiChevronLeft,
    FiChevronRight,
    FiStar,
    FiUser,
    FiMessageSquare,
    FiArrowRight
} from 'react-icons/fi';
import {
    IoSparklesOutline,
    IoTimeOutline,
    IoThumbsUpOutline
} from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const WhatOurCustomersSayComponent = () => {

    // const [darkMode, setDarkMode] = useState(false);
    const {darkMode} = useTheme();


    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const autoPlayRef = useRef(null);


    // Customer testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Alex Johnson",
            profession: "Software Developer",
            avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "GadgetSwap has completely changed how I approach tech. Instead of spending thousands on the latest MacBook Pro, I rented it for a crucial project. The device arrived in pristine condition, and the return process was effortless. I'm now a regular customer!",
            gadgetRented: "MacBook Pro 16\"",
            rentalDuration: "2 weeks"
        },
        {
            id: 2,
            name: "Sophia Chen",
            profession: "Content Creator",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "As a content creator, I need different cameras for different projects. GadgetSwap lets me access high-end equipment without the massive investment. Their Sony Alpha A7 IV was delivered on time and in perfect condition. The customer service is exceptional!",
            gadgetRented: "Sony Alpha A7 IV",
            rentalDuration: "10 days"
        },
        {
            id: 3,
            name: "Marcus Williams",
            profession: "Gaming Enthusiast",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 4,
            review: "I wanted to try the PS5 before committing to a purchase. GadgetSwap made it possible with their affordable rental options. The console was in great condition with all accessories included. Only giving 4 stars because delivery was a day late, but everything else was perfect.",
            gadgetRented: "PlayStation 5",
            rentalDuration: "1 month"
        },
        {
            id: 4,
            name: "Emma Rodriguez",
            profession: "Architect",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "I needed a powerful laptop for rendering 3D models while traveling. GadgetSwap's Razer Blade 17 was the perfect solution. The performance was outstanding, and the rental process was seamless from start to finish. Will definitely use again for future projects!",
            gadgetRented: "Razer Blade 17",
            rentalDuration: "3 weeks"
        },
        {
            id: 5,
            name: "David Kim",
            profession: "Photographer",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "GadgetSwap has been a game-changer for my photography business. I rented the Canon EOS R5 for a wedding shoot, and the results were spectacular. The equipment was in pristine condition, and the rental cost was a fraction of the purchase price. Highly recommended!",
            gadgetRented: "Canon EOS R5",
            rentalDuration: "Weekend"
        }
    ];


    // Check if mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // Autoplay functionality
    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                goToNext();
            }, 3000);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, activeIndex]);


    // Handle navigation
    const goToPrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };


    const goToNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };


    const goToIndex = (index) => {
        setActiveIndex(index);
    };


    // Pause autoplay on hover
    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };


    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };


    // Render star rating
    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <FiStar
                key={index}
                className={`${index < rating
                    ? darkMode ? 'text-amber-400' : 'text-amber-500'
                    : darkMode ? 'text-gray-600' : 'text-gray-300'
                }`}
                size={16}
                fill={index < rating ? 'currentColor' : 'none'}
            />
        ));
    };


    return (
        <div className={`w-full py-16 transition-colors duration-300 ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                        darkMode
                            ? 'bg-gray-800/70 text-cyan-300 border border-cyan-800/50'
                            : 'bg-white/80 text-indigo-700 border border-indigo-200/50'
                    } backdrop-blur-md`}>
                        <FiMessageSquare className="mr-2" />
                        <span>Customer Testimonials</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        darkMode
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                    }`}>
                        What Our Customers Say
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Discover why tech enthusiasts trust GadgetSwap for their rental needs
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div
                    className="max-w-6xl mx-auto"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Main Testimonial Card */}
                    <div className={`px-5 relative rounded-2xl overflow-hidden transition-all duration-500 ${
                        darkMode
                            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                            : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl'
                    }`}>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl -z-10"></div>

                        {/* Quote Icon */}
                        <div className={`absolute top-6 right-6 w-20 h-20 opacity-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">

                            {/* Customer Avatar - Mobile View Top, Desktop View Left */}
                            <div className="flex flex-col items-center md:items-start">
                                <div className="relative mb-4">
                                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 ${
                                        darkMode ? 'border-gray-700' : 'border-white'
                                    } shadow-lg`}>
                                        <img
                                            src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                                            alt={testimonials[activeIndex].name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                                        darkMode
                                            ? 'bg-gray-800 border border-gray-700'
                                            : 'bg-white border border-gray-200'
                                    }`}>
                                        <IoThumbsUpOutline className={darkMode ? 'text-cyan-400' : 'text-indigo-600'} size={16} />
                                    </div>
                                </div>

                                <div className="text-center md:text-left mb-4">
                                    <h3 className="font-bold text-lg">{testimonials[activeIndex].name}</h3>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {testimonials[activeIndex].profession}
                                    </p>
                                </div>

                                <div className="flex items-center mb-4">
                                    {renderStars(testimonials[activeIndex].rating)}
                                </div>

                                {/* Rental Details */}
                                <div className={`w-full rounded-xl p-4 mt-2 ${
                                    darkMode
                                        ? 'bg-gray-800/80 border border-gray-700/50'
                                        : 'bg-gray-50/80 border border-gray-200/50'
                                }`}>
                                    <div className="flex items-center mb-2">
                                        <FiUser className={darkMode ? 'text-purple-400' : 'text-indigo-600'} size={16}/>
                                        <span className="ml-2 text-sm font-medium">Rented:</span>
                                        <span
                                            className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                          {testimonials[activeIndex].gadgetRented}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <IoTimeOutline className={darkMode ? 'text-cyan-400' : 'text-indigo-600'}
                                                       size={16}/>
                                        <span className="ml-2 text-sm font-medium">Duration:</span>
                                        <span
                                            className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                          {testimonials[activeIndex].rentalDuration}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className="md:col-span-2 flex flex-col justify-between">
                                <div>
                                    <div className={`text-sm md:text-base leading-relaxed mt-20 mb-8 text-justify ${
                                        darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        "{testimonials[activeIndex].review}"
                                    </div>

                                    {/* Key Benefits */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                        <div className={`p-3 rounded-xl ${
                                            darkMode
                                                ? 'bg-gray-800/80 border border-gray-700/50'
                                                : 'bg-gray-50/80 border border-gray-200/50'
                                        }`}>
                                            <div className="flex items-center">
                                                <IoSparklesOutline className={darkMode ? 'text-purple-400' : 'text-indigo-600'} size={18} />
                                                <span className="ml-2 text-sm font-medium">Premium Quality</span>
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-xl ${
                                            darkMode
                                                ? 'bg-gray-800/80 border border-gray-700/50'
                                                : 'bg-gray-50/80 border border-gray-200/50'
                                        }`}>
                                            <div className="flex items-center">
                                                <IoTimeOutline className={darkMode ? 'text-cyan-400' : 'text-indigo-600'} size={18} />
                                                <span className="ml-2 text-sm font-medium">On-time Delivery</span>
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-xl ${
                                            darkMode
                                                ? 'bg-gray-800/80 border border-gray-700/50'
                                                : 'bg-gray-50/80 border border-gray-200/50'
                                        }`}>
                                            <div className="flex items-center">
                                                <IoThumbsUpOutline className={darkMode ? 'text-pink-400' : 'text-pink-600'} size={18} />
                                                <span className="ml-2 text-sm font-medium">Easy Returns</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Controls */}
                                <div className="flex justify-between items-center mt-4">

                                    {/* Indicators */}
                                    <div className="flex space-x-2">
                                        {testimonials.map((_, index) => (
                                            <button
                                                key={`indicator-${index}`}
                                                onClick={() => goToIndex(index)}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    activeIndex === index
                                                        ? darkMode
                                                            ? 'bg-cyan-500 scale-125'
                                                            : 'bg-indigo-600 scale-125'
                                                        : darkMode
                                                            ? 'bg-gray-700 hover:bg-gray-600'
                                                            : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                                aria-label={`Go to testimonial ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={goToPrev}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gray-800/70 text-white border border-gray-700/50 hover:bg-gray-700/70'
                                                    : 'bg-white/70 text-gray-700 border border-gray-200/50 hover:bg-gray-100/70'
                                            }`}
                                            aria-label="Previous testimonial"
                                        >
                                            <FiChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={goToNext}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                            }`}
                                            aria-label="Next testimonial"
                                        >
                                            <FiChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 text-center">
                        <a
                            href="/testimonials"
                            className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                                darkMode
                                    ? 'bg-gray-800/70 text-white border border-gray-700/50 hover:bg-gray-700/70'
                                    : 'bg-white/70 text-indigo-600 border border-indigo-200/50 hover:bg-gray-50/70'
                            }`}
                        >
                            <span>Read More Customer Stories</span>
                            <FiArrowRight className="ml-2" />
                        </a>
                    </div>
                </div>

                {/* Testimonial Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
                    <div className={`p-6 rounded-xl text-center ${
                        darkMode
                            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                            : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                    }`}>
                        <div className={`text-4xl font-bold mb-2 ${
                            darkMode
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'
                        }`}>
                            98%
                        </div>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            Customer Satisfaction
                        </p>
                    </div>

                    <div className={`p-6 rounded-xl text-center ${
                        darkMode
                            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                            : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                    }`}>
                        <div className={`text-4xl font-bold mb-2 ${
                            darkMode
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400'
                                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600'
                        }`}>
                            10K+
                        </div>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            Successful Rentals
                        </p>
                    </div>

                    <div className={`p-6 rounded-xl text-center ${
                        darkMode
                            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                            : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                    }`}>
                        <div className={`text-4xl font-bold mb-2 ${
                            darkMode
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400'
                                : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600'
                        }`}>
                            4.9
                        </div>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            Average Rating
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatOurCustomersSayComponent;
