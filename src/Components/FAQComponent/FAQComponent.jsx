import React, { useState, useEffect, useRef } from 'react';
import {
    FiSearch,
    FiPlus,
    FiMinus,
    FiChevronRight,
    FiHelpCircle,
    FiShoppingBag,
    FiAward,
    FiDollarSign,
    FiShield,
    FiTruck,
    FiClock,
    FiMenu,
    FiX
} from 'react-icons/fi';
import useTheme from "../../CustomHooks/useTheme.jsx";


const FAQComponent = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchInputRef = useRef(null);


    // FAQ data organized by categories
    const faqData = [
        {
            id: 'general-1',
            category: 'general',
            question: 'What is GadgetSwap?',
            answer: 'GadgetSwap is a rental marketplace that allows users to rent high-quality gadgets for a fraction of the purchase price. Our platform connects gadget owners with people who need temporary access to technology, creating a sustainable sharing economy for electronics.'
        },
        {
            id: 'general-2',
            category: 'general',
            question: 'How do I create an account?',
            answer: 'Creating an account is simple! Click on the "Sign Up" button in the top right corner of the homepage. You can register using your email address, or sign up with your Google or Facebook account for faster access. Once registered, you\'ll need to verify your email address and complete your profile information.'
        },
        {
            id: 'general-3',
            category: 'general',
            question: 'Is my personal information secure?',
            answer: 'Yes, we take data security very seriously. All personal information is encrypted and stored securely. We use industry-standard security protocols and never share your information with third parties without your consent. You can review our privacy policy for more details on how we protect your data.'
        },
        {
            id: 'general-4',
            category: 'general',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. For some regions, we also support local payment methods. All transactions are processed securely through our payment partners.'
        },
        {
            id: 'general-5',
            category: 'general',
            question: 'How can I contact customer support?',
            answer: 'Our customer support team is available 24/7. You can reach us through the "Contact Us" page on our website, email us at support@gadgetswap.com, or use the live chat feature in the bottom right corner of any page. For urgent matters, you can call our support hotline at 1-800-GADGET-SWAP.'
        },
        {
            id: 'how-it-works-1',
            category: 'how-it-works',
            question: 'How does the rental process work?',
            answer: 'The rental process is straightforward: Browse our catalog and select the gadget you want to rent. Choose your rental period (daily, weekly, or monthly), and add the item to your cart. Complete the checkout process by providing shipping information and payment details. The gadget will be delivered to your doorstep on your selected date. When the rental period ends, use the prepaid shipping label to return the item.'
        },
        {
            id: 'how-it-works-2',
            category: 'how-it-works',
            question: 'What happens if I damage a rented gadget?',
            answer: 'All rentals come with basic protection against manufacturing defects. However, for accidental damage, you may be responsible for repair or replacement costs. We offer optional insurance plans at checkout that cover accidental damage, spills, and drops. We recommend adding insurance for valuable items to avoid unexpected charges.'
        },
        {
            id: 'how-it-works-3',
            category: 'how-it-works',
            question: 'Can I extend my rental period?',
            answer: 'Yes, you can extend your rental period through your account dashboard. Go to "My Rentals" and select the item you wish to extend. Choose your new return date and pay for the additional rental period. Extensions must be requested at least 24 hours before the scheduled return date to avoid late fees.'
        },
        {
            id: 'how-it-works-4',
            category: 'how-it-works',
            question: 'How do I return a rented gadget?',
            answer: 'Returning is easy! Each rental comes with a prepaid return shipping label. Simply pack the gadget in its original packaging, attach the provided return label, and drop it off at any authorized shipping location. You wll receive a confirmation email once we receive the returned item. Make sure to return the item by the due date to avoid late fees.'
        },
        {
            id: 'how-it-works-5',
            category: 'how-it-works',
            question: 'What areas do you serve?',
            answer: 'We currently serve all 50 U.S. states and select cities in Canada. We are continuously expanding our service area. For international customers, we offer limited services with additional shipping fees and longer delivery times. Check our "Service Areas" page for the most up-to-date information on coverage.'
        },
        {
            id: 'how-it-works-6',
            category: 'how-it-works',
            question: 'How long can I rent a gadget?',
            answer: 'Our rental periods are flexible to meet your needs. You can rent gadgets for as short as 3 days or as long as 6 months. For longer-term rentals, we offer significant discounts. Custom rental periods can be arranged for business customers or special events by contacting our customer service team.'
        },
        {
            id: 'how-it-works-7',
            category: 'how-it-works',
            question: 'Can I rent multiple gadgets at once?',
            answer: 'You can rent as many gadgets as you need in a single order. We offer bundle discounts when you rent multiple items together. This is particularly popular for event organizers, production companies, or when setting up temporary offices.'
        },
        {
            id: 'loyalty-rewards-1',
            category: 'loyalty-rewards',
            question: 'How does the loyalty program work?',
            answer: 'Our loyalty program rewards you for every rental. You earn 10 points for every $1 spent on rentals. Additional points can be earned by writing reviews, referring friends, and maintaining a rental streak. These points can be redeemed for discounts, free rentals, extended rental periods, and other exclusive benefits.'
        },
        {
            id: 'loyalty-rewards-2',
            category: 'loyalty-rewards',
            question: 'What are the different membership tiers?',
            answer: 'We have four membership tiers: Bronze (0-499 points), Silver (500-1,499 points), Gold (1,500-4,999 points), and Platinum (5,000+ points). Each tier offers increasing benefits, including higher discounts, free shipping, priority customer support, and exclusive access to premium gadgets. Your tier is automatically upgraded when you reach the required points threshold.'
        },
        {
            id: 'loyalty-rewards-3',
            category: 'loyalty-rewards',
            question: 'How do I redeem my loyalty points?',
            answer: 'You can redeem your points through your account dashboard. Navigate to the "Rewards" section, select the reward you want to redeem, and follow the instructions. Points will be deducted automatically, and your reward will be applied to your account immediately or during your next checkout, depending on the type of reward.'
        },
        {
            id: 'loyalty-rewards-4',
            category: 'loyalty-rewards',
            question: 'Do loyalty points expire?',
            answer: 'Yes, points are valid for 12 months from the date they are earned. However, any activity on your account (rentals, reviews, etc.) will extend all your existing points for another 12 months. Platinum members enjoy non-expiring points as one of their exclusive benefits.'
        },
        {
            id: 'loyalty-rewards-5',
            category: 'loyalty-rewards',
            question: 'How do I check my current points balance?',
            answer: 'Your current points balance is displayed in your account dashboard. You can also see a detailed breakdown of how you earned your points and your points history. The dashboard shows your current tier, progress toward the next tier, and available rewards you can redeem.'
        },
        {
            id: 'loyalty-rewards-6',
            category: 'loyalty-rewards',
            question: 'Can I transfer my loyalty points to someone else?',
            answer: 'Currently, loyalty points are non-transferable between accounts. However, Platinum members can gift a limited number of points to friends or family members once per quarter as part of their exclusive benefits. We\'re working on expanding this feature to other membership tiers in the future.'
        }
    ];

    // Categories for navigation
    const categories = [
        { id: 'all', name: 'All Questions', icon: <FiHelpCircle /> },
        { id: 'general', name: 'General', icon: <FiShoppingBag /> },
        { id: 'how-it-works', name: 'How It Works', icon: <FiClock /> },
        { id: 'loyalty-rewards', name: 'Loyalty & Rewards', icon: <FiAward /> }
    ];


    // Toggle FAQ item expansion
    const toggleItem = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };


    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setIsMobileMenuOpen(false);
    };


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    // Clear search input
    const clearSearch = () => {
        setSearchQuery('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };


    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    // Filter FAQs based on active category and search query
    const filteredFaqs = faqData.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });


    // Group FAQs by category for display
    const groupedFaqs = {};
    filteredFaqs.forEach(faq => {
        if (!groupedFaqs[faq.category]) {
            groupedFaqs[faq.category] = [];
        }
        groupedFaqs[faq.category].push(faq);
    });


    // Get category name by ID
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    };


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);


    return (
        <div className={`min-h-[calc(100vh-421px)] w-full py-16 pt-32 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                        darkMode
                            ? 'bg-gray-800 text-blue-400 border border-gray-700'
                            : 'bg-white text-blue-600 border border-gray-200 shadow-sm'
                    }`}>
                        <FiHelpCircle className="mr-2" />
                        <span>Support Center</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Frequently Asked Questions
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Find answers to common questions about GadgetSwap
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-10">
                    <div className={`relative rounded-lg overflow-hidden ${
                        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                    }`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </div>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for questions..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className={`block w-full pl-10 pr-10 py-3 ${
                                darkMode
                                    ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500'
                                    : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                            } focus:outline-none focus:ring-2 focus:border-transparent`}
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                aria-label="Clear search"
                            >
                                <FiX className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Category Navigation - Desktop */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className={`sticky top-24 rounded-xl overflow-hidden ${
                            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                        }`}>
                            <div className={`py-3 px-4 font-medium ${
                                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900 border-b border-gray-200'
                            }`}>
                                Categories
                            </div>
                            <nav className="p-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryChange(category.id)}
                                        className={`flex items-center w-full px-3 py-2 rounded-lg text-left mb-1 transition-colors ${
                                            activeCategory === category.id
                                                ? darkMode
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-blue-50 text-blue-700'
                                                : darkMode
                                                    ? 'text-gray-300 hover:bg-gray-700'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className={`mr-2 ${
                                            activeCategory === category.id
                                                ? darkMode ? 'text-blue-400' : 'text-blue-600'
                                                : ''
                                        }`}>
                                            {category.icon}
                                        </span>
                                        <span>{category.name}</span>
                                        {activeCategory === category.id && (
                                            <FiChevronRight className="ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Category Navigation - Mobile */}
                    <div className="lg:hidden mb-6">
                        <button
                            onClick={toggleMobileMenu}
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                                darkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                            }`}
                        >
                            <span className="flex items-center">
                                {categories.find(cat => cat.id === activeCategory)?.icon}
                                <span className="ml-2">{getCategoryName(activeCategory)}</span>
                            </span>
                            {isMobileMenuOpen ? <FiX/> : <FiMenu/>}
                        </button>

                        {isMobileMenuOpen && (
                            <div className={`mt-2 rounded-xl overflow-hidden shadow-xl ${
                                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                            }`}>
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryChange(category.id)}
                                        className={`flex items-center w-full px-4 py-3 text-left ${
                                            activeCategory === category.id
                                                ? darkMode
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-blue-50 text-blue-700'
                                                : darkMode
                                                    ? 'text-gray-300 hover:bg-gray-700'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                        } ${category.id !== categories[categories.length - 1].id ? 'border-b border-gray-700' : ''}`}
                                    >
                                        <span className="mr-2">{category.icon}</span>
                                        <span>{category.name}</span>
                                        {activeCategory === category.id && (
                                            <FiChevronRight className="ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* FAQ Content */}
                    <div className="flex-1">
                        {filteredFaqs.length === 0 ? (
                            <div className={`text-center py-12 rounded-xl ${
                                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                            }`}>
                                <FiHelpCircle className={`mx-auto mb-4 text-4xl ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                                <h3 className="text-xl font-medium mb-2">No questions found</h3>
                                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                    Try adjusting your search or category filter
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveCategory('all');
                                    }}
                                    className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                                        darkMode
                                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Reset filters
                                </button>
                            </div>
                        ) : (
                            activeCategory === 'all' ? (
                                // Display grouped by category when "All Questions" is selected
                                Object.keys(groupedFaqs).map(categoryId => (
                                    <div key={categoryId} className="mb-8">
                                        <div className="flex items-center mb-4">
                                            <span className={`mr-2 ${
                                                darkMode ? 'text-blue-400' : 'text-blue-600'
                                            }`}>
                                            {categories.find(cat => cat.id === categoryId)?.icon}
                                            </span>
                                            <h3 className={`text-xl font-semibold ${
                                                darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {getCategoryName(categoryId)}
                                            </h3>
                                        </div>

                                        <div className={`rounded-xl overflow-hidden mb-6 ${
                                            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                                        }`}>
                                            {groupedFaqs[categoryId].map((faq, index) => (
                                                <div
                                                    key={faq.id}
                                                    className={`${
                                                        index !== 0 ? (darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200') : ''
                                                    }`}
                                                >
                                                    <button
                                                        onClick={() => toggleItem(faq.id)}
                                                        className={`flex items-center justify-between w-full text-left p-5 ${
                                                            expandedItems[faq.id]
                                                                ? darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                                : ''
                                                        }`}
                                                        aria-expanded={expandedItems[faq.id]}
                                                        aria-controls={`answer-${faq.id}`}
                                                    >
                                                        <span className={`font-medium ${
                                                            darkMode ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                            {faq.question}
                                                        </span>
                                                        <span className={`ml-4 flex-shrink-0 ${
                                                            expandedItems[faq.id]
                                                                ? darkMode ? 'text-blue-400' : 'text-blue-600'
                                                                : darkMode ? 'text-gray-400' : 'text-gray-500'
                                                        }`}>
                                                            {expandedItems[faq.id] ? <FiMinus/> : <FiPlus/>}
                                                        </span>
                                                    </button>

                                                    <div
                                                        id={`answer-${faq.id}`}
                                                        className={`overflow-hidden transition-all duration-300 ${
                                                            expandedItems[faq.id] ? 'max-h-96' : 'max-h-0'
                                                        }`}
                                                    >
                                                        <div className={`p-5 ${
                                                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
                                                        } border-t ${
                                                            darkMode ? 'border-gray-600' : 'border-gray-200'
                                                        }`}>
                                                            {faq.answer}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Display flat list when specific category is selected
                                <div className={`rounded-xl overflow-hidden ${
                                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                                }`}>
                                    {filteredFaqs.map((faq, index) => (
                                        <div
                                            key={faq.id}
                                            className={`${
                                                index !== 0 ? (darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200') : ''
                                            }`}
                                        >
                                            <button
                                                onClick={() => toggleItem(faq.id)}
                                                className={`flex items-center justify-between w-full text-left p-5 ${
                                                    expandedItems[faq.id]
                                                        ? darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                        : ''
                                                }`}
                                                aria-expanded={expandedItems[faq.id]}
                                                aria-controls={`answer-${faq.id}`}
                                            >
                                                <span className={`font-medium ${
                                                    darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                    {faq.question}
                                                </span>
                                                <span className={`ml-4 flex-shrink-0 ${
                                                    expandedItems[faq.id]
                                                        ? darkMode ? 'text-blue-400' : 'text-blue-600'
                                                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    {expandedItems[faq.id] ? <FiMinus/> : <FiPlus/>}
                                                </span>
                                            </button>

                                            <div
                                                id={`answer-${faq.id}`}
                                                className={`overflow-hidden transition-all duration-300 ${
                                                    expandedItems[faq.id] ? 'max-h-96' : 'max-h-0'
                                                }`}
                                            >
                                                <div className={`p-5 ${
                                                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
                                                } border-t ${
                                                    darkMode ? 'border-gray-600' : 'border-gray-200'
                                                }`}>
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {/* Still Have Questions Section */}
                        <div className={`mt-10 p-6 rounded-xl text-center ${
                            darkMode
                                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
                                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'
                        }`}>
                            <h3 className={`text-xl font-semibold mb-2 ${
                                darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Still have questions?
                            </h3>
                            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Can't find the answer you're looking for? Please chat with our friendly team.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="/contact"
                                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                                    }`}
                                >
                                <span className="flex items-center justify-center">
                                    <FiHelpCircle className="mr-2"/>
                                    Contact Support
                                </span>
                                </a>
                                <a
                                    href="/live-chat"
                                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                    }`}
                                >
                                <span className="flex items-center justify-center">
                                    <FiShield className="mr-2"/>
                                    Live Chat
                                </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQComponent;
