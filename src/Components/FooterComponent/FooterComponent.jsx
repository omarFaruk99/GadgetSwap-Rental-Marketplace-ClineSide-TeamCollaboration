import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FiSend, FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiArrowUp} from 'react-icons/fi';
import {IoLogoYoutube} from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const FooterComponent = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();


    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // In a real app, you would send this to your API
            console.log('Subscribed with email:', email);
            setIsSubscribed(true);
            setEmail('');

            // Reset the subscription message after 3 seconds
            setTimeout(() => {
                setIsSubscribed(false);
            }, 3000);
        }
    };


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    /*const footerLinks = [
        {
            title: 'Company',
            links: [
                {name: 'About Us', path: '/about'},
                {name: 'Careers', path: '/careers'},
                {name: 'Blog', path: '/blog'},
                {name: 'Press', path: '/press'}
            ]
        },
        {
            title: 'Support',
            links: [
                {name: 'Help Center', path: '/help'},
                {name: 'Safety Center', path: '/safety'},
                {name: 'Community Guidelines', path: '/guidelines'},
                {name: 'Contact Us', path: '/contact'}
            ]
        },
        {
            title: 'Legal',
            links: [
                {name: 'Terms of Service', path: '/terms'},
                {name: 'Privacy Policy', path: '/privacy'},
                {name: 'Cookie Policy', path: '/cookies'},
                {name: 'Accessibility', path: '/accessibility'}
            ]
        }
    ];*/


    const socialLinks = [
        {icon: <FiTwitter size={20}/>, path: 'https://twitter.com', label: 'Twitter'},
        {icon: <FiInstagram size={20}/>, path: 'https://instagram.com', label: 'Instagram'},
        {icon: <FiLinkedin size={20}/>, path: 'https://linkedin.com', label: 'LinkedIn'},
        {icon: <FiGithub size={20}/>, path: 'https://github.com', label: 'GitHub'},
        {icon: <IoLogoYoutube size={20}/>, path: 'https://youtube.com', label: 'YouTube'}
    ];


    return (
        <footer className={`w-full border-t backdrop-blur-md transition-all duration-300 ${
            darkMode
                ? 'bg-gray-900/90 border-purple-900/30 text-white'
                : 'bg-white/80 border-indigo-200/30 text-gray-800'
        }`}>
            <div className="container mx-auto px-4 py-12">
                {/* Top Section with Logo and Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <Link
                            to="/"
                            onClick={scrollToTop}
                            className="inline-block group"
                        >
                            <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                                darkMode
                                    ? 'from-purple-400 to-cyan-400'
                                    : 'from-indigo-600 to-purple-600'
                            } transition-all duration-300 transform group-hover:scale-105`}>
                            GadgetSwap
                            </span>
                        </Link>
                        <p className={`max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Rent and lend gadgets affordably. GadgetSwap ensures accessibility,
                            affordability, and gadget sharing while providing a secure and
                            seamless experience for users.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                        darkMode
                                            ? 'bg-gray-800/70 text-purple-400 hover:bg-purple-900/40 hover:text-purple-300'
                                            : 'bg-indigo-100/60 text-indigo-600 hover:bg-indigo-200/70 hover:text-indigo-700'
                                    }`}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className={`p-6 rounded-xl backdrop-blur-md ${
                        darkMode
                            ? 'bg-gray-800/50 border border-purple-900/30'
                            : 'bg-white/60 border border-indigo-200/50'
                    } transition-all duration-300 hover:shadow-lg`}>
                        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Subscribe to our Newsletter
                        </h3>
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Stay updated with the latest gadgets and special offers.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-700/70 text-white border border-purple-800/30 focus:border-purple-500/50'
                                            : 'bg-white text-gray-900 border border-indigo-200/50 focus:border-indigo-400'
                                    }`}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                                    darkMode
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                                }`}
                            >
                                Subscribe <FiSend className="ml-2"/>
                            </button>

                            {isSubscribed && (
                                <p className={`text-center animate-pulse ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                    Thanks for subscribing!
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Links Section */}
                {/*<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 py-8 border-t border-b mb-8
                ${darkMode ? 'border-purple-900/30' : 'border-indigo-200/30'}">
                    {footerLinks.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.path}
                                            className={`text-sm transition-all duration-200 hover:translate-x-1 inline-block ${
                                                darkMode
                                                    ? 'text-gray-300 hover:text-purple-400'
                                                    : 'text-gray-600 hover:text-indigo-600'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>*/}

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        &copy; {new Date().getFullYear()} GadgetSwap. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className={`mt-4 md:mt-0 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                            darkMode
                                ? 'bg-gray-800/70 text-purple-400 hover:bg-purple-900/40 hover:text-purple-300'
                                : 'bg-indigo-100/60 text-indigo-600 hover:bg-indigo-200/70 hover:text-indigo-700'
                        }`}
                        aria-label="Scroll to top"
                    >
                        <FiArrowUp size={20} className="animate-bounce"/>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
