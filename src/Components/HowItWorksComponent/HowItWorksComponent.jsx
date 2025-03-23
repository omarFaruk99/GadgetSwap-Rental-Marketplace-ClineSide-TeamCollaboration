import React, {useState, useEffect} from 'react';
import {
    FiSearch,
    FiCheckSquare,
    FiCalendar,
    FiPackage,
    FiSmartphone,
    FiRefreshCw,
    FiAward,
    FiChevronRight,
    FiChevronLeft,
    FiPlay,
    FiPause
} from 'react-icons/fi';
import {IoSparkles, IoFlash, IoRocket, IoShieldCheckmark} from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const HowItWorksComponent = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();


    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);


    // Auto cycle through steps
    useEffect(() => {
        if (isAutoPlaying) {
            const interval = setInterval(() => {
                handleNextStep();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, activeStep]);


    const handleNextStep = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
            setIsTransitioning(false);
        }, 600);
    };


    const handlePrevStep = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
            setIsTransitioning(false);
        }, 600);
    };


    const handleStepClick = (index) => {
        if (isTransitioning || index === activeStep) return;

        setIsTransitioning(true);
        setIsAutoPlaying(false);
        setTimeout(() => {
            setActiveStep(index);
            setIsTransitioning(false);
        }, 600);
    };


    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };


    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };


    const togglePlayPause = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };


    const steps = [
        {
            id: 1,
            title: 'Browse',
            description: 'Explore our vast collection of premium gadgets using advanced filters to find exactly what you need.',
            icon: <FiSearch size={32}/>,
            color: 'from-blue-500 to-cyan-500',
            benefit: 'Access to the latest tech without commitment',
            highlightEmoji: <IoSparkles className="text-blue-400" size={18}/>,
            image: 'https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167244/browse_dxfgtc.jpg',
            bgColor: 'bg-blue-500/10'
        },
        {
            id: 2,
            title: 'Choose',
            description: 'Compare specs, read reviews, and select the perfect gadget with flexible rental periods that suit your needs.',
            icon: <FiCheckSquare size={32}/>,
            color: 'from-indigo-500 to-blue-500',
            benefit: 'Find the exact model and specifications you need',
            highlightEmoji: <IoFlash className="text-indigo-400" size={18}/>,
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            bgColor: 'bg-indigo-500/10'
        },
        {
            id: 3,
            title: 'Confirm Rent',
            description: 'Book your gadget with our secure, hassle-free payment system. Add optional insurance for complete peace of mind.',
            icon: <FiCalendar size={32}/>,
            color: 'from-violet-500 to-indigo-500',
            benefit: 'Transparent pricing with no hidden fees',
            highlightEmoji: <IoShieldCheckmark className="text-violet-400" size={18}/>,
            image: 'https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167444/confirm_rent_hyb7mg.jpg',
            bgColor: 'bg-violet-500/10'
        },
        {
            id: 4,
            title: 'Receive',
            description: 'Get your gadget delivered to your doorstep with premium packaging, fully charged and ready to use immediately.',
            icon: <FiPackage size={32}/>,
            color: 'from-purple-500 to-violet-500',
            benefit: 'Fast shipping with real-time tracking',
            highlightEmoji: <IoRocket className="text-purple-400" size={18}/>,
            image: 'https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167654/receive_hgh1yn.jpg',
            bgColor: 'bg-purple-500/10'
        },
        {
            id: 5,
            title: 'Use',
            description: 'Enjoy your premium gadget with full technical support throughout your rental period for any questions or issues.',
            icon: <FiSmartphone size={32}/>,
            color: 'from-pink-500 to-purple-500',
            benefit: '24/7 tech support included with every rental',
            highlightEmoji: <IoSparkles className="text-pink-400" size={18}/>,
            image: 'https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg',
            bgColor: 'bg-pink-500/10'
        },
        {
            id: 6,
            title: 'Return',
            description: 'When your rental period ends, simply schedule a pickup. No need to repackage or worry about shipping labels.',
            icon: <FiRefreshCw size={32}/>,
            color: 'from-rose-500 to-pink-500',
            benefit: 'Hassle-free returns with scheduled pickup',
            highlightEmoji: <IoFlash className="text-rose-400" size={18}/>,
            image: 'https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742168286/return_hnyvhi.jpg',
            bgColor: 'bg-rose-500/10'
        },
        {
            id: 7,
            title: 'Reward',
            description: 'Earn loyalty points with every rental that can be redeemed for discounts, extended rental periods, or premium gadgets.',
            icon: <FiAward size={32}/>,
            color: 'from-amber-500 to-rose-500',
            benefit: 'Loyalty program with exclusive member benefits',
            highlightEmoji: <IoRocket className="text-amber-400" size={18}/>,
            image: 'https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742166942/reward_ansntv.jpg',
            bgColor: 'bg-amber-500/10'
        }
    ];


    return (
        <div className={`py-32 transition-colors duration-500 relative overflow-hidden ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
                <div
                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>

                {/* Background Image */}
                <div className="absolute inset-0 opacity-5">
                    <img
                        src="https://images.unsplash.com/photo-1581090700227-8e3b56af796a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Tech background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Circuit-like Lines */}
                <div className="absolute inset-0 overflow-hidden opacity-5">
                    <div
                        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                    <div
                        className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse"
                        style={{animationDelay: '1s'}}></div>
                    <div
                        className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"
                        style={{animationDelay: '2s'}}></div>

                    <div
                        className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse"
                        style={{animationDelay: '0.5s'}}></div>
                    <div
                        className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-pulse"
                        style={{animationDelay: '1.5s'}}></div>
                    <div
                        className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse"
                        style={{animationDelay: '2.5s'}}></div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                        darkMode
                            ? 'bg-gray-800/70 text-cyan-300 border border-cyan-800/50'
                            : 'bg-white/80 text-indigo-700 border border-indigo-200/50'
                    } backdrop-blur-md`}>
                        <IoRocket className="mr-2"/>
                        <span>Future of Gadget Rentals</span>
                    </div>

                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
                        darkMode
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                    }`}>
                        Seamless Rental Experience
                    </h2>
                    <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Our streamlined process makes renting high-tech gadgets easier than ever.
                        Follow these steps to elevate your tech experience without the commitment.
                    </p>
                </div>

                {/* Holographic Display View */}
                <div
                    className="relative mb-12 overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Holographic Container */}
                    <div className={`relative w-full rounded-3xl overflow-hidden ${
                        darkMode
                            ? 'bg-gray-900/40 border border-gray-800/50'
                            : 'bg-gray-900/20 border border-gray-200/30'
                    } backdrop-blur-md shadow-2xl`}>

                        {/* Holographic Grid Background */}
                        <div className="absolute inset-0 holographic-grid opacity-20"></div>

                        {/* Main Content Area */}
                        <div className="relative p-6 md:p-8">

                            {/* Header with Step Counter */}
                            <div className="flex justify-between items-center mb-6">
                                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    darkMode
                                        ? 'bg-gray-800/70 text-cyan-300 border border-cyan-800/50'
                                        : 'bg-white/30 text-white border border-white/20'
                                } backdrop-blur-md`}>
                                    Step {activeStep + 1} of {steps.length}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={togglePlayPause}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-gray-800/70 text-white border border-gray-700/50 hover:bg-gray-700/70'
                                                : 'bg-white/30 text-white border border-white/20 hover:bg-white/40'
                                        } backdrop-blur-md`}
                                        aria-label={isAutoPlaying ? "Pause" : "Play"}
                                    >
                                        {isAutoPlaying ? <FiPause size={20}/> : <FiPlay size={20}/>}
                                    </button>
                                </div>
                            </div>

                            {/* Holographic Display - Horizontal Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

                                {/* Left Side - Holographic Image */}
                                <div className={`relative rounded-2xl overflow-hidden h-48 md:h-64 max-w-full mx-auto ${
                                    isTransitioning ? 'opacity-0' : 'opacity-100'
                                } transition-opacity duration-600`}>

                                    {/* Main Image with Holographic Effect */}
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden hologram-effect">
                                        <img
                                            src={steps[activeStep].image || "/placeholder.svg"}
                                            alt={steps[activeStep].title}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />

                                        {/* Scanning Effect */}
                                        <div className="absolute inset-0 hologram-scan"></div>

                                        {/* Corner Markers */}
                                        <div
                                            className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-cyan-400/70 rounded-tl-2xl"></div>
                                        <div
                                            className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-cyan-400/70 rounded-tr-2xl"></div>
                                        <div
                                            className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-cyan-400/70 rounded-bl-2xl"></div>
                                        <div
                                            className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-cyan-400/70 rounded-br-2xl"></div>
                                    </div>

                                    {/* Step Number */}
                                    <div
                                        className={`absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold ${
                                            darkMode
                                                ? 'bg-gray-900/80 text-white border border-gray-700/50'
                                                : 'bg-gray-900/60 text-white border border-white/30'
                                        } backdrop-blur-md z-10`}>
                                        {steps[activeStep].id}
                                    </div>
                                </div>

                                {/* Middle/Right Side - Step Information */}
                                <div className={`md:col-span-2 space-y-4 ${
                                    isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                                } transition-all duration-600`}>

                                    {/* Step Title */}
                                    <div className="flex items-center">
                                        <h3 className={`text-2xl md:text-3xl font-bold ${
                                            darkMode ? 'text-white' : 'text-white'
                                        }`}>
                                            {steps[activeStep].title}
                                        </h3>
                                        <div className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                                            darkMode
                                                ? 'bg-gray-800/70 text-cyan-300 border border-cyan-800/50'
                                                : 'bg-white/30 text-white border border-white/20'
                                        } backdrop-blur-md`}>
                                            Phase {steps[activeStep].id}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-base md:text-lg text-white/90">
                                        {steps[activeStep].description}
                                    </p>

                                    {/* Key Benefit */}
                                    <div className={`p-3 rounded-xl ${
                                        darkMode
                                            ? 'bg-gray-800/70 border border-gray-700/50'
                                            : 'bg-white/10 border border-white/20'
                                    } backdrop-blur-md`}>
                                        <div className="flex items-center">
                                            {steps[activeStep].highlightEmoji}
                                            <span className="ml-2 font-medium text-white">
                                            Key Benefit:
                                            </span>
                                        </div>
                                        <p className="mt-1 text-white/80">
                                            {steps[activeStep].benefit}
                                        </p>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex gap-4 pt-2">
                                        <button
                                            onClick={handlePrevStep}
                                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gray-800/70 text-white border border-gray-700/50 hover:bg-gray-700/70'
                                                    : 'bg-white/20 text-white border border-white/20 hover:bg-white/30'
                                            } backdrop-blur-md`}
                                        >
                                            <FiChevronLeft className="mr-2"/>
                                            Previous
                                        </button>

                                        <button
                                            onClick={handleNextStep}
                                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                            }`}
                                        >
                                            Next
                                            <FiChevronRight className="ml-2"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Step Timeline */}
                            <div className="mt-8 relative">

                                {/* Timeline Track */}
                                <div
                                    className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2"></div>

                                {/* Timeline Progress */}
                                <div
                                    className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 -translate-y-1/2 transition-all duration-500"
                                    style={{width: `${((activeStep + 1) / steps.length) * 100}%`}}
                                ></div>

                                {/* Timeline Steps */}
                                <div className="relative flex justify-between">
                                    {steps.map((step, index) => (
                                        <button
                                            key={`timeline-${step.id}`}
                                            onClick={() => handleStepClick(index)}
                                            className="group relative"
                                        >
                                            {/* Step Marker */}
                                            <div
                                                className={`w-4 h-4 md:w-6 md:h-6 rounded-full transition-all duration-300 ${
                                                    index <= activeStep
                                                        ? darkMode
                                                            ? 'bg-cyan-500'
                                                            : 'bg-blue-500'
                                                        : darkMode
                                                            ? 'bg-gray-700 border border-gray-600'
                                                            : 'bg-white/30 border border-white/20'
                                                } ${index === activeStep ? 'scale-150 shadow-lg shadow-cyan-500/30' : 'scale-100'}`}>

                                                {/* Pulse Effect for Active Step */}
                                                {index === activeStep && (
                                                    <div
                                                        className="absolute inset-0 rounded-full animate-ping-slow bg-cyan-500 opacity-30"></div>
                                                )}
                                            </div>

                                            {/* Step Label - Only visible on larger screens */}
                                            <div
                                                className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                                                    index === activeStep
                                                        ? 'opacity-100 scale-110'
                                                        : 'opacity-70 scale-100'
                                                } ${darkMode ? 'text-white' : 'text-white'} hidden md:block`}>
                                                {step.title}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Experience - Vertical Flow */}
                <div className="md:hidden">
                    <div className={`rounded-2xl overflow-hidden backdrop-blur-md p-6 ${
                        darkMode
                            ? 'bg-gray-800/40 border border-gray-700/50 shadow-xl'
                            : 'bg-white/60 border border-gray-200/50 shadow-xl'
                    }`}>

                        {/* Progress Indicator */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm font-medium">
                                Step {activeStep + 1} of {steps.length}
                            </div>
                            <div className="w-32 h-2 rounded-full overflow-hidden bg-gray-200/20">
                                <div
                                    className={`h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500 ease-out`}
                                    style={{width: `${((activeStep + 1) / steps.length) * 100}%`}}
                                ></div>
                            </div>
                        </div>

                        {/* Step Content */}
                        <div>
                            {steps.map((step, index) => (
                                <div
                                    key={`mobile-${step.id}`}
                                    className={`transition-all duration-500 ${
                                        activeStep === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 absolute'
                                    }`}
                                    style={{display: activeStep === index ? 'block' : 'none'}}
                                >
                                    {/* Step Image */}
                                    <div className="mb-4 rounded-xl overflow-hidden h-40 relative">
                                        <img
                                            src={step.image || "/placeholder.svg"}
                                            alt={step.title}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${
                                            darkMode
                                                ? 'from-gray-900/80 to-transparent'
                                                : 'from-gray-800/50 to-transparent'
                                        }`}></div>
                                    </div>

                                    {/* Icon and Title */}
                                    <div className="flex items-center mb-3">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                                            darkMode
                                                ? 'bg-gray-800/70 border border-gray-700'
                                                : 'bg-white/70 border border-gray-100'
                                        } shadow-lg`}>

                                            {/* Glowing Effect */}
                                            <div
                                                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} opacity-10 blur-md`}></div>

                                            {/* Icon */}
                                            <div
                                                className={`text-transparent bg-clip-text bg-gradient-to-br ${step.color}`}>
                                                {React.cloneElement(step.icon, {size: 24})}
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                Step {step.id}
                                            </div>
                                            <h3 className={`text-xl font-bold ${
                                                darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm mb-3 ${
                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        {step.description}
                                    </p>

                                    {/* Key Benefit */}
                                    <div className={`p-3 rounded-xl mb-4 ${
                                        darkMode
                                            ? 'bg-gray-800/70 border border-gray-700/50'
                                            : 'bg-white/70 border border-gray-200/50'
                                    } backdrop-blur-md`}>
                                        <div className="flex items-center">
                                            {step.highlightEmoji}
                                            <span className={`ml-2 font-medium text-sm ${
                                                darkMode ? 'text-gray-200' : 'text-gray-800'
                                            }`}>
                                                {step.benefit}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between">
                                        <button
                                            onClick={handlePrevStep}
                                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gray-800/70 text-gray-200 border border-gray-700/50'
                                                    : 'bg-white/70 text-gray-700 border border-gray-200/50'
                                            }`}
                                        >
                                            Previous
                                        </button>

                                        <button
                                            onClick={handleNextStep}
                                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                            }`}
                                        >
                                            {index < steps.length - 1 ? 'Next' : 'Start Over'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Step Selector Dots */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {steps.map((_, index) => (
                                <button
                                    key={`dot-${index}`}
                                    onClick={() => handleStepClick(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        activeStep === index
                                            ? darkMode
                                                ? 'bg-cyan-500 scale-125'
                                                : 'bg-indigo-600 scale-125'
                                            : darkMode
                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to step ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className={`mt-12 p-6 md:p-8 rounded-2xl text-center max-w-3xl mx-auto relative overflow-hidden ${
                    darkMode
                        ? 'bg-gray-800/40 border border-purple-900/30 backdrop-blur-md'
                        : 'bg-white/60 border border-indigo-200/30 backdrop-blur-md shadow-xl'
                }`}>

                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 opacity-10">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                            alt="Technology background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div
                        className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -z-10"></div>
                    <div
                        className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl -z-10"></div>

                    <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Ready to Experience the Future of Gadget Rentals?
                    </h3>
                    <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Join thousands of tech enthusiasts who are already enjoying premium gadgets without the
                        long-term commitment.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/browse"
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                                darkMode
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-900/20'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-600/20'
                            }`}
                        >
                            Explore Gadgets
                        </a>
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

                @keyframes ping-slow {
                    0% {
                        transform: scale(1);
                        opacity: 0.8;
                    }
                    70% {
                        transform: scale(2);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }

                @keyframes hologram-scan {
                    0% {
                        box-shadow: 0 0 0 rgba(0, 255, 255, 0.4);
                        transform: translateY(-100%);
                    }
                    100% {
                        box-shadow: 0 0 10px rgba(0, 255, 255, 0.1);
                        transform: translateY(100%);
                    }
                }

                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }

                .holographic-grid {
                    background-image: linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }

                .holographic-frame {
                    border: 2px solid rgba(0, 255, 255, 0.3);
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                    inset 0 0 15px rgba(0, 255, 255, 0.5);
                }

                .hologram-effect {
                    position: relative;
                }

                .hologram-effect::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(0, 255, 255, 0.2), transparent 40%);
                    z-index: 1;
                }

                .hologram-scan {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(to right, transparent, rgba(0, 255, 255, 0.8), transparent);
                    animation: hologram-scan 2s linear infinite;
                }

                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default HowItWorksComponent;
