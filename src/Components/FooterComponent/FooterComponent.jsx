import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiArrowUp, FiInfo, FiHelpCircle, FiMessageSquare, FiFileText, FiSettings, FiShield, FiBookmark, FiChevronRight } from 'react-icons/fi';
import { IoLogoYoutube } from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const FooterComponent = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const { darkMode } = useTheme();


    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    // Check scroll position to show/hide scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // In a real app, you would send this to your API
            console.log("Subscribed with email:", email);
            setIsSubscribed(true);
            setEmail("");

            // Reset the subscription message after 3 seconds
            setTimeout(() => {
                setIsSubscribed(false);
            }, 3000);
        }
    };


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const footerLinks = [
        {
            id: "company",
            title: "Company",
            links: [
                { name: "About Us", path: "/about-us", icon: <FiInfo size={16} /> },
                { name: "Frequently Asked Questions", path: "/faq", icon: <FiHelpCircle size={16} /> },
                { name: "Contact Us", path: "/contact-us", icon: <FiMessageSquare size={16} /> }
            ]
        },
        {
            id: "legal",
            title: "Legal",
            links: [
                { name: "Terms and Conditions", path: "/terms-and-conditions", icon: <FiFileText size={16} /> },
                { name: "Cookie Settings", path: "/cookie-settings", icon: <FiSettings size={16} /> },
                { name: "Privacy Policy", path: "/privacy-policy", icon: <FiShield size={16} /> },
                { name: "Imprint", path: "/imprint", icon: <FiBookmark size={16} /> }
            ]
        }
    ];

    // const socialLinks = [
    //     { icon: <FiTwitter size={20} />, path: 'https://twitter.com', label: 'Twitter' },
    //     { icon: <FiInstagram size={20} />, path: 'https://instagram.com', label: 'Instagram' },
    //     { icon: <FiLinkedin size={20} />, path: 'https://linkedin.com', label: 'LinkedIn' },
    //     { icon: <FiGithub size={20} />, path: 'https://github.com', label: 'GitHub' },
    //     { icon: <IoLogoYoutube size={20} />, path: 'https://youtube.com', label: 'YouTube' }
    // ];

    return (
        <footer
            className={`w-full transition-all duration-300 relative overflow-hidden ${darkMode
                ? "bg-gray-900 text-white"
                : "bg-gradient-to-b from-white to-gray-50 text-gray-800"
                }`}
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10 ${darkMode ? "bg-purple-600" : "bg-indigo-600"
                        }`}
                ></div>
                <div
                    className={`absolute top-1/2 -left-24 w-64 h-64 rounded-full opacity-10 ${darkMode ? "bg-blue-600" : "bg-blue-400"
                        }`}
                ></div>
                <div
                    className={`absolute -bottom-32 right-1/4 w-80 h-80 rounded-full opacity-10 ${darkMode ? "bg-cyan-600" : "bg-cyan-400"
                        }`}
                ></div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 pt-20 pb-5 relative z-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-5">
                    {/* Logo and Info Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" onClick={scrollToTop} className="inline-block group">
                            <span
                                className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${darkMode
                                    ? "from-purple-400 to-cyan-400"
                                    : "from-indigo-600 to-purple-600"
                                    } transition-all duration-300 transform group-hover:scale-105`}
                            >
                                GadgetSwap
                            </span>
                        </Link>

                        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} max-w-md`}>
                            Rent and lend gadgets affordably. GadgetSwap ensures accessibility,
                            affordability, and gadget sharing while providing a secure and
                            seamless experience for users.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {footerLinks.map((section) => (
                                <div key={section.id} className="space-y-4">
                                    {/* Mobile Accordion Header */}
                                    <div
                                        className="flex justify-between items-center lg:hidden cursor-pointer"
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                            {section.title}
                                        </h3>
                                        <FiChevronRight
                                            className={`transition-transform duration-300 ${activeSection === section.id ? "rotate-90" : ""
                                                }`}
                                        />
                                    </div>

                                    {/* Desktop Header */}
                                    <h3 className={`text-lg font-bold hidden lg:block ${darkMode ? "text-white" : "text-gray-900"}`}>
                                        {section.title}
                                    </h3>

                                    {/* Links */}
                                    <ul
                                        className={`space-y-3 ${activeSection === section.id || window.innerWidth >= 1024 ? "block" : "hidden lg:block"
                                            }`}
                                    >
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link
                                                    to={link.path}
                                                    className={`group flex items-center text-sm transition-all duration-200 ${darkMode
                                                        ? "text-gray-300 hover:text-purple-400"
                                                        : "text-gray-600 hover:text-indigo-600"
                                                        }`}
                                                >
                                                    <span className={`mr-2 transition-colors ${darkMode ? "text-purple-500 group-hover:text-purple-400" : "text-indigo-500 group-hover:text-indigo-600"
                                                        }`}>
                                                        {link.icon}
                                                    </span>
                                                    <span className="group-hover:translate-x-1 transition-transform">
                                                        {link.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className={`p-6 rounded-xl backdrop-blur-md ${darkMode
                            ? "bg-gray-800/50 border border-gray-700"
                            : "bg-white border border-gray-100 shadow-md"
                            }`}>
                            <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                Stay Updated
                            </h3>
                            <p className={`mb-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Subscribe to our newsletter for the latest gadgets, special offers, and tech news.
                            </p>

                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Enter your email"
                                        className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300 ${darkMode
                                            ? "bg-gray-700 text-white border border-gray-600 focus:border-purple-500"
                                            : "bg-gray-50 text-gray-900 border border-gray-200 focus:border-indigo-400"
                                            }`}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${darkMode
                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                        }`}
                                >
                                    Subscribe <FiSend className="ml-2" />
                                </button>

                                {isSubscribed && (
                                    <p className={`text-center animate-pulse ${darkMode ? "text-green-400" : "text-green-600"}`}>
                                        Thanks for subscribing!
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className={`h-px w-full ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>

                {/* Bottom Section */}
                <div className="pt-5 flex flex-col md:flex-row justify-between items-center">
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        &copy; {new Date().getFullYear()} GadgetSwap. All rights reserved.
                    </p>

                    {showScrollButton && (
                        <button
                            onClick={scrollToTop}
                            className={`mt-4 md:mt-0 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${darkMode
                                ? "bg-gray-800 text-purple-400 hover:bg-gray-700"
                                : "bg-white text-indigo-600 hover:bg-gray-100 shadow-sm"
                                }`}
                            aria-label="Scroll to top"
                        >
                            <FiArrowUp size={20} className="animate-bounce" />
                        </button>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
