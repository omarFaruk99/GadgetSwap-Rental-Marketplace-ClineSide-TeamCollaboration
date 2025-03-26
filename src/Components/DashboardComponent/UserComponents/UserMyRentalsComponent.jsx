import React, {useState} from 'react';
import {FiShoppingCart} from "react-icons/fi";
import {useSelector} from "react-redux";
import {FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt} from "react-icons/fa";


const UserMyRentalsComponent = () => {

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
};

export default UserMyRentalsComponent;
