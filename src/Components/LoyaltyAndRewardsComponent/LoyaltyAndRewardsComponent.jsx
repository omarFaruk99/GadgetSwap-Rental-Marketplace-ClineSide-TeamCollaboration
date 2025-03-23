import React, {useState, useEffect} from 'react';
import {
    FiAward,
    FiChevronRight,
    FiChevronDown,
    FiChevronUp,
    FiGift,
    FiClock,
    FiPercent,
    FiShield,
    FiTruck,
    FiHeart,
    FiStar,
    FiMenu,
    FiX
} from 'react-icons/fi';
import {
    IoRocketOutline,
    IoSparklesOutline,
    IoTrophyOutline,
    IoWalletOutline,
    IoTimeOutline,
    IoTicketOutline
} from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const LoyaltyAndRewardsComponent = () => {

    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();

    const [activeTab, setActiveTab] = useState('tiers');
    const [activeTier, setActiveTier] = useState('silver');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    // Check if mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // Loyalty tiers data
    const loyaltyTiers = [
        {
            id: 'bronze',
            name: 'Bronze',
            icon: <FiAward className="text-amber-700" size={24}/>,
            pointsRequired: 0,
            color: 'from-amber-700 to-amber-600',
            benefits: [
                {id: 'b1', text: 'Access to basic gadget catalog', icon: <FiGift size={16}/>},
                {id: 'b2', text: 'Standard delivery options', icon: <FiTruck size={16}/>},
                {id: 'b3', text: '5% discount on extended rentals', icon: <FiPercent size={16}/>},
                {id: 'b4', text: 'Basic customer support', icon: <FiHeart size={16}/>}
            ]
        },
        {
            id: 'silver',
            name: 'Silver',
            icon: <FiAward className="text-gray-400" size={24}/>,
            pointsRequired: 500,
            color: 'from-gray-400 to-gray-300',
            benefits: [
                {id: 's1', text: 'All Bronze benefits', icon: <FiGift size={16}/>},
                {id: 's2', text: 'Priority customer support', icon: <FiHeart size={16}/>},
                {id: 's3', text: '10% discount on extended rentals', icon: <FiPercent size={16}/>},
                {id: 's4', text: 'Free standard shipping', icon: <FiTruck size={16}/>},
                {id: 's5', text: 'Access to premium gadget catalog', icon: <FiStar size={16}/>}
            ]
        },
        {
            id: 'gold',
            name: 'Gold',
            icon: <FiAward className="text-amber-400" size={24}/>,
            pointsRequired: 1500,
            color: 'from-amber-400 to-amber-300',
            benefits: [
                {id: 'g1', text: 'All Silver benefits', icon: <FiGift size={16}/>},
                {id: 'g2', text: '15% discount on extended rentals', icon: <FiPercent size={16}/>},
                {id: 'g3', text: 'Free expedited shipping', icon: <FiTruck size={16}/>},
                {id: 'g4', text: 'Priority access to new gadgets', icon: <FiClock size={16}/>},
                {id: 'g5', text: 'Dedicated customer support', icon: <FiHeart size={16}/>},
                {id: 'g6', text: 'Free basic insurance on rentals', icon: <FiShield size={16}/>}
            ]
        },
        {
            id: 'platinum',
            name: 'Platinum',
            icon: <FiAward className="text-purple-400" size={24}/>,
            pointsRequired: 5000,
            color: 'from-purple-500 to-indigo-500',
            benefits: [
                {id: 'p1', text: 'All Gold benefits', icon: <FiGift size={16}/>},
                {id: 'p2', text: '25% discount on extended rentals', icon: <FiPercent size={16}/>},
                {id: 'p3', text: 'Free premium insurance on all rentals', icon: <FiShield size={16}/>},
                {id: 'p4', text: 'Free overnight shipping', icon: <FiTruck size={16}/>},
                {id: 'p5', text: 'VIP customer support', icon: <FiHeart size={16}/>},
                {id: 'p6', text: 'Early access to limited edition gadgets', icon: <FiStar size={16}/>},
                {id: 'p7', text: 'Exclusive member events and workshops', icon: <IoTicketOutline size={16}/>}
            ]
        }
    ];


    // Rewards data
    const rewardsData = [
        {
            id: 'rental-discounts',
            name: 'Rental Discounts',
            icon: <FiPercent className="text-green-500" size={24}/>,
            description: 'Redeem points for discounts on your next gadget rental. The more points you use, the bigger the discount!',
            redemptionOptions: [
                {points: 200, value: '10% off your next rental'},
                {points: 500, value: '25% off your next rental'},
                {points: 1000, value: '50% off your next rental'},
                {points: 2000, value: 'One free rental (up to $100 value)'}
            ]
        },
        {
            id: 'extended-rentals',
            name: 'Extended Rentals',
            icon: <IoTimeOutline className="text-blue-500" size={24}/>,
            description: 'Use your points to extend your current rental period without additional charges.',
            redemptionOptions: [
                {points: 300, value: '3 extra days on any rental'},
                {points: 600, value: '1 extra week on any rental'},
                {points: 1200, value: '2 extra weeks on any rental'}
            ]
        },
        {
            id: 'premium-upgrades',
            name: 'Premium Upgrades',
            icon: <IoRocketOutline className="text-purple-500" size={24}/>,
            description: 'Upgrade your rental to a premium model or add premium accessories to your existing rental.',
            redemptionOptions: [
                {points: 400, value: 'Upgrade to next model tier'},
                {points: 700, value: 'Premium accessory package'},
                {points: 1500, value: 'Ultra-premium model upgrade'}
            ]
        },
        {
            id: 'insurance-coverage',
            name: 'Insurance Coverage',
            icon: <FiShield className="text-red-500" size={24}/>,
            description: 'Redeem points for insurance coverage on your rentals for peace of mind.',
            redemptionOptions: [
                {points: 250, value: 'Basic damage protection'},
                {points: 500, value: 'Standard insurance package'},
                {points: 1000, value: 'Premium all-inclusive coverage'}
            ]
        },
        {
            id: 'exclusive-access',
            name: 'Exclusive Access',
            icon: <IoTrophyOutline className="text-amber-500" size={24}/>,
            description: 'Use points to gain early or exclusive access to limited edition and high-demand gadgets.',
            redemptionOptions: [
                {points: 800, value: 'Early access to new releases'},
                {points: 1500, value: 'Reservation for high-demand items'},
                {points: 3000, value: 'Access to limited edition gadgets'}
            ]
        },
        {
            id: 'gift-cards',
            name: 'Gift Cards',
            icon: <IoWalletOutline className="text-pink-500" size={24}/>,
            description: 'Convert your loyalty points into gift cards for popular retailers and online stores.',
            redemptionOptions: [
                {points: 1000, value: '$25 gift card'},
                {points: 2000, value: '$50 gift card'},
                {points: 4000, value: '$100 gift card'}
            ]
        }
    ];


    // How to earn points data
    const earnPointsData = [
        {
            id: 'rentals',
            name: 'Complete Rentals',
            icon: <FiGift className="text-indigo-500" size={24}/>,
            description: 'Earn 10 points for every $1 spent on rentals',
            example: 'Rent a $100 gadget and earn 1,000 points'
        },
        {
            id: 'reviews',
            name: 'Write Reviews',
            icon: <FiStar className="text-amber-500" size={24}/>,
            description: 'Earn 250 points for each verified review with photos',
            example: 'Review your rental experience with photos and earn 250 points'
        },
        {
            id: 'referrals',
            name: 'Refer Friends',
            icon: <FiHeart className="text-pink-500" size={24}/>,
            description: 'Earn 500 points when a referred friend completes their first rental',
            example: 'Refer 5 friends and earn 2,500 points'
        },
        {
            id: 'streak',
            name: 'Rental Streak',
            icon: <IoSparklesOutline className="text-purple-500" size={24}/>,
            description: 'Earn bonus points for consecutive monthly rentals',
            example: 'Rent for 3 consecutive months and earn a 1,000 point bonus'
        }
    ];


    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsMenuOpen(false);
    };


    // Handle tier selection
    const handleTierSelect = (tierId) => {
        setActiveTier(tierId);
    };


    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <div className={`w-full py-16 transition-colors duration-300 ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div
                    className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
                <div
                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                        darkMode
                            ? 'bg-gray-800/70 text-cyan-300 border border-cyan-800/50'
                            : 'bg-white/80 text-indigo-700 border border-indigo-200/50'
                    } backdrop-blur-md`}>
                        <FiAward className="mr-2"/>
                        <span>Membership Program</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        darkMode
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                    }`}>
                        Loyalty & Rewards
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Earn points with every rental and unlock exclusive benefits, discounts, and premium experiences
                    </p>
                </div>

                {/* Navigation Tabs - Desktop */}
                <div className="hidden lg:flex justify-center mb-8">
                    <div className={`inline-flex rounded-lg p-1 ${
                        darkMode ? 'bg-gray-800/70 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-sm'
                    }`}>
                        <button
                            onClick={() => handleTabChange('tiers')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                activeTab === 'tiers'
                                    ? darkMode
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-indigo-100 text-indigo-700'
                                    : darkMode
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                        : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                            }`}
                        >
                            <span className="flex items-center">
                                <FiAward className="mr-2"/>
                                Membership Tiers
                            </span>
                        </button>

                        <button
                            onClick={() => handleTabChange('rewards')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                activeTab === 'rewards'
                                    ? darkMode
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-indigo-100 text-indigo-700'
                                    : darkMode
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                        : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                            }`}
                        >
                            <span className="flex items-center">
                                <FiGift className="mr-2"/>
                                Redeem Rewards
                            </span>
                        </button>

                        <button
                            onClick={() => handleTabChange('earn')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                activeTab === 'earn'
                                    ? darkMode
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-indigo-100 text-indigo-700'
                                    : darkMode
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                        : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                            }`}
                        >
                            <span className="flex items-center">
                                <IoSparklesOutline className="mr-2"/>
                                How to Earn Points
                            </span>
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs - Mobile */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={toggleMenu}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                            darkMode ? 'bg-gray-800/70 text-white' : 'bg-white/90 text-gray-900 shadow-sm'
                        }`}
                    >
                        <span className="flex items-center">
                            {activeTab === 'tiers' && <FiAward className="mr-2"/>}
                            {activeTab === 'rewards' && <FiGift className="mr-2"/>}
                            {activeTab === 'earn' && <IoSparklesOutline className="mr-2"/>}

                            {activeTab === 'tiers' && 'Membership Tiers'}
                            {activeTab === 'rewards' && 'Redeem Rewards'}
                            {activeTab === 'earn' && 'How to Earn Points'}
                        </span>
                        {isMenuOpen ? <FiX size={20}/> : <FiMenu size={20}/>}
                    </button>

                    {isMenuOpen && (
                        <div className={`mt-2 rounded-xl overflow-hidden shadow-xl ${
                            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                            <button
                                onClick={() => handleTabChange('tiers')}
                                className={`flex items-center w-full px-4 py-3 text-left ${
                                    activeTab === 'tiers'
                                        ? darkMode
                                            ? 'bg-gray-700 text-white'
                                            : 'bg-indigo-50 text-indigo-700'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-700/50'
                                            : 'text-gray-700 hover:bg-indigo-50'
                                }`}
                            >
                                <FiAward className="mr-2"/>
                                Membership Tiers
                            </button>

                            <button
                                onClick={() => handleTabChange('rewards')}
                                className={`flex items-center w-full px-4 py-3 text-left ${
                                    activeTab === 'rewards'
                                        ? darkMode
                                            ? 'bg-gray-700 text-white'
                                            : 'bg-indigo-50 text-indigo-700'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-700/50'
                                            : 'text-gray-700 hover:bg-indigo-50'
                                }`}
                            >
                                <FiGift className="mr-2"/>
                                Redeem Rewards
                            </button>

                            <button
                                onClick={() => handleTabChange('earn')}
                                className={`flex items-center w-full px-4 py-3 text-left ${
                                    activeTab === 'earn'
                                        ? darkMode
                                            ? 'bg-gray-700 text-white'
                                            : 'bg-indigo-50 text-indigo-700'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-700/50'
                                            : 'text-gray-700 hover:bg-indigo-50'
                                }`}
                            >
                                <IoSparklesOutline className="mr-2"/>
                                How to Earn Points
                            </button>
                        </div>
                    )}
                </div>

                {/* Membership Tiers Content */}
                {activeTab === 'tiers' && (
                    <div className="w-11/12 mx-auto">
                        {/* Tier Selection - Desktop */}
                        <div className="hidden md:flex justify-center mb-8">
                            <div className={`inline-flex rounded-full p-1 ${
                                darkMode ? 'bg-gray-800/70 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-sm'
                            }`}>
                                {loyaltyTiers.map((tier) => (
                                    <button
                                        key={tier.id}
                                        onClick={() => handleTierSelect(tier.id)}
                                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            activeTier === tier.id
                                                ? `bg-gradient-to-r ${tier.color} text-white`
                                                : darkMode
                                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                    : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                                        }`}
                                    >
                                        <span className="flex items-center">
                                            {tier.icon}
                                            <span className="ml-2">{tier.name}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tier Selection - Mobile */}
                        <div className="md:hidden mb-6">
                            <div className={`grid grid-cols-2 gap-2 ${
                                darkMode ? 'bg-gray-800/70 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-sm'
                            } rounded-xl p-2`}>
                                {loyaltyTiers.map((tier) => (
                                    <button
                                        key={tier.id}
                                        onClick={() => handleTierSelect(tier.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                            activeTier === tier.id
                                                ? `bg-gradient-to-r ${tier.color} text-white`
                                                : darkMode
                                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                    : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                                        }`}
                                    >
                                        <span className="flex items-center justify-center">
                                            {tier.icon}
                                            <span className="ml-2">{tier.name}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Tier Details */}
                        {loyaltyTiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={`${activeTier === tier.id ? 'block' : 'hidden'}`}
                            >
                                <div className={`rounded-2xl overflow-hidden ${
                                    darkMode
                                        ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                        : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl'
                                }`}>
                                    {/* Tier Header */}
                                    <div className={`bg-gradient-to-r ${tier.color} p-6 md:p-8 text-white`}>
                                        <div className="flex flex-col md:flex-row justify-between items-center">
                                            <div className="flex items-center mb-4 md:mb-0">
                                                <div
                                                    className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                                    {React.cloneElement(tier.icon, {size: 32, className: 'text-white'})}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-bold">{tier.name} Tier</h3>
                                                    <p className="text-white/80">
                                                        {tier.id === 'bronze'
                                                            ? 'Starting tier for all members'
                                                            : `Requires ${tier.pointsRequired.toLocaleString()} points`}
                                                    </p>
                                                </div>
                                            </div>

                                            {tier.id !== 'bronze' && (
                                                <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium">Points to unlock</p>
                                                        <p className="text-2xl font-bold">{tier.pointsRequired.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tier Benefits */}
                                    <div className="p-6 md:p-8">
                                        <h4 className={`text-xl font-semibold mb-4 ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            Membership Benefits
                                        </h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {tier.benefits.map((benefit) => (
                                                <div
                                                    key={benefit.id}
                                                    className={`flex items-center p-4 rounded-xl ${
                                                        darkMode
                                                            ? 'bg-gray-700/50 border border-gray-600/50'
                                                            : 'bg-gray-50/80 border border-gray-200/50'
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                                            darkMode
                                                                ? 'bg-gray-800 text-white'
                                                                : 'bg-white text-indigo-600 shadow-sm'
                                                        }`}>
                                                        {benefit.icon}
                                                    </div>
                                                    <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                                                        {benefit.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Upgrade CTA */}
                                        {tier.id !== 'platinum' && (
                                            <div className="mt-8 text-center">
                                                <a
                                                    href="/account/loyalty"
                                                    className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                                        darkMode
                                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-900/20'
                                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-600/20'
                                                    }`}
                                                >
                                                    <span>Upgrade to {tier.id === 'bronze' ? 'Silver' : tier.id === 'silver' ? 'Gold' : 'Platinum'}</span>
                                                    <FiChevronRight className="ml-2"/>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tier Comparison */}
                                <div className={`mt-8 rounded-xl overflow-hidden ${
                                    darkMode
                                        ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                        : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                                }`}>
                                    <div className="p-6">
                                        <h4 className={`text-xl font-semibold mb-4 ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            Tier Comparison
                                        </h4>

                                        <div className="overflow-x-auto">
                                            <table className="w-full min-w-[600px]">
                                                <thead>
                                                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                                                    <th className="py-3 px-4 text-left">Feature</th>
                                                    {loyaltyTiers.map((t) => (
                                                        <th
                                                            key={`th-${t.id}`}
                                                            className={`py-3 px-4 text-center ${
                                                                activeTier === t.id
                                                                    ? darkMode ? 'text-purple-400' : 'text-indigo-600'
                                                                    : ''
                                                            }`}
                                                        >
                                                            {t.name}
                                                        </th>
                                                    ))}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                                                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Rental Discount
                                                    </td>
                                                    <td className="py-3 px-4 text-center">5%</td>
                                                    <td className="py-3 px-4 text-center">10%</td>
                                                    <td className="py-3 px-4 text-center">15%</td>
                                                    <td className="py-3 px-4 text-center">25%</td>
                                                </tr>
                                                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                                                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Free Shipping
                                                    </td>
                                                    <td className="py-3 px-4 text-center">—</td>
                                                    <td className="py-3 px-4 text-center">Standard</td>
                                                    <td className="py-3 px-4 text-center">Expedited</td>
                                                    <td className="py-3 px-4 text-center">Overnight</td>
                                                </tr>
                                                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                                                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Insurance
                                                    </td>
                                                    <td className="py-3 px-4 text-center">—</td>
                                                    <td className="py-3 px-4 text-center">Basic</td>
                                                    <td className="py-3 px-4 text-center">Premium</td>
                                                </tr>
                                                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                                                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Customer Support
                                                    </td>
                                                    <td className="py-3 px-4 text-center">Basic</td>
                                                    <td className="py-3 px-4 text-center">Priority</td>
                                                    <td className="py-3 px-4 text-center">Dedicated</td>
                                                    <td className="py-3 px-4 text-center">VIP</td>
                                                </tr>
                                                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                                                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Access to New Gadgets
                                                    </td>
                                                    <td className="py-3 px-4 text-center">Standard</td>
                                                    <td className="py-3 px-4 text-center">Standard</td>
                                                    <td className="py-3 px-4 text-center">Priority</td>
                                                    <td className="py-3 px-4 text-center">Early Access</td>
                                                </tr>
                                                <tr>
                                                    <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Exclusive Events
                                                    </td>
                                                    <td className="py-3 px-4 text-center">—</td>
                                                    <td className="py-3 px-4 text-center">—</td>
                                                    <td className="py-3 px-4 text-center">—</td>
                                                    <td className="py-3 px-4 text-center">✓</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Rewards Content */}
                {activeTab === 'rewards' && (
                    <div className="w-11/12 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rewardsData.map((reward) => (
                                <div
                                    key={reward.id}
                                    className={`rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 ${
                                        darkMode
                                            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50 hover:shadow-lg hover:shadow-purple-900/20'
                                            : 'bg-white/80 backdrop-blur-md border border-gray-200/50 hover:shadow-lg hover:shadow-indigo-200/50'
                                    }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                                    darkMode
                                                        ? 'bg-gray-700'
                                                        : 'bg-gray-100'
                                                }`}>
                                                {reward.icon}
                                            </div>
                                            <h3 className={`text-lg font-semibold ${
                                                darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {reward.name}
                                            </h3>
                                        </div>

                                        <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {reward.description}
                                        </p>

                                        <div className={`rounded-lg overflow-hidden ${
                                            darkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'
                                        }`}>
                                            <div className={`py-2 px-4 text-sm font-medium ${
                                                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                Redemption Options
                                            </div>
                                            <div className="p-3">
                                                {reward.redemptionOptions.map((option, index) => (
                                                    <div
                                                        key={`${reward.id}-option-${index}`}
                                                        className={`flex justify-between items-center py-2 px-2 rounded-lg mb-2 last:mb-0 ${
                                                            darkMode
                                                                ? 'bg-gray-800/70 hover:bg-gray-800'
                                                                : 'bg-white hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                            {option.value}
                                                        </span>
                                                        <span className={`text-sm font-medium ${
                                                            darkMode ? 'text-purple-400' : 'text-indigo-600'
                                                        }`}>
                                                            {option.points} pts
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <a
                                                href={`/rewards/redeem/${reward.id}`}
                                                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                    darkMode
                                                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                                }`}
                                            >
                                                <span>Redeem Now</span>
                                                <FiChevronRight className="ml-1" size={16}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Points Balance Card */}
                        <div className={`mt-10 rounded-xl overflow-hidden ${
                            darkMode
                                ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                        }`}>
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row justify-between items-center">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className={`text-xl font-semibold mb-2 ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            Your Points Balance
                                        </h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Sign in to view your current points balance and redeem rewards
                                        </p>
                                    </div>

                                    <div className="flex space-x-4">
                                        <a
                                            href="/login"
                                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            Sign In
                                        </a>
                                        <a
                                            href="/signup"
                                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                            }`}
                                        >
                                            Sign Up
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* How to Earn Points Content */}
                {activeTab === 'earn' && (
                    <div className="w-11/12 mx-auto">
                        <div className={`rounded-2xl overflow-hidden mb-10 ${
                            darkMode
                                ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl'
                        }`}>
                            <div className="p-6 md:p-8">
                                <h3 className={`text-xl font-semibold mb-6 ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Ways to Earn Points
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {earnPointsData.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`rounded-xl p-5 transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50'
                                                    : 'bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/50'
                                            }`}
                                        >
                                            <div className="flex items-start">
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                                        darkMode
                                                            ? 'bg-gray-800'
                                                            : 'bg-white shadow-sm'
                                                    }`}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h4 className={`text-lg font-medium mb-1 ${
                                                        darkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        {item.name}
                                                    </h4>
                                                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        {item.description}
                                                    </p>
                                                    <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                                                        darkMode
                                                            ? 'bg-gray-800/70 text-gray-300'
                                                            : 'bg-gray-200/70 text-gray-700'
                                                    }`}>
                                                        Example: {item.example}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Points Calculator */}
                        <div className={`rounded-xl overflow-hidden ${
                            darkMode
                                ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                                : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                        }`}>
                            <div className="p-6 md:p-8">
                                <h3 className={`text-xl font-semibold mb-4 ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Points Calculator
                                </h3>
                                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Estimate how many points you can earn with your rentals
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className={`col-span-2 rounded-xl p-5 ${
                                        darkMode
                                            ? 'bg-gray-700/50 border border-gray-600/50'
                                            : 'bg-gray-50/80 border border-gray-200/50'
                                    }`}>
                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Estimated Rental Amount ($)
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter amount"
                                                className={`w-full px-4 py-2 rounded-lg ${
                                                    darkMode
                                                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                                                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                                } focus:outline-none focus:ring-2 ${
                                                    darkMode ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
                                                }`}
                                                defaultValue="100"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Number of Reviews
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter number"
                                                className={`w-full px-4 py-2 rounded-lg ${
                                                    darkMode
                                                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                                                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                                } focus:outline-none focus:ring-2 ${
                                                    darkMode ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
                                                }`}
                                                defaultValue="1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-1 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Number of Referrals
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter number"
                                                className={`w-full px-4 py-2 rounded-lg ${
                                                    darkMode
                                                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                                                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                                } focus:outline-none focus:ring-2 ${
                                                    darkMode ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
                                                }`}
                                                defaultValue="0"
                                            />
                                        </div>

                                        <button
                                            className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                                                darkMode
                                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                            }`}
                                        >
                                            Calculate Points
                                        </button>
                                    </div>

                                    <div className={`rounded-xl p-5 ${
                                        darkMode
                                            ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-800/30'
                                            : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
                                    }`}>
                                        <h4 className={`text-lg font-medium mb-3 ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            Estimated Points
                                        </h4>

                                        <div className={`text-4xl font-bold mb-4 ${
                                            darkMode
                                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400'
                                                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'
                                        }`}>
                                            1,250
                                        </div>

                                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            <div className="flex justify-between mb-1">
                                                <span>Rental Points:</span>
                                                <span>1,000</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <span>Review Bonus:</span>
                                                <span>250</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Referral Bonus:</span>
                                                <span>0</span>
                                            </div>
                                        </div>

                                        <div className={`mt-4 pt-4 text-sm ${
                                            darkMode ? 'border-t border-purple-800/30' : 'border-t border-indigo-200/50'
                                        }`}>
                                            <div className="flex justify-between font-medium">
                                                <span>Current Tier:</span>
                                                <span
                                                    className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Bronze</span>
                                            </div>
                                            <div className="flex justify-between font-medium mt-1">
                                                <span>Next Tier:</span>
                                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    Silver (500 pts)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                <div className="w-10/12 mx-auto mt-16">
                    <h3 className={`text-2xl font-bold mb-6 text-center ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Frequently Asked Questions
                    </h3>

                    <div className={`rounded-xl overflow-hidden ${
                        darkMode
                            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50'
                            : 'bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg'
                    }`}>
                        <div className="divide-y divide-gray-700">
                            <div className="p-6">
                                <h4 className={`text-lg font-medium mb-2 ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    How do I earn loyalty points?
                                </h4>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    You earn 10 points for every $1 spent on rentals. Additional points can be earned by
                                    writing reviews, referring friends, and maintaining a rental streak.
                                </p>
                            </div>

                            <div className="p-6">
                                <h4 className={`text-lg font-medium mb-2 ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    When do my points expire?
                                </h4>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    Points are valid for 12 months from the date they are earned. Any activity on your
                                    account will extend all your points for another 12 months.
                                </p>
                            </div>

                            <div className="p-6">
                                <h4 className={`text-lg font-medium mb-2 ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    How do I redeem my points?
                                </h4>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    You can redeem your points through your account dashboard. Select the reward you
                                    want to redeem and follow the instructions. Points will be deducted automatically.
                                </p>
                            </div>

                            <div className="p-6">
                                <h4 className={`text-lg font-medium mb-2 ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    How do I upgrade my membership tier?
                                </h4>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    Membership tiers are automatically upgraded when you reach the required points
                                    threshold. Silver requires 500 points, Gold requires 1,500 points, and Platinum
                                    requires 5,000 points.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyAndRewardsComponent;
