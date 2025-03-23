import React, { useState, useEffect, useRef } from 'react';
import {
    FiMapPin,
    FiPhone,
    FiMail,
    FiClock,
    FiMessageSquare,
    FiSend,
    FiUser,
    FiAlertCircle,
    FiCheckCircle,
    FiGlobe,
    FiMessageCircle,
    FiChevronDown,
    FiMenu,
    FiX,
    FiArrowRight,
    FiInfo,
    FiMinimize2,
    FiMaximize2, FiTruck, FiChevronRight
} from 'react-icons/fi';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin
} from 'react-icons/fa';
import useTheme from "../../CustomHooks/useTheme.jsx";


const ContactUsComponent = () => {

    // const [darkMode, setDarkMode] = useState(false);
    const {darkMode} = useTheme();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('message');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    // Live Chat States
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            sender: 'system',
            text: 'Welcome to GadgetSwap support! How can we help you today?',
            timestamp: new Date()
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const chatEndRef = useRef(null);


    // Auto-scroll to bottom of chat when new messages are added
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);


    // Contact information data
    const contactInfo = {
        address: {
            street: '123 Tech Avenue',
            city: 'San Francisco',
            state: 'CA',
            zip: '94107',
            country: 'United States'
        },
        phone: {
            main: '+1 (800) 123-4567',
            support: '+1 (800) 987-6543'
        },
        email: {
            info: 'info@gadgetswap.com',
            support: 'support@gadgetswap.com'
        },
        hours: [
            { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
            { days: 'Saturday', hours: '10:00 AM - 4:00 PM PST' },
            { days: 'Sunday', hours: 'Closed' }
        ],
        social: [
            { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com/gadgetswap' },
            { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/gadgetswap' },
            { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com/gadgetswap' },
            { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com/company/gadgetswap' }
        ]
    };


    // FAQ data for quick answers
    const faqData = [
        {
            question: 'How do I return a rented gadget?',
            answer: 'Returning is easy! Each rental comes with a prepaid return shipping label. Simply pack the gadget in its original packaging, attach the provided return label, and drop it off at any authorized shipping location.'
        },
        {
            question: 'What happens if I damage a rented gadget?',
            answer: 'All rentals come with basic protection against manufacturing defects. For accidental damage, you may be responsible for repair or replacement costs. We offer optional insurance plans at checkout that cover accidental damage.'
        },
        {
            question: 'Can I extend my rental period?',
            answer: 'Yes, you can extend your rental period through your account dashboard. Go to "My Rentals" and select the item you wish to extend. Choose your new return date and pay for the additional rental period.'
        },
        {
            question: 'How does the loyalty program work?',
            answer: 'Our loyalty program rewards you for every rental. You earn 10 points for every $1 spent on rentals. Additional points can be earned by writing reviews, referring friends, and maintaining a rental streak.'
        }
    ];


    // Automated responses for the chat
    const automatedResponses = [
        "Thanks for your message! Our team is looking into this for you.",
        "I understand your concern. Let me check our system for more information.",
        "That's a great question! The answer is that our rental periods are flexible, starting from 3 days up to 6 months.",
        "I'd be happy to help you with that. Could you provide more details about your rental?",
        "We offer insurance options for all our rentals. The basic plan covers manufacturing defects, while premium plans cover accidental damage.",
        "You can extend your rental through your account dashboard or by contacting our support team.",
        "Our loyalty program gives you 10 points for every dollar spent. You can redeem these points for discounts and free rentals."
    ];


    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };


    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            // Simulate API call
            setTimeout(() => {
                console.log('Form Data:', formData);
                setIsSubmitting(false);
                setSubmitSuccess(true);

                // Reset form after 3 seconds
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    });
                    setSubmitSuccess(false);
                }, 3000);
            }, 1500);
        }
    };


    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
    };


    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    // Toggle chat window
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        setIsMinimized(false);
    };


    // Toggle minimize/maximize chat
    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };


    // Close chat
    const closeChat = () => {
        setIsChatOpen(false);
    };


    // Handle chat input change
    const handleChatInputChange = (e) => {
        setCurrentMessage(e.target.value);
    };


    // Get random automated response
    const getRandomResponse = () => {
        const randomIndex = Math.floor(Math.random() * automatedResponses.length);
        return automatedResponses[randomIndex];
    };


    // Send chat message
    const sendChatMessage = (e) => {
        e.preventDefault();

        if (currentMessage.trim() === '') return;

        // Add user message
        const userMessage = {
            id: chatMessages.length + 1,
            sender: 'user',
            text: currentMessage,
            timestamp: new Date()
        };

        setChatMessages([...chatMessages, userMessage]);
        console.log('User Message:', currentMessage);
        setCurrentMessage('');

        // Simulate response after a delay
        setTimeout(() => {
            const systemResponse = {
                id: chatMessages.length + 2,
                sender: 'system',
                text: getRandomResponse(),
                timestamp: new Date()
            };

            setChatMessages(prev => [...prev, systemResponse]);
        }, 1000);
    };


    // Format timestamp for chat
    const formatChatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);


    return (
        <div className={`min-h-[calc(100vh-421px)] w-full py-16 pt-32 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                        darkMode
                            ? 'bg-gray-800/70 text-blue-400 border border-gray-700/50'
                            : 'bg-white/80 text-blue-600 border border-blue-100/50 shadow-sm'
                    } backdrop-blur-md`}>
                        <FiMessageCircle className="mr-2" />
                        <span>Get in Touch</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Contact Us
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Have questions or need assistance? We're here to help you with anything related to GadgetSwap.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Contact Information */}
                        <div className="lg:w-1/3">
                            <div className={`rounded-xl overflow-hidden h-full ${
                                darkMode
                                    ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                    : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                            }`}>
                                <div className={`p-6 ${
                                    darkMode
                                        ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-b border-gray-700/50'
                                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200/50'
                                }`}>
                                    <h3 className={`text-xl font-semibold mb-2 ${
                                        darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        Contact Information
                                    </h3>
                                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                        Reach out to us through any of these channels
                                    </p>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Address */}
                                    <div className="flex">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                            darkMode
                                                ? 'bg-gray-700 text-blue-400'
                                                : 'bg-blue-50 text-blue-600'
                                        }`}>
                                            <FiMapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                                Our Office
                                            </h4>
                                            <address className={`not-italic ${
                                                darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {contactInfo.address.street}<br />
                                                {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}<br />
                                                {contactInfo.address.country}
                                            </address>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                            darkMode
                                                ? 'bg-gray-700 text-green-400'
                                                : 'bg-green-50 text-green-600'
                                        }`}>
                                            <FiPhone size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                                Phone
                                            </h4>
                                            <p className={`mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                <a href={`tel:${contactInfo.phone.main.replace(/\D/g, '')}`} className="hover:underline">
                                                    {contactInfo.phone.main} (Main)
                                                </a>
                                            </p>
                                            <p className={darkMode ? 'text-white' : 'text-gray-900'}>
                                                <a href={`tel:${contactInfo.phone.support.replace(/\D/g, '')}`} className="hover:underline">
                                                    {contactInfo.phone.support} (Support)
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                            darkMode
                                                ? 'bg-gray-700 text-purple-400'
                                                : 'bg-purple-50 text-purple-600'
                                        }`}>
                                            <FiMail size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                                Email
                                            </h4>
                                            <p className={`mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                <a href={`mailto:${contactInfo.email.info}`} className="hover:underline">
                                                    {contactInfo.email.info} (General)
                                                </a>
                                            </p>
                                            <p className={darkMode ? 'text-white' : 'text-gray-900'}>
                                                <a href={`mailto:${contactInfo.email.support}`} className="hover:underline">
                                                    {contactInfo.email.support} (Support)
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                            darkMode
                                                ? 'bg-gray-700 text-amber-400'
                                                : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            <FiClock size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                                Business Hours
                                            </h4>
                                            {contactInfo.hours.map((item, index) => (
                                                <div key={index} className="mb-1 last:mb-0">
                                                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {item.days}
                                                    </p>
                                                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                                        {item.hours}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="pt-4 border-t border-gray-700/50">
                                        <h4 className={`text-sm font-medium mb-3 ${
                                            darkMode ? 'text-gray-300' : 'text-gray-500'
                                        }`}>
                                            Connect With Us
                                        </h4>
                                        <div className="flex space-x-3">
                                            {contactInfo.social.map((item, index) => (
                                                <a
                                                    key={index}
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                                        darkMode
                                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                                    }`}
                                                    aria-label={item.name}
                                                >
                                                    {item.icon}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form and Map */}
                        <div className="lg:w-2/3">
                            {/* Navigation Tabs - Desktop */}
                            <div className="hidden lg:flex mb-6">
                                <div className={`inline-flex rounded-lg p-1 ${
                                    darkMode ? 'bg-gray-800/70 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-sm'
                                }`}>
                                    <button
                                        onClick={() => handleTabChange('message')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                            activeTab === 'message'
                                                ? darkMode
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-blue-100 text-blue-700'
                                                : darkMode
                                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                                        }`}
                                    >
                                        <span className="flex items-center">
                                            <FiMessageSquare className="mr-2" />
                                            Send Message
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleTabChange('map')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                            activeTab === 'map'
                                                ? darkMode
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-blue-100 text-blue-700'
                                                : darkMode
                                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                                        }`}
                                    >
                                        <span className="flex items-center">
                                            <FiMapPin className="mr-2" />
                                            Find Us
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleTabChange('faq')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                            activeTab === 'faq'
                                                ? darkMode
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-blue-100 text-blue-700'
                                                : darkMode
                                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                                        }`}
                                    >
                                        <span className="flex items-center">
                                            <FiInfo className="mr-2" />
                                            Quick Answers
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Tabs - Mobile */}
                            <div className="lg:hidden mb-6">
                                <button
                                    onClick={toggleMobileMenu}
                                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                                        darkMode ? 'bg-gray-800/70 text-white' : 'bg-white/90 text-gray-900 shadow-sm'
                                    }`}
                                >
                                    <span className="flex items-center">
                                        {activeTab === 'message' && <FiMessageSquare className="mr-2" />}
                                        {activeTab === 'map' && <FiMapPin className="mr-2" />}
                                        {activeTab === 'faq' && <FiInfo className="mr-2" />}

                                        {activeTab === 'message' && 'Send Message'}
                                        {activeTab === 'map' && 'Find Us'}
                                        {activeTab === 'faq' && 'Quick Answers'}
                                    </span>
                                    {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                                </button>

                                {isMobileMenuOpen && (
                                    <div className={`mt-2 rounded-xl overflow-hidden shadow-xl ${
                                        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                                    }`}>
                                        <button
                                            onClick={() => handleTabChange('message')}
                                            className={`flex items-center w-full px-4 py-3 text-left ${
                                                activeTab === 'message'
                                                    ? darkMode
                                                        ? 'bg-gray-700 text-white'
                                                        : 'bg-blue-50 text-blue-700'
                                                    : darkMode
                                                        ? 'text-gray-300 hover:bg-gray-700/50'
                                                        : 'text-gray-700 hover:bg-blue-50'
                                            }`}
                                        >
                                            <FiMessageSquare className="mr-2" />
                                            Send Message
                                        </button>

                                        <button
                                            onClick={() => handleTabChange('map')}
                                            className={`flex items-center w-full px-4 py-3 text-left ${
                                                activeTab === 'map'
                                                    ? darkMode
                                                        ? 'bg-gray-700 text-white'
                                                        : 'bg-blue-50 text-blue-700'
                                                    : darkMode
                                                        ? 'text-gray-300 hover:bg-gray-700/50'
                                                        : 'text-gray-700 hover:bg-blue-50'
                                            }`}
                                        >
                                            <FiMapPin className="mr-2" />
                                            Find Us
                                        </button>

                                        <button
                                            onClick={() => handleTabChange('faq')}
                                            className={`flex items-center w-full px-4 py-3 text-left ${
                                                activeTab === 'faq'
                                                    ? darkMode
                                                        ? 'bg-gray-700 text-white'
                                                        : 'bg-blue-50 text-blue-700'
                                                    : darkMode
                                                        ? 'text-gray-300 hover:bg-gray-700/50'
                                                        : 'text-gray-700 hover:bg-blue-50'
                                            }`}
                                        >
                                            <FiInfo className="mr-2" />
                                            Quick Answers
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Message Form */}
                            {activeTab === 'message' && (
                                <div className={`rounded-xl overflow-hidden ${
                                    darkMode
                                        ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                        : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                                }`}>
                                    <div className="p-6">
                                        <h3 className={`text-xl font-semibold mb-4 ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            Send Us a Message
                                        </h3>

                                        {submitSuccess ? (
                                            <div className={`rounded-lg p-4 mb-6 flex items-start ${
                                                darkMode
                                                    ? 'bg-green-900/20 border border-green-800/30 text-green-400'
                                                    : 'bg-green-50 border border-green-100 text-green-800'
                                            }`}>
                                                <FiCheckCircle className="mt-0.5 mr-3 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Message sent successfully!</p>
                                                    <p className={darkMode ? 'text-green-500' : 'text-green-700'}>
                                                        Thank you for contacting us. We'll get back to you as soon as possible.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                    {/* Name Field */}
                                                    <div>
                                                        <label
                                                            htmlFor="name"
                                                            className={`block text-sm font-medium mb-1 ${
                                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            Your Name
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                                className={`w-full px-4 py-2 rounded-lg ${
                                                                    darkMode
                                                                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
                                                                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                                                } focus:outline-none focus:ring-2 ${
                                                                    errors.name
                                                                        ? darkMode ? 'border-red-500 focus:ring-red-500' : 'border-red-500 focus:ring-red-500'
                                                                        : darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'
                                                                }`}
                                                                placeholder="John Doe"
                                                            />
                                                            {errors.name && (
                                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                    <FiAlertCircle className="text-red-500" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {errors.name && (
                                                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                                        )}
                                                    </div>

                                                    {/* Email Field */}
                                                    <div>
                                                        <label
                                                            htmlFor="email"
                                                            className={`block text-sm font-medium mb-1 ${
                                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            Your Email
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                className={`w-full px-4 py-2 rounded-lg ${
                                                                    darkMode
                                                                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
                                                                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                                                } focus:outline-none focus:ring-2 ${
                                                                    errors.email
                                                                        ? darkMode ? 'border-red-500 focus:ring-red-500' : 'border-red-500 focus:ring-red-500'
                                                                        : darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'
                                                                }`}
                                                                placeholder="john@example.com"
                                                            />
                                                            {errors.email && (
                                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                    <FiAlertCircle className="text-red-500" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {errors.email && (
                                                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Subject Field */}
                                                <div className="mb-6">
                                                    <label
                                                        htmlFor="subject"
                                                        className={`block text-sm font-medium mb-1 ${
                                                            darkMode ? 'text-gray-300' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        Subject
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="subject"
                                                            name="subject"
                                                            value={formData.subject}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2 rounded-lg ${
                                                                darkMode
                                                                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
                                                                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                                            } focus:outline-none focus:ring-2 ${
                                                                errors.subject
                                                                    ? darkMode ? 'border-red-500 focus:ring-red-500' : 'border-red-500 focus:ring-red-500'
                                                                    : darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'
                                                            }`}
                                                            placeholder="How can we help you?"
                                                        />
                                                        {errors.subject && (
                                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                <FiAlertCircle className="text-red-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {errors.subject && (
                                                        <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                                                    )}
                                                </div>

                                                {/* Message Field */}
                                                <div className="mb-6">
                                                    <label
                                                        htmlFor="message"
                                                        className={`block text-sm font-medium mb-1 ${
                                                            darkMode ? 'text-gray-300' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        Message
                                                    </label>
                                                    <div className="relative">
                                                        <textarea
                                                            id="message"
                                                            name="message"
                                                            rows="5"
                                                            value={formData.message}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2 rounded-lg ${
                                                                darkMode
                                                                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
                                                                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                                            } focus:outline-none focus:ring-2 ${
                                                                errors.message
                                                                    ? darkMode ? 'border-red-500 focus:ring-red-500' : 'border-red-500 focus:ring-red-500'
                                                                    : darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'
                                                            }`}
                                                            placeholder="Please provide details about your inquiry..."
                                                        />
                                                        {errors.message && (
                                                            <div
                                                                className="absolute bottom-3 right-3 flex items-center pr-3 pointer-events-none">
                                                                <FiAlertCircle className="text-red-500"/>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {errors.message && (
                                                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${
                                                        darkMode
                                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiSend className="mr-2" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        )}

                                        {/* Live Chat Option */}
                                        <div className={`mt-6 p-4 rounded-lg ${
                                            darkMode
                                                ? 'bg-gray-700/50 border border-gray-600/50'
                                                : 'bg-gray-50 border border-gray-200/50'
                                        }`}>
                                            <div className="flex items-start">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                                    darkMode
                                                        ? 'bg-blue-900/30 text-blue-400'
                                                        : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                    <FiMessageCircle size={20} />
                                                </div>
                                                <div>
                                                    <h4 className={`font-medium mb-1 ${
                                                        darkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        Need immediate assistance?
                                                    </h4>
                                                    <p className={`text-sm mb-3 ${
                                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>
                                                        Our support team is available for live chat during business hours.
                                                    </p>
                                                    <button
                                                        onClick={toggleChat}
                                                        className={`inline-flex items-center text-sm font-medium ${
                                                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                                                        }`}
                                                    >
                                                        <span>Start Live Chat</span>
                                                        <FiArrowRight className="ml-1" size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Map */}
                            {activeTab === 'map' && (
                                <div className={`rounded-xl overflow-hidden ${
                                    darkMode
                                        ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                        : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                                }`}>
                                    <div className="p-6">
                                        <h3 className={`text-xl font-semibold mb-4 ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            Find Us
                                        </h3>

                                        <div className="rounded-lg overflow-hidden mb-4 h-[400px]">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968173775!2d-122.40058048439737!3d37.78583531908426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085d0d29af1%3A0x7b1e9ecdf8a8d5d8!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1647887412797!5m2!1sen!2sus"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                title="GadgetSwap Office Location"
                                                className="rounded-lg"
                                            ></iframe>
                                        </div>

                                        <div className={`p-4 rounded-lg ${
                                            darkMode
                                                ? 'bg-gray-700/50 border border-gray-600/50'
                                                : 'bg-gray-50 border border-gray-200/50'
                                        }`}>
                                            <div className="flex items-start">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                                    darkMode
                                                        ? 'bg-green-900/30 text-green-400'
                                                        : 'bg-green-100 text-green-600'
                                                }`}>
                                                    <FiGlobe size={20} />
                                                </div>
                                                <div>
                                                    <h4 className={`font-medium mb-1 ${
                                                        darkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        Directions
                                                    </h4>
                                                    <p className={`text-sm mb-3 ${
                                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>
                                                        We're located in the heart of San Francisco's tech district, easily accessible by public transportation.
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <a
                                                            href="https://maps.google.com/?q=123+Tech+Avenue,+San+Francisco,+CA+94107"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                                                                darkMode
                                                                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                            }`}
                                                        >
                                                            <FiMapPin className="mr-1" size={14} />
                                                            <span>Google Maps</span>
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                                                                darkMode
                                                                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                            }`}
                                                        >
                                                            <FiTruck className="mr-1" size={14} />
                                                            <span>Parking Info</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Quick Answers */}
                            {activeTab === 'faq' && (
                                <div className={`rounded-xl overflow-hidden ${
                                    darkMode
                                        ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                        : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                                }`}>
                                    <div className="p-6">
                                        <h3 className={`text-xl font-semibold mb-4 ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            Quick Answers
                                        </h3>

                                        <div className="space-y-4">
                                            {faqData.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className={`rounded-lg overflow-hidden ${
                                                        darkMode
                                                            ? 'bg-gray-700/50 border border-gray-600/50'
                                                            : 'bg-gray-50 border border-gray-200/50'
                                                    }`}
                                                >
                                                    <div className={`p-4 font-medium ${
                                                        darkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        {faq.question}
                                                    </div>
                                                    <div className={`p-4 border-t ${
                                                        darkMode
                                                            ? 'border-gray-600/50 text-gray-300 bg-gray-700/30'
                                                            : 'border-gray-200/50 text-gray-600 bg-gray-50/50'
                                                    }`}>
                                                        {faq.answer}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 text-center">
                                            <a
                                                href="/faq"
                                                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                                                    darkMode
                                                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                            >
                                                <span>View All FAQs</span>
                                                <FiChevronRight className="ml-1" size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Chat Window */}
            {isChatOpen && (
                <div className={`fixed bottom-6 right-6 z-50 w-80 md:w-96 rounded-xl overflow-hidden shadow-2xl ${
                    darkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                }`}>
                    {/* Chat Header */}
                    <div className={`p-4 flex items-center justify-between ${
                        darkMode
                            ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    }`}>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                <FiMessageCircle size={16} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium">GadgetSwap Support</h3>
                                <p className="text-xs text-white/80">We typically reply in a few minutes</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={toggleMinimize}
                                className="text-white/80 hover:text-white mr-2"
                                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                            >
                                {isMinimized ? <FiMaximize2 size={18} /> : <FiMinimize2 size={18} />}
                            </button>
                            <button
                                onClick={closeChat}
                                className="text-white/80 hover:text-white"
                                aria-label="Close chat"
                            >
                                <FiX size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Body */}
                    {!isMinimized && (
                        <>
                            <div className={`h-80 overflow-y-auto p-4 ${
                                darkMode ? 'bg-gray-800' : 'bg-white'
                            }`}>
                                {chatMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.sender === 'system' && (
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                                                darkMode
                                                    ? 'bg-blue-900/30 text-blue-400'
                                                    : 'bg-blue-100 text-blue-600'
                                            }`}>
                                                <FiMessageCircle size={16} />
                                            </div>
                                        )}
                                        <div className={`max-w-[75%] rounded-lg px-4 py-2 ${
                                            msg.sender === 'user'
                                                ? darkMode
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-600 text-white'
                                                : darkMode
                                                    ? 'bg-gray-700 text-gray-200'
                                                    : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={`text-xs mt-1 ${
                                                msg.sender === 'user'
                                                    ? 'text-blue-100'
                                                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                {formatChatTime(msg.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className={`p-3 border-t ${
                                darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                            }`}>
                                <form onSubmit={sendChatMessage} className="flex items-center">
                                    <input
                                        type="text"
                                        value={currentMessage}
                                        onChange={handleChatInputChange}
                                        placeholder="Type your message..."
                                        className={`flex-1 px-3 py-2 rounded-lg ${
                                            darkMode
                                                ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-500'
                                        } focus:outline-none focus:ring-2 ${
                                            darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'
                                        }`}
                                    />
                                    <button
                                        type="submit"
                                        className={`ml-2 p-2 rounded-full ${
                                            darkMode
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                        disabled={!currentMessage.trim()}
                                        aria-label="Send message"
                                    >
                                        <FiSend size={18} />
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContactUsComponent;
