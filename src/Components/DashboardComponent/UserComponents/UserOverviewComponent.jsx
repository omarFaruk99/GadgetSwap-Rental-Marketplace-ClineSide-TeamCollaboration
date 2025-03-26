import React, {useState} from 'react';
import {
    FiBell,
    FiDollarSign,
    FiGift,
    FiHeart, FiMessageSquare,
    FiPackage,
    FiSearch,
    FiShoppingCart,
    FiTrash2,
    FiTruck
} from "react-icons/fi";
import {useSelector} from "react-redux";
import {FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt} from "react-icons/fa";
import {Link} from "react-router-dom";


const UserOverviewComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [notificationsOpen, setNotificationsOpen] = useState(false);


    // Toggle notifications panel
    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
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


    // Get availability color
    const getAvailabilityColor = (availability) => {
        return availability === 'available'
            ? (darkMode ? 'text-green-400' : 'text-green-600')
            : (darkMode ? 'text-red-400' : 'text-red-600');
    };


    // Mock user data - in a real app, this would come from authentication
    const [user, setUser] = useState({
        id: "user123",
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg",
        // role: "admin",                    // Activate this line to see admin dashboard
        role: "user",                    // Activate this line to see user dashboard
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


    return (
        <div>
            {/* Welcome, Banner */}
            <div className={`rounded-xl p-6 mb-8 bg-gradient-to-r ${
                darkMode ? 'from-blue-900/50 to-purple-900/50' : 'from-blue-500 to-purple-600'
            }`}>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className={darkMode ? 'text-white' : 'text-white'}>
                        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                        <p className="opacity-90">Here's what's happening with your account today.</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-5">
                        <div className="relative">
                            <button
                                onClick={toggleNotifications}
                                className={`p-2 rounded-full border border-gray-400 cursor-pointer transition-colors ${
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
                                <div className={`absolute -right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden z-50 ${
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
                        <button className={`px-4 py-2 rounded-lg transition-colors ${
                            darkMode
                                ? 'bg-white/10 hover:bg-white/20 text-white'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}>
                            <Link
                                to={'/all-gadgets'}
                                className="flex items-center">
                                <FiSearch className="mr-2"/>
                                Browse Gadgets
                            </Link>
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
};

export default UserOverviewComponent;
