import React, {useState} from 'react';
import {FiMenu, FiX, FiMoon, FiSun, FiUser} from 'react-icons/fi';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useTheme from "../../CustomHooks/useTheme.jsx";


const NavbarComponent = () => {

    // const [darkMode, setDarkMode] = useState(false);
    const {darkMode, toggleDarkMode} = useTheme();


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    // Sample user data - in a real app, this would come from auth context or props
    const user = {
        isLoggedIn: false,
        name: "John Doe",
        email: "john@example.com",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const handleSignOutClick = () => {
        console.log('user signed out');
        // In a real app, you would call your auth service logout method here
    };


    // Function to handle scrolling to top of the page
    const scrollToTop = (e) => {
        e.preventDefault();

        // If we're already on the homepage
        if (location.pathname === '/') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        } else {
            // If we're on a different page, navigate to homepage first
            navigate('/');
            // Scroll to top after navigation
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };


    // Function to handle smooth scrolling to "how-it-works" section
    const scrollToHowItWorks = (e) => {
        e.preventDefault();

        // If we're already on the homepage
        if (location.pathname === '/') {
            const howItWorksSection = document.getElementById('how-it-works');
            if (howItWorksSection) {
                howItWorksSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        } else {
            // If we're on a different page, navigate to homepage first, then scroll
            navigate('/');
            // We need to wait for the navigation to complete before scrolling
            setTimeout(() => {
                const howItWorksSection = document.getElementById('how-it-works');
                if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    };


    const navButtons = [
        {name: 'Home', path: '/', isScroll: true, scrollToTop: true},
        {name: 'How It Works', path: '#how-it-works', hideWhenLoggedIn: false, isScroll: true},
        {name: 'Gadgets', path: '/all-gadgets', hideWhenLoggedIn: false},
        {name: 'About Us', path: '/about-us', hideWhenLoggedIn: false},
        {name: 'Contact Us', path: '/contact-us', hideWhenLoggedIn: false},
        {name: 'FAQ', path: '/faq', hideWhenLoggedIn: false},
        {name: 'Sign Up', path: '/sign-up', hideWhenLoggedIn: true},
        {name: 'Sign In', path: '/sign-in', hideWhenLoggedIn: true},
    ];


    return (
        <nav className={`w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
            darkMode
                ? 'bg-gray-900/90 border-purple-900/30 text-white'
                : 'bg-white/80 border-indigo-200/30 text-gray-800'
        }`}>
            <div className="container mx-auto py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href="/" onClick={scrollToTop} className="flex items-center group">
                        <span className={`text-4xl px-2 py-1 font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                            darkMode
                                ? 'from-purple-400 to-cyan-400'
                                : 'from-indigo-600 to-purple-600'
                        } transition-all duration-300 transform group-hover:scale-105`}>
                          GadgetSwap
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Navigation Buttons */}
                        <div className="flex space-x-4">
                            {navButtons.map((button) => (
                                (!button.hideWhenLoggedIn || !user.isLoggedIn) && (
                                    button.isScroll ? (
                                        <a
                                            key={button.name}
                                            href={button.path}
                                            onClick={button.scrollToTop ? scrollToTop : scrollToHowItWorks}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                                darkMode
                                                    ? 'text-gray-300 hover:bg-purple-900/40 hover:text-white'
                                                    : 'text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-800'
                                            }`}
                                        >
                                            {button.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={button.name}
                                            to={button.path}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                                darkMode
                                                    ? 'text-gray-300 hover:bg-purple-900/40 hover:text-white'
                                                    : 'text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-800'
                                            }`}
                                        >
                                            {button.name}
                                        </Link>
                                    )
                                )
                            ))}

                            {user.isLoggedIn && (
                                <button
                                    onClick={handleSignOutClick}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                        darkMode
                                            ? 'text-gray-300 hover:bg-purple-900/40 hover:text-white'
                                            : 'text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-800'
                                    }`}
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                darkMode
                                    ? 'bg-purple-900/50 text-yellow-300 hover:bg-purple-800/60'
                                    : 'bg-indigo-100/60 text-indigo-600 hover:bg-indigo-200/70'
                            }`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FiSun size={18} className="animate-pulse"/> : <FiMoon size={18}/>}
                        </button>

                        {/* User Profile */}
                        {user.isLoggedIn && (
                            <div className={`flex items-center space-x-3 px-4 py-2 rounded-md ${
                                darkMode
                                    ? 'bg-gray-800/50 border border-purple-800/30'
                                    : 'bg-white/70 border border-indigo-200/50'
                            } backdrop-blur-sm transition-all duration-300 hover:shadow-md`}>
                                <div className="hidden md:flex flex-col items-end">
                                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {user.name}
                                    </span>
                                    <span className={`text-xs ${darkMode ? 'text-purple-300' : 'text-indigo-600'}`}>
                                        {user.email}
                                    </span>
                                </div>
                                <div
                                    className={`h-8 w-8 rounded-full overflow-hidden ring-2 ring-offset-2 transition-all duration-300 transform hover:scale-110 ${
                                        darkMode ? 'ring-purple-500' : 'ring-indigo-400'
                                    }`}>
                                    <img
                                        src={user.profilePicture || "/placeholder.svg"}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-3">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                darkMode
                                    ? 'bg-purple-900/50 text-yellow-300 hover:bg-purple-800/60'
                                    : 'bg-indigo-100/60 text-indigo-600 hover:bg-indigo-200/70'
                            }`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FiSun size={18} className="animate-pulse"/> : <FiMoon size={18}/>}
                        </button>

                        <button
                            onClick={toggleMenu}
                            className={`p-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                                darkMode
                                    ? 'text-white hover:bg-purple-900/40'
                                    : 'text-gray-700 hover:bg-indigo-100/60'
                            }`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={`lg:hidden mt-3 py-3 px-2 rounded-lg transition-all duration-300 ${
                        darkMode
                            ? 'bg-gray-800/90 backdrop-blur-md border border-purple-900/30'
                            : 'bg-white/90 backdrop-blur-md border border-indigo-200/30'
                    }`}>
                        <div className="flex flex-col space-y-2">
                            {navButtons.map((button) => (
                                (!button.hideWhenLoggedIn || !user.isLoggedIn) && (
                                    button.isScroll ? (
                                        <a
                                            key={button.name}
                                            href={button.path}
                                            onClick={button.scrollToTop ? scrollToTop : scrollToHowItWorks}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                darkMode
                                                    ? 'text-gray-300 hover:bg-purple-900/40 hover:text-white'
                                                    : 'text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-800'
                                            }`}
                                        >
                                            {button.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={button.name}
                                            to={button.path}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                darkMode
                                                    ? 'text-gray-300 hover:bg-purple-900/40 hover:text-white'
                                                    : 'text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-800'
                                            }`}
                                            onClick={toggleMenu}
                                        >
                                            {button.name}
                                        </Link>
                                    )
                                )
                            ))}

                            {user.isLoggedIn && (
                                <>
                                    <button
                                        onClick={() => {
                                            handleSignOutClick();
                                            toggleMenu();
                                        }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                                            darkMode
                                                ? 'text-gray-300 hover:bg-purple-900/40 hover:text-white'
                                                : 'text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-800'
                                        }`}
                                    >
                                        Sign Out
                                    </button>

                                    <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                                        darkMode
                                            ? 'bg-gray-800/70 border border-purple-900/30'
                                            : 'bg-white/80 border border-indigo-200/50'
                                    }`}>
                                        <div
                                            className={`h-8 w-8 rounded-full overflow-hidden ring-2 ring-offset-2 transition-all duration-300 transform hover:scale-105 ${
                                                darkMode ? 'ring-purple-500' : 'ring-indigo-400'
                                            }`}>
                                            <img
                                                src={user.profilePicture || "/placeholder.svg"}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {user.name}
                                            </span>
                                            <span
                                                className={`text-xs ${darkMode ? 'text-purple-300' : 'text-indigo-600'}`}>
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavbarComponent;
