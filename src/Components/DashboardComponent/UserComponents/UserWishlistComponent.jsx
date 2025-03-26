import React, {useState} from 'react';
import {FiHeart, FiPackage, FiRefreshCw, FiStar} from "react-icons/fi";
import {useSelector} from "react-redux";
import {FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt} from "react-icons/fa";

const UserWishlistComponent = () => {


    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark);


    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
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
};

export default UserWishlistComponent;
