import React, { useState, useEffect } from "react";
import {
    FiHome,
    FiUsers,
    FiPackage,
    FiShoppingCart,
    FiHeart,
    FiMessageSquare,
    FiDollarSign,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiChevronDown,
    FiTrash2,
    FiStar,
    FiTrendingUp,
    FiSearch,
    FiRefreshCw,
    FiBell,
    FiHelpCircle,
    FiGift,
    FiTruck,
    FiClipboard,
} from "react-icons/fi";
import {
    FaMobileAlt,
    FaLaptop,
    FaTabletAlt,
    FaHeadphones,
    FaCamera,
    FaGamepad
} from "react-icons/fa";
import {useSelector} from "react-redux";


const DashboardComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [dateRange, setDateRange] = useState("week");
    const [isLoading, setIsLoading] = useState(true);

    // Mock user data - in a real app, this would come from authentication
    const [user, setUser] = useState({
        id: "user123",
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg",
        role: "user", // Change to "user" to see user dashboard
        joinDate: "2023-01-15",
        verified: true,
        balance: 1250.75,
        loyaltyPoints: 450
    });

    // Mock data for dashboard
    const [dashboardData, setDashboardData] = useState({
        stats: {
            totalUsers: 1245,
            activeRentals: 78,
            totalGadgets: 342,
            totalRevenue: 28750.50,
            pendingReturns: 12,
            newMessages: 8,
            completedRentals: 156,
            wishlistedItems: 24
        },
        recentRentals: [
            {
                id: "rent001",
                gadgetName: "iPhone 15 Pro Max",
                gadgetImage: "/placeholder.svg",
                renterName: "Alice Johnson",
                startDate: "2023-11-10",
                endDate: "2023-11-17",
                status: "active",
                amount: 175.50
            },
            {
                id: "rent002",
                gadgetName: "MacBook Pro 16\"",
                gadgetImage: "/placeholder.svg",
                renterName: "Bob Smith",
                startDate: "2023-11-08",
                endDate: "2023-11-22",
                status: "active",
                amount: 349.99
            },
            {
                id: "rent003",
                gadgetName: "Sony A7 IV Camera",
                gadgetImage: "/placeholder.svg",
                renterName: "Carol White",
                startDate: "2023-11-05",
                endDate: "2023-11-12",
                status: "returned",
                amount: 210.00
            },
            {
                id: "rent004",
                gadgetName: "DJI Mavic 3 Pro",
                gadgetImage: "/placeholder.svg",
                renterName: "David Brown",
                startDate: "2023-11-01",
                endDate: "2023-11-08",
                status: "returned",
                amount: 280.00
            }
        ],
        wishlist: [
            {
                id: "wish001",
                name: "Canon EOS R5",
                image: "/placeholder.svg",
                category: "Cameras",
                dailyRate: 45.99,
                availability: "available",
                rating: 4.9
            },
            {
                id: "wish002",
                name: "Steam Deck",
                image: "/placeholder.svg",
                category: "Gaming",
                dailyRate: 18.50,
                availability: "unavailable",
                rating: 4.7
            }
        ],
        recentMessages: [
            {
                id: "msg001",
                sender: "Support Team",
                avatar: "/placeholder.svg",
                message: "Your inquiry about the rental extension has been processed.",
                time: "2 hours ago",
                read: false
            },
            {
                id: "msg002",
                sender: "Alice Johnson",
                avatar: "/placeholder.svg",
                message: "I'd like to know if the MacBook is available next week?",
                time: "Yesterday",
                read: true
            }
        ],
        popularCategories: [
            { name: "Smartphones", count: 85, icon: <FaMobileAlt /> },
            { name: "Laptops", count: 64, icon: <FaLaptop /> },
            { name: "Tablets", count: 42, icon: <FaTabletAlt /> },
            { name: "Headphones", count: 38, icon: <FaHeadphones /> },
            { name: "Cameras", count: 35, icon: <FaCamera /> },
            { name: "Gaming", count: 30, icon: <FaGamepad /> }
        ],
        notifications: [
            {
                id: "notif001",
                type: "rental",
                message: "Your rental request for iPad Pro has been confirmed",
                time: "10 minutes ago"
            },
            {
                id: "notif002",
                type: "return",
                message: "Return reminder: Your Sony camera is due tomorrow",
                time: "2 hours ago"
            },
            {
                id: "notif003",
                type: "payment",
                message: "Payment of $175.50 was processed for your rental",
                time: "Yesterday"
            }
        ]
    });

    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    // Toggle submenu
    const toggleSubMenu = (menu) => {
        if (activeSubMenu === menu) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(menu);
        }
    };

    // Handle search
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Toggle filter panel
    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    // Toggle notifications panel
    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
    };

    // Change date range for analytics
    const handleDateRangeChange = (range) => {
        setDateRange(range);
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return darkMode ? 'text-green-400' : 'text-green-600';
            case 'returned':
                return darkMode ? 'text-blue-400' : 'text-blue-600';
            case 'pending':
                return darkMode ? 'text-yellow-400' : 'text-yellow-600';
            case 'cancelled':
                return darkMode ? 'text-red-400' : 'text-red-600';
            default:
                return darkMode ? 'text-gray-400' : 'text-gray-600';
        }
    };

    // Get availability color
    const getAvailabilityColor = (availability) => {
        return availability === 'available'
            ? (darkMode ? 'text-green-400' : 'text-green-600')
            : (darkMode ? 'text-red-400' : 'text-red-600');
    };

    // Get category icon
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Smartphones':
                return <FaMobileAlt className="text-blue-500" />;
            case 'Laptops':
                return <FaLaptop className="text-purple-500" />;
            case 'Tablets':
                return <FaTabletAlt className="text-green-500" />;
            case 'Headphones':
                return <FaHeadphones className="text-cyan-500" />;
            case 'Cameras':
                return <FaCamera className="text-red-500" />;
            case 'Gaming':
                return <FaGamepad className="text-indigo-500" />;
            default:
                return <FiPackage className="text-gray-500" />;
        }
    };

    // Render loading skeleton
    const renderSkeleton = () => (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`h-4 w-1/3 mb-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                        <div className={`h-8 w-1/2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                    </div>
                ))}
            </div>

            <div className={`rounded-xl mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-700">
                    <div className={`h-6 w-1/4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                </div>
                <div className="p-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center mb-4">
                            <div className={`h-12 w-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                            <div className="ml-4 flex-1">
                                <div className={`h-4 w-1/3 mb-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                                <div className={`h-3 w-3/4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Render admin dashboard content
    const renderAdminDashboard = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className={`rounded-xl p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Users</p>
                                        <h3 className="text-2xl font-bold mt-1">{dashboardData.stats.totalUsers}</h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                                        <FiUsers className="text-blue-500" size={24} />
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FiTrendingUp className="text-green-500 mr-1" size={16} />
                                    <span className="text-sm text-green-500">+12% this month</span>
                                </div>
                            </div>

                            <div className={`rounded-xl p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Rentals</p>
                                        <h3 className="text-2xl font-bold mt-1">{dashboardData.stats.activeRentals}</h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
                                        <FiShoppingCart className="text-green-500" size={24} />
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FiTrendingUp className="text-green-500 mr-1" size={16} />
                                    <span className="text-sm text-green-500">+5% this week</span>
                                </div>
                            </div>

                            <div className={`rounded-xl p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Gadgets</p>
                                        <h3 className="text-2xl font-bold mt-1">{dashboardData.stats.totalGadgets}</h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-100'}`}>
                                        <FiPackage className="text-purple-500" size={24} />
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FiTrendingUp className="text-green-500 mr-1" size={16} />
                                    <span className="text-sm text-green-500">+8% this month</span>
                                </div>
                            </div>

                            <div className={`rounded-xl p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Revenue</p>
                                        <h3 className="text-2xl font-bold mt-1">{formatCurrency(dashboardData.stats.totalRevenue)}</h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-amber-900/20' : 'bg-amber-100'}`}>
                                        <FiDollarSign className="text-amber-500" size={24} />
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <FiTrendingUp className="text-green-500 mr-1" size={16} />
                                    <span className="text-sm text-green-500">+15% this month</span>
                                </div>
                            </div>
                        </div>

                        {/* Revenue Chart */}
                        <div className={`rounded-xl p-6 mb-8 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold">Revenue Overview</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDateRangeChange('week')}
                                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                            dateRange === 'week'
                                                ? darkMode
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-600 text-white'
                                                : darkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Week
                                    </button>
                                    <button
                                        onClick={() => handleDateRangeChange('month')}
                                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                            dateRange === 'month'
                                                ? darkMode
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-600 text-white'
                                                : darkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Month
                                    </button>
                                    <button
                                        onClick={() => handleDateRangeChange('year')}
                                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                            dateRange === 'year'
                                                ? darkMode
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-600 text-white'
                                                : darkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Year
                                    </button>
                                </div>
                            </div>

                            <div className="h-64 flex items-end space-x-2">
                                {dashboardData.earnings?.monthly?.map((value, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className={`w-full rounded-t-sm transition-all ${
                                                darkMode ? 'bg-blue-500/70 hover:bg-blue-500' : 'bg-blue-500/80 hover:bg-blue-600'
                                            }`}
                                            style={{ height: `${(value / 2500) * 100}%` }}
                                        ></div>
                                        <span className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Rentals and Popular Categories */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                            <div className={`lg:col-span-2 rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">Recent Rentals</h3>
                                    <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                                        View All
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                        <tr className={darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gadget</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Renter</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dates</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                        {dashboardData.recentRentals.map((rental) => (
                                            <tr key={rental.id} className={`transition-colors hover:${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img className="h-10 w-10 rounded-lg object-cover" src={rental.gadgetImage || "/placeholder.svg"} alt={rental.gadgetName} />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium">{rental.gadgetName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm">{rental.renterName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm">{formatDate(rental.startDate)}</div>
                                                    <div className="text-sm text-gray-500">to {formatDate(rental.endDate)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium">{formatCurrency(rental.amount)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                rental.status === 'active'
                                    ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                                    : rental.status === 'returned'
                                        ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                        : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                            </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">Popular Categories</h3>
                                </div>
                                <div className="p-6">
                                    {dashboardData.popularCategories.map((category, index) => (
                                        <div key={index} className={`flex items-center justify-between mb-4 ${
                                            index !== dashboardData.popularCategories.length - 1 ? 'pb-4 border-b border-gray-700' : ''
                                        }`}>
                                            <div className="flex items-center">
                                                <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                    {category.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{category.name}</div>
                                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {category.count} gadgets
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`text-sm font-medium ${
                                                index === 0
                                                    ? 'text-blue-500'
                                                    : index === 1
                                                        ? 'text-purple-500'
                                                        : index === 2
                                                            ? 'text-green-500'
                                                            : darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                {Math.round((category.count / dashboardData.stats.totalGadgets) * 100)}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pending Returns and New Messages */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">Pending Returns</h3>
                                    <div className={`px-2 py-1 text-sm rounded-full ${
                                        darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                        {dashboardData.stats.pendingReturns} pending
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-center items-center h-40">
                                        <div className="text-center">
                                            <FiClipboard className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={32} />
                                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Detailed return information will appear here
                                            </p>
                                            <button className={`mt-3 text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                                                View all returns
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">New Messages</h3>
                                    <div className={`px-2 py-1 text-sm rounded-full ${
                                        darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {dashboardData.stats.newMessages} new
                                    </div>
                                </div>
                                <div className="p-6">
                                    {dashboardData.recentMessages.map((message) => (
                                        <div key={message.id} className={`flex items-start mb-4 ${
                                            !message.read ? (darkMode ? 'bg-gray-700/50 -mx-4 p-4 rounded-lg' : 'bg-blue-50 -mx-4 p-4 rounded-lg') : ''
                                        }`}>
                                            <img src={message.avatar || "/placeholder.svg"} alt={message.sender} className="w-10 h-10 rounded-full mr-3" />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium">{message.sender}</h4>
                                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{message.time}</span>
                                                </div>
                                                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className={`w-full mt-2 text-center py-2 rounded-lg text-sm transition-colors ${
                                        darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-gray-100'
                                    }`}>
                                        View all messages
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'users':
                return (
                    <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-lg font-bold">User Management</h3>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Manage all users of the GadgetSwap platform
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <FiUsers className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={48} />
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        User management interface will be implemented here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'gadgets':
                return (
                    <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-lg font-bold">Gadget Management</h3>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Manage all gadgets listed on the platform
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <FiPackage className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={48} />
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Gadget management interface will be implemented here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'rentals':
                return (
                    <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-lg font-bold">Rental Management</h3>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Manage all rental transactions on the platform
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <FiShoppingCart className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={48} />
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Rental management interface will be implemented here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-lg font-bold">Platform Settings</h3>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Configure platform-wide settings and preferences
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <FiSettings className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={48} />
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Platform settings interface will be implemented here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex justify-center items-center h-64">
                        <p>Select a tab from the sidebar to view content</p>
                    </div>
                );
        }
    };

    // Render user dashboard content
    const renderUserDashboard = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div>
                        {/* Welcome Banner */}
                        <div className={`rounded-xl p-6 mb-8 bg-gradient-to-r ${
                            darkMode ? 'from-blue-900/50 to-purple-900/50' : 'from-blue-500 to-purple-600'
                        }`}>
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className={darkMode ? 'text-white' : 'text-white'}>
                                    <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                                    <p className="opacity-90">Here's what's happening with your account today.</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <button className={`px-4 py-2 rounded-lg transition-colors ${
                                        darkMode
                                            ? 'bg-white/10 hover:bg-white/20 text-white'
                                            : 'bg-white/20 hover:bg-white/30 text-white'
                                    }`}>
                    <span className="flex items-center">
                      <FiSearch className="mr-2" />
                      Browse Gadgets
                    </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            <div className={`rounded-xl p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Rentals</p>
                                        <h3 className="text-2xl font-bold mt-1">2</h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
                                        <FiShoppingCart className="text-green-500" size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className={`rounded-xl p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wishlist Items</p>
                                        <h3 className="text-2xl font-bold mt-1">{dashboardData.wishlist.length}</h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-pink-900/20' : 'bg-pink-100'}`}>
                                        <FiHeart className="text-pink-500" size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className={`rounded-xl p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loyalty Points</p>
                                        <h3 className="text-2xl font-bold mt-1">{user.loyaltyPoints}</h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                                        <FiGift className="text-blue-500" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Rentals and Wishlist */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                            <div className={`lg:col-span-2 rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">Recent Rentals</h3>
                                    <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                                        View All
                                    </button>
                                </div>
                                <div className="p-6">
                                    {dashboardData.recentRentals.slice(0, 2).map((rental) => (
                                        <div key={rental.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-4 rounded-lg ${
                                            darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                        }`}>
                                            <div className="flex items-center mb-4 sm:mb-0">
                                                <img src={rental.gadgetImage || "/placeholder.svg"} alt={rental.gadgetName} className="w-16 h-16 rounded-lg object-cover" />
                                                <div className="ml-4">
                                                    <h4 className="font-medium">{rental.gadgetName}</h4>
                                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="font-medium">{formatCurrency(rental.amount)}</div>
                                                <span className={`px-2 py-1 text-xs rounded-full mt-1 ${
                                                    rental.status === 'active'
                                                        ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                                                        : rental.status === 'returned'
                                                            ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                                                }`}>
                          {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                        </span>
                                            </div>
                                        </div>
                                    ))}
                                    {dashboardData.recentRentals.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <FiShoppingCart className={`mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No recent rentals</p>
                                            <button className={`mt-3 px-4 py-2 rounded-lg text-sm ${
                                                darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}>
                                                Browse Gadgets
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">Wishlist</h3>
                                    <div className={`px-2 py-1 text-xs rounded-full ${
                                        darkMode ? 'bg-pink-900/30 text-pink-400' : 'bg-pink-100 text-pink-800'
                                    }`}>
                                        {dashboardData.wishlist.length} items
                                    </div>
                                </div>
                                <div className="p-6">
                                    {dashboardData.wishlist.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                                <div className="ml-3">
                                                    <h4 className="font-medium">{item.name}</h4>
                                                    <div className="flex items-center mt-1">
                            <span className={`text-xs ${getAvailabilityColor(item.availability)}`}>
                              {item.availability.charAt(0).toUpperCase() + item.availability.slice(1)}
                            </span>
                                                        <span className="mx-2 text-xs">•</span>
                                                        <span className="text-xs">{formatCurrency(item.dailyRate)}/day</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={`p-2 rounded-full transition-colors ${
                                                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                                            }`}>
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                    {dashboardData.wishlist.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <FiHeart className={`mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your wishlist is empty</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Messages and Notifications */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">Recent Messages</h3>
                                    <div className={`px-2 py-1 text-xs rounded-full ${
                                        darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {dashboardData.recentMessages.filter(m => !m.read).length} new
                                    </div>
                                </div>
                                <div className="p-6">
                                    {dashboardData.recentMessages.map((message) => (
                                        <div key={message.id} className={`flex items-start mb-4 ${
                                            !message.read ? (darkMode ? 'bg-gray-700/50 -mx-4 p-4 rounded-lg' : 'bg-blue-50 -mx-4 p-4 rounded-lg') : ''
                                        }`}>
                                            <img src={message.avatar || "/placeholder.svg"} alt={message.sender} className="w-10 h-10 rounded-full mr-3" />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium">{message.sender}</h4>
                                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{message.time}</span>
                                                </div>
                                                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {dashboardData.recentMessages.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <FiMessageSquare className={`mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No messages yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold">Notifications</h3>
                                    <div className={`px-2 py-1 text-xs rounded-full ${
                                        darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                        {dashboardData.notifications.length} new
                                    </div>
                                </div>
                                <div className="p-6">
                                    {dashboardData.notifications.map((notification) => (
                                        <div key={notification.id} className="flex items-start mb-4">
                                            <div className={`p-2 rounded-lg mr-3 ${
                                                notification.type === 'rental'
                                                    ? darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                                                    : notification.type === 'return'
                                                        ? darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                                        : darkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                                {notification.type === 'rental' && <FiPackage size={20} />}
                                                {notification.type === 'return' && <FiTruck size={20} />}
                                                {notification.type === 'payment' && <FiDollarSign size={20} />}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{notification.message}</p>
                                                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {dashboardData.notifications.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <FiBell className={`mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No notifications</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'rentals':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">My Rentals</h2>
                            <div className="flex space-x-2">
                                <button className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                    darkMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-600 text-white'
                                }`}>
                                    Active
                                </button>
                                <button className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                    darkMode
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}>
                                    Past
                                </button>
                            </div>
                        </div>

                        <div className={`rounded-xl overflow-hidden transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                            <div className="p-6 border-b border-gray-700">
                                <h3 className="text-lg font-bold">Active Rentals</h3>
                                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Gadgets you are currently renting
                                </p>
                            </div>

                            <div className="p-6">
                                {dashboardData.recentRentals.filter(rental => rental.status === 'active').map((rental) => (
                                    <div key={rental.id} className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 mb-4 rounded-lg ${
                                        darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                    }`}>
                                        <div className="flex items-center mb-4 md:mb-0">
                                            <img src={rental.gadgetImage || "/placeholder.svg"} alt={rental.gadgetName} className="w-16 h-16 rounded-lg object-cover" />
                                            <div className="ml-4">
                                                <h4 className="font-medium">{rental.gadgetName}</h4>
                                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <div className="flex flex-col items-start md:items-end">
                                                <div className="font-medium">{formatCurrency(rental.amount)}</div>
                                                <span className={`px-2 py-1 text-xs rounded-full mt-1 ${
                                                    rental.status === 'active'
                                                        ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                                                        : rental.status === 'returned'
                                                            ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                                                }`}>
                          {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                        </span>
                                            </div>
                                            <button className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                                darkMode
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}>
                                                Extend Rental
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {dashboardData.recentRentals.filter(rental => rental.status === 'active').length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <FiShoppingCart className={`mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No active rentals</p>
                                        <button className={`mt-3 px-4 py-2 rounded-lg text-sm ${
                                            darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}>
                                            Browse Gadgets
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'wishlist':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">My Wishlist</h2>
                            <button className={`px-4 py-2 rounded-lg transition-colors ${
                                darkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}>
                <span className="flex items-center">
                  <FiRefreshCw className="mr-2" />
                  Refresh
                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dashboardData.wishlist.map((item) => (
                                <div key={item.id} className={`rounded-xl overflow-hidden transition-colors ${
                                    darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50 shadow-sm'
                                }`}>
                                    <div className="relative h-48">
                                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-3 right-3">
                                            <button className={`p-2 rounded-full ${
                                                darkMode ? 'bg-gray-900/70 text-white' : 'bg-white/70 text-gray-700'
                                            }`}>
                                                <FiHeart className="text-red-500 fill-current" size={20} />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                          item.availability === 'available'
                              ? darkMode ? 'bg-green-900/70 text-green-400' : 'bg-green-100 text-green-800'
                              : darkMode ? 'bg-red-900/70 text-red-400' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.availability.charAt(0).toUpperCase() + item.availability.slice(1)}
                      </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center mb-2">
                                            <span className="mr-2">{getCategoryIcon(item.category)}</span>
                                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.category}</span>
                                        </div>
                                        <h3 className="font-medium mb-2">{item.name}</h3>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <FiStar className="text-yellow-500 mr-1" size={16} />
                                                <span className="text-sm">{item.rating}</span>
                                            </div>
                                            <div className="font-bold">{formatCurrency(item.dailyRate)}<span className="text-xs font-normal">/day</span></div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <button className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                                item.availability === 'available'
                                                    ? darkMode
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : darkMode
                                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`} disabled={item.availability !== 'available'}>
                                                Rent Now
                                            </button>
                                            <button className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                                darkMode
                                                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                            }`}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {dashboardData.wishlist.length === 0 && (
                            <div className={`rounded-xl p-8 text-center transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                                <FiHeart className={`mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                                <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Save gadgets you're interested in renting for later
                                </p>
                                <button className={`px-4 py-2 rounded-lg transition-colors ${
                                    darkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}>
                                    Browse Gadgets
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 'messages':
                return (
                    <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-lg font-bold">Messages</h3>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Your conversations with support and rental inquiries
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <FiMessageSquare className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={48} />
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Messaging interface will be implemented here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-lg font-bold">Account Settings</h3>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Manage your profile and preferences
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <FiSettings className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={48} />
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Settings interface will be implemented here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex justify-center items-center h-64">
                        <p>Select a tab from the sidebar to view content</p>
                    </div>
                );
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className={`absolute inset-0 bg-black opacity-50`} onClick={toggleMobileMenu}></div>
                    <div className={`absolute left-0 top-0 bottom-0 w-3/4 max-w-xs p-4 overflow-y-auto transition-transform transform ${
                        darkMode ? "bg-gray-800" : "bg-white"
                    }`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">GadgetSwap</h2>
                            <button
                                onClick={toggleMobileMenu}
                                className={`p-2 rounded-full ${
                                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                }`}
                                aria-label="Close menu"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <h3 className="font-medium">{user.name}</h3>
                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{user.role}</p>
                                </div>
                            </div>
                        </div>

                        <nav>
                            <ul className="space-y-2">
                                {user.role === 'admin' ? (
                                    // Admin Navigation
                                    <>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("overview")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "overview"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiHome className="mr-3" size={20} />
                                                <span>Dashboard</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("users")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "users"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiUsers className="mr-3" size={20} />
                                                <span>Users</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("gadgets")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "gadgets"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiPackage className="mr-3" size={20} />
                                                <span>Gadgets</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("rentals")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "rentals"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiShoppingCart className="mr-3" size={20} />
                                                <span>Rentals</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("settings")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "settings"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiSettings className="mr-3" size={20} />
                                                <span>Settings</span>
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    // User Navigation
                                    <>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("overview")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "overview"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiHome className="mr-3" size={20} />
                                                <span>Dashboard</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("rentals")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "rentals"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiShoppingCart className="mr-3" size={20} />
                                                <span>My Rentals</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("wishlist")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "wishlist"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiHeart className="mr-3" size={20} />
                                                <span>Wishlist</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("messages")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "messages"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiMessageSquare className="mr-3" size={20} />
                                                <span>Messages</span>
                                                {dashboardData.recentMessages.filter(m => !m.read).length > 0 && (
                                                    <span className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                                                        darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"
                                                    }`}>
                            {dashboardData.recentMessages.filter(m => !m.read).length}
                          </span>
                                                )}
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleTabChange("settings")}
                                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                    activeTab === "settings"
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiSettings className="mr-3" size={20} />
                                                <span>Settings</span>
                                            </button>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <button
                                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                            darkMode
                                                ? "hover:bg-gray-700 text-gray-400"
                                                : "hover:bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        <FiLogOut className="mr-3" size={20} />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors duration-300 ${
                darkMode
                    ? "bg-gray-900/90 border-gray-800 text-white"
                    : "bg-white/80 border-gray-200 text-gray-900"
            }`}>
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className={`mr-4 p-2 rounded-full lg:hidden transition-colors ${
                                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                            }`}
                            aria-label="Open menu"
                        >
                            <FiMenu size={20} />
                        </button>
                        <h1 className="text-xl font-bold">GadgetSwap Dashboard</h1>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <button
                                onClick={toggleNotifications}
                                className={`p-2 rounded-full transition-colors ${
                                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                                } ${notificationsOpen ? (darkMode ? "bg-gray-800" : "bg-gray-100") : ""}`}
                                aria-label="Notifications"
                            >
                                <FiBell size={20} />
                                {dashboardData.notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
                                )}
                            </button>

                            {notificationsOpen && (
                                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden z-50 ${
                                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                                }`}>
                                    <div className="p-4 border-b border-gray-700">
                                        <h3 className="font-bold">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {dashboardData.notifications.length > 0 ? (
                                            dashboardData.notifications.map((notification) => (
                                                <div key={notification.id} className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                    <div className="flex items-start">
                                                        <div className={`p-2 rounded-lg mr-3 ${
                                                            notification.type === 'rental'
                                                                ? darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                                                                : notification.type === 'return'
                                                                    ? darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                                                    : darkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                                                        }`}>
                                                            {notification.type === 'rental' && <FiPackage size={20} />}
                                                            {notification.type === 'return' && <FiTruck size={20} />}
                                                            {notification.type === 'payment' && <FiDollarSign size={20} />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{notification.message}</p>
                                                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center">
                                                <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>No notifications</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2 border-t border-gray-700">
                                        <button className={`w-full p-2 text-center text-sm rounded-lg transition-colors ${
                                            darkMode ? "hover:bg-gray-700 text-blue-400" : "hover:bg-gray-100 text-blue-600"
                                        }`}>
                                            Mark all as read
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className={`flex items-center p-1 rounded-full transition-colors ${
                                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                                }`}
                                aria-label="User menu"
                            >
                                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                                <span className="hidden md:block ml-2">{user.name}</span>
                                <FiChevronDown className="ml-1" size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 pt-32">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className={`sticky top-32 rounded-xl p-4 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <h3 className="font-medium">{user.name}</h3>
                                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{user.role}</p>
                                    </div>
                                </div>
                            </div>

                            <nav>
                                <ul className="space-y-1">
                                    {user.role === 'admin' ? (
                                        // Admin Navigation
                                        <>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("overview")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "overview"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiHome className="mr-3" size={20} />
                                                    <span>Dashboard</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("users")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "users"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiUsers className="mr-3" size={20} />
                                                    <span>Users</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("gadgets")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "gadgets"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiPackage className="mr-3" size={20} />
                                                    <span>Gadgets</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("rentals")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "rentals"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiShoppingCart className="mr-3" size={20} />
                                                    <span>Rentals</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("settings")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "settings"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiSettings className="mr-3" size={20} />
                                                    <span>Settings</span>
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        // User Navigation
                                        <>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("overview")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "overview"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiHome className="mr-3" size={20} />
                                                    <span>Dashboard</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("rentals")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "rentals"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiShoppingCart className="mr-3" size={20} />
                                                    <span>My Rentals</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("wishlist")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "wishlist"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiHeart className="mr-3" size={20} />
                                                    <span>Wishlist</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("messages")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "messages"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiMessageSquare className="mr-3" size={20} />
                                                    <span>Messages</span>
                                                    {dashboardData.recentMessages.filter(m => !m.read).length > 0 && (
                                                        <span className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                                                            darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"
                                                        }`}>
                              {dashboardData.recentMessages.filter(m => !m.read).length}
                            </span>
                                                    )}
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleTabChange("settings")}
                                                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                        activeTab === "settings"
                                                            ? darkMode
                                                                ? "bg-blue-900/30 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                                ? "hover:bg-gray-700"
                                                                : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <FiSettings className="mr-3" size={20} />
                                                    <span>Settings</span>
                                                </button>
                                            </li>
                                        </>
                                    )}
                                    <li>
                                        <button
                                            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                darkMode
                                                    ? "hover:bg-gray-700 text-gray-400"
                                                    : "hover:bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <FiLogOut className="mr-3" size={20} />
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>

                            <div className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
                                <div className="flex items-start">
                                    <FiHelpCircle className={`mt-1 mr-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`} size={20} />
                                    <div>
                                        <h4 className="font-medium text-sm">Need Help?</h4>
                                        <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Contact our support team for assistance
                                        </p>
                                        <button className={`mt-2 text-xs ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                            Get Support
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {isLoading ? (
                            renderSkeleton()
                        ) : (
                            user.role === 'admin' ? renderAdminDashboard() : renderUserDashboard()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;