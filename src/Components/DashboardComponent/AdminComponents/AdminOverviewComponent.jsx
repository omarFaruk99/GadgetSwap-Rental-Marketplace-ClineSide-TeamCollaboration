import React, {useState} from 'react';
import {FiClipboard, FiDollarSign, FiPackage, FiShoppingCart, FiTrendingUp, FiUsers} from "react-icons/fi";
import {useSelector} from "react-redux";
import {FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt} from "react-icons/fa";


const AdminOverviewComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [dateRange, setDateRange] = useState("week");


    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };


    // Change date range for analytics
    const handleDateRangeChange = (range) => {
        setDateRange(range);
    };


    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


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
};

export default AdminOverviewComponent;
