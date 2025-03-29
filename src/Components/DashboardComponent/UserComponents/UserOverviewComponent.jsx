import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {
    FiShoppingCart,
    FiHeart,
    FiAward,
    FiCalendar,
    FiPackage,
    FiMessageSquare,
    FiBell,
    FiChevronRight,
    FiUser,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiTag,
    FiAlertCircle,
    FiCheckCircle,
    FiInfo,
    FiSearch,
} from "react-icons/fi"
import {
    FaCamera,
    FaGamepad,
    FaHeadphones,
    FaLaptop,
    FaMobileAlt,
    FaTabletAlt,
    FaWifi,
    FaVrCardboard,
} from "react-icons/fa"


const UserOverviewComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobileView, setIsMobileView] = useState(false)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    // const navigateTo = useNavigate();


    // Fake user data
    const [userData, setUserData] = useState({
        id: "usr_123456",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        profileImage: "/placeholder.svg",
        membershipTier: "Silver",
        points: 2750,
        memberSince: "January 2023",
        stats: {
            activeRentals: 3,
            pastRentals: 12,
            wishlistedItems: 5,
            totalSpent: 1245.5,
            pointsEarned: 2750,
            reviewsGiven: 8,
        },
        recentRentals: [
            {
                id: "ORD-2023-001",
                gadgetName: "iPhone 15 Pro Max",
                gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
                category: "Smartphones",
                startDate: "2023-11-10",
                endDate: "2023-11-17",
                status: "active",
                amount: 175.5,
            },
            {
                id: "ORD-2023-002",
                gadgetName: 'MacBook Pro 16"',
                gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
                category: "Laptops",
                startDate: "2023-11-08",
                endDate: "2023-11-22",
                status: "active",
                amount: 349.99,
            },
        ],
        wishlist: [
            {
                id: "gadget001",
                name: "Sony A7 IV Camera",
                image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
                category: "Cameras",
                dailyRate: 39.99,
                availability: "available",
            },
            {
                id: "gadget002",
                name: "DJI Mavic 3 Pro",
                image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
                category: "Drones",
                dailyRate: 59.99,
                availability: "available",
            },
            {
                id: "gadget003",
                name: "Oculus Quest 3",
                image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
                category: "VR",
                dailyRate: 29.99,
                availability: "unavailable",
            },
        ],
        loyaltyProgress: 55, // Percentage to next tier
        nextTier: "Gold",
        pointsToNextTier: 2250,
        notifications: [
            {
                id: "notif001",
                type: "rental",
                message: "Your rental for iPhone 15 Pro Max has been confirmed",
                time: "10 minutes ago",
                isRead: false,
            },
            {
                id: "notif002",
                type: "return",
                message: "Return reminder: Your MacBook Pro is due in 3 days",
                time: "2 hours ago",
                isRead: false,
            },
            {
                id: "notif003",
                type: "loyalty",
                message: "Congratulations! You've earned 150 points from your recent rental",
                time: "Yesterday",
                isRead: true,
            },
            {
                id: "notif004",
                type: "promo",
                message: "Special weekend offer: 15% off on all camera rentals",
                time: "2 days ago",
                isRead: true,
            },
        ],
        recentActivity: [
            {
                id: "act001",
                type: "rental",
                description: "Rented iPhone 15 Pro Max",
                date: "2023-11-10",
                pointsEarned: 150,
            },
            {
                id: "act002",
                type: "review",
                description: "Reviewed Sony A7 IV Camera",
                date: "2023-11-05",
                pointsEarned: 50,
            },
            {
                id: "act003",
                type: "referral",
                description: "Referred Sarah Williams",
                date: "2023-10-28",
                pointsEarned: 200,
            },
        ],
    })


    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount)
    }


    // Format date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString("en-US", options)
    }


    // Get category icon
    const getCategoryIcon = (category) => {
        switch (category) {
            case "Smartphones":
                return <FaMobileAlt className="text-blue-500" />
            case "Laptops":
                return <FaLaptop className="text-purple-500" />
            case "Tablets":
                return <FaTabletAlt className="text-green-500" />
            case "Headphones":
                return <FaHeadphones className="text-cyan-500" />
            case "Cameras":
                return <FaCamera className="text-red-500" />
            case "Gaming":
                return <FaGamepad className="text-indigo-500" />
            case "Drones":
                return <FaWifi className="text-orange-500" />
            case "VR":
                return <FaVrCardboard className="text-pink-500" />
            default:
                return <FiPackage className="text-gray-500" />
        }
    }


    // Get notification icon
    const getNotificationIcon = (type) => {
        switch (type) {
            case "rental":
                return <FiShoppingCart className="text-blue-500" />
            case "return":
                return <FiCalendar className="text-amber-500" />
            case "loyalty":
                return <FiAward className="text-purple-500" />
            case "promo":
                return <FiTag className="text-green-500" />
            case "alert":
                return <FiAlertCircle className="text-red-500" />
            case "success":
                return <FiCheckCircle className="text-green-500" />
            default:
                return <FiInfo className="text-gray-500" />
        }
    }


    // Get membership tier color
    const getMembershipColor = (tier) => {
        switch (tier) {
            case "Bronze":
                return "text-amber-700"
            case "Silver":
                return "text-gray-400"
            case "Gold":
                return "text-yellow-500"
            case "Platinum":
                return "text-indigo-500"
            default:
                return "text-gray-500"
        }
    }


    // Navigate to different sections
    const navigateTo = (path) => {
        console.log(`Navigating to: ${path}`)
        // In a real app, this would use router navigation
        // window.location.href = path
    }


    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }


    // Check for mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1024)
        }

        handleResize() // Initial check
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])


    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good morning"
        if (hour < 18) return "Good afternoon"
        return "Good evening"
    }


    // Count unread notifications
    const unreadNotificationsCount = userData.notifications.filter((notif) => !notif.isRead).length


    // Toggle notifications dropdown
    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen)
    }


    // Mark notification as read
    const markNotificationAsRead = (id) => {
        setUserData((prevData) => ({
            ...prevData,
            notifications: prevData.notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)),
        }))
    }


    // Mark all notifications as read
    const markAllNotificationsAsRead = () => {
        setUserData((prevData) => ({
            ...prevData,
            notifications: prevData.notifications.map((notif) => ({ ...notif, isRead: true })),
        }))
    }


    return (
        <div
            className={`w-full mx-auto rounded-xl ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
        >
            {/* Header with mobile menu button */}
            <div className="flex justify-end items-center">
                {isMobileView && (
                    <button
                        onClick={toggleMobileMenu}
                        className={`p-2 rounded-lg ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"} cursor-pointer`}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                )}
            </div>

            {/* Welcome, Banner */}
            <div
                className={`rounded-xl p-6 mb-4 bg-gradient-to-r ${
                    darkMode ? "from-blue-900/50 to-purple-900/50" : "from-blue-500 to-purple-600"
                }`}
            >
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-white">
                        <h2 className="text-2xl font-bold mb-2">
                            {getGreeting()}, {userData.name}!
                        </h2>
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
                                <FiBell size={20} className="text-white" />
                                {unreadNotificationsCount > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
                                )}
                            </button>

                            {notificationsOpen && (
                                <div
                                    className={`absolute -right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden z-50 ${
                                        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                                    }`}
                                >
                                    <div className="p-4 border-b border-gray-700">
                                        <h3 className="font-bold">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {userData.notifications.length > 0 ? (
                                            userData.notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-4 border-b cursor-pointer ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                                                    onClick={() => markNotificationAsRead(notification.id)}
                                                >
                                                    <div className="flex items-start">
                                                        <div
                                                            className={`p-2 rounded-lg mr-3 ${
                                                                notification.type === "rental"
                                                                    ? darkMode
                                                                        ? "bg-green-900/20 text-green-400"
                                                                        : "bg-green-100 text-green-600"
                                                                    : notification.type === "return"
                                                                        ? darkMode
                                                                            ? "bg-blue-900/20 text-blue-400"
                                                                            : "bg-blue-100 text-blue-600"
                                                                        : darkMode
                                                                            ? "bg-amber-900/20 text-amber-400"
                                                                            : "bg-amber-100 text-amber-600"
                                                            }`}
                                                        >
                                                            {getNotificationIcon(notification.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p
                                                                className={`text-sm ${!notification.isRead ? "font-medium" : darkMode ? "text-gray-300" : "text-gray-600"}`}
                                                            >
                                                                {notification.message}
                                                            </p>
                                                            <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                {notification.time}
                                                            </span>
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
                                        <button
                                            onClick={markAllNotificationsAsRead}
                                            className={`w-full p-2 text-center text-sm rounded-lg transition-colors cursor-pointer ${
                                                darkMode ? "hover:bg-gray-700 text-blue-400" : "hover:bg-gray-100 text-blue-600"
                                            }`}
                                        >
                                            Mark all as read
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => navigateTo("/all-gadgets")}
                            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                                darkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white/20 hover:bg-white/30 text-white"
                            }`}
                        >
                            <div className="flex items-center">
                                <FiSearch className="mr-2" />
                                Browse Gadgets
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileView && isMobileMenuOpen && (
                <div className={`mb-6 rounded-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
                    <div className="p-4 border-b border-gray-700 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src={userData.profileImage || "/placeholder.svg"}
                                    alt={userData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-medium">{userData.name}</div>
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{userData.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <button
                            onClick={() => navigateTo("/dashboard")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                            <FiUser size={18} className="text-blue-500" />
                            <span>Overview</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/my-rentals")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                            <FiShoppingCart size={18} className="text-green-500" />
                            <span>My Rentals</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/wishlist")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                            <FiHeart size={18} className="text-red-500" />
                            <span>Wishlist</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/loyalty")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                            <FiAward size={18} className="text-purple-500" />
                            <span>Loyalty & Rewards</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/messages")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                            <FiMessageSquare size={18} className="text-cyan-500" />
                            <span>Messages</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/settings")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                            <FiSettings size={18} className="text-gray-500" />
                            <span>Settings</span>
                        </button>
                    </div>
                    <div className="p-4 border-t border-gray-700 dark:border-gray-700">
                        <button
                            onClick={() => console.log("Logout")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                darkMode ? "hover:bg-gray-700 text-red-400" : "hover:bg-gray-100 text-red-500"
                            }`}
                        >
                            <FiLogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div
                            className={`p-4 rounded-xl ${
                                darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                                    <FiShoppingCart className="text-blue-500" size={20} />
                                </div>
                                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Active</span>
                            </div>
                            <div className="text-2xl font-bold">{userData.stats.activeRentals}</div>
                            <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Rentals</div>
                        </div>

                        <div
                            className={`p-4 rounded-xl ${
                                darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className={`p-2 rounded-lg ${darkMode ? "bg-red-900/20" : "bg-red-50"}`}>
                                    <FiHeart className="text-red-500" size={20} />
                                </div>
                                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Saved</span>
                            </div>
                            <div className="text-2xl font-bold">{userData.stats.wishlistedItems}</div>
                            <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Wishlist</div>
                        </div>

                        <div
                            className={`p-4 rounded-xl ${
                                darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className={`p-2 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}`}>
                                    <FiAward className="text-purple-500" size={20} />
                                </div>
                                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Rewards</span>
                            </div>
                            <div className="text-2xl font-bold">{userData.points.toLocaleString()}</div>
                            <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Points</div>
                        </div>
                    </div>

                    {/* Recent Rentals Section */}
                    <div
                        className={`rounded-xl overflow-hidden ${
                            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                        }`}
                    >
                        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold">Recent Rentals</h2>
                            <button
                                onClick={() => navigateTo("/my-rentals")}
                                className={`text-sm flex items-center cursor-pointer ${
                                    darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                }`}
                            >
                                View All <FiChevronRight size={16} className="ml-1" />
                            </button>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {userData.recentRentals.length > 0 ? (
                                userData.recentRentals.map((rental) => (
                                    <div key={rental.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={rental.gadgetImage || "/placeholder.svg"}
                                                    alt={rental.gadgetName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium truncate">{rental.gadgetName}</h3>
                                                    <span>{getCategoryIcon(rental.category)}</span>
                                                </div>
                                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">{formatCurrency(rental.amount)}</div>
                                                <span
                                                    className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                                        rental.status === "active"
                                                            ? darkMode
                                                                ? "bg-green-900/30 text-green-400"
                                                                : "bg-green-100 text-green-800"
                                                            : darkMode
                                                                ? "bg-gray-700 text-gray-300"
                                                                : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {rental.status === "active" ? "Active" : "Past"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <FiShoppingCart
                                        size={40}
                                        className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`}
                                    />
                                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No rentals yet</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => navigateTo("/all-gadgets")}
                                className={`w-full py-2 rounded-lg transition-colors cursor-pointer ${
                                    darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                Browse Gadgets
                            </button>
                        </div>
                    </div>

                    {/* Wishlist Preview */}
                    <div
                        className={`rounded-xl overflow-hidden ${
                            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                        }`}
                    >
                        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold">Wishlist</h2>
                            <button
                                onClick={() => navigateTo("/wishlist")}
                                className={`text-sm flex items-center cursor-pointer ${
                                    darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                }`}
                            >
                                View All <FiChevronRight size={16} className="ml-1" />
                            </button>
                        </div>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {userData.wishlist.length > 0 ? (
                                userData.wishlist.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`rounded-lg overflow-hidden border cursor-pointer ${
                                            darkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"
                                        } transition-colors`}
                                        onClick={() => navigateTo(`/all-gadgets/gadget-details/${item.id}`)}
                                    >
                                        <div className="h-32 overflow-hidden">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs flex items-center gap-1">
                                                    {getCategoryIcon(item.category)}
                                                    <span
                                                        className={darkMode ? "text-gray-400" : "text-gray-500"}>{item.category}</span>
                                                </span>
                                                <span
                                                    className={`text-xs ${
                                                        item.availability === "available"
                                                            ? darkMode
                                                                ? "text-green-400"
                                                                : "text-green-600"
                                                            : darkMode
                                                                ? "text-gray-400"
                                                                : "text-gray-500"
                                                    }`}
                                                >
                                                    {item.availability === "available" ? "Available" : "Unavailable"}
                                                </span>
                                            </div>
                                            <h3 className="font-medium text-sm truncate">{item.name}</h3>
                                            <div className="mt-1 font-bold text-sm">
                                                {formatCurrency(item.dailyRate)}
                                                <span className={`text-xs font-normal ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    /day
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 p-8 text-center">
                                    <FiHeart size={40} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
                                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Your wishlist is empty</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-6">

                    {/* User Profile Card */}
                    <div
                        className={`rounded-xl overflow-hidden ${
                            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                        }`}
                    >
                        <div className="p-4 text-center">
                            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-blue-500">
                                <img
                                    src={userData.profileImage || "/placeholder.svg"}
                                    alt={userData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold">{userData.name}</h2>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{userData.email}</p>

                            <div className="mt-4 flex items-center justify-center gap-2">
                                <FiAward className={`${getMembershipColor(userData.membershipTier)}`} size={18} />
                                <span className="font-medium">{userData.membershipTier} Member</span>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                        {userData.points.toLocaleString()} points
                                    </span>
                                    <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                        {userData.pointsToNextTier.toLocaleString()} to {userData.nextTier}
                                    </span>
                                </div>
                                <div className={`h-2 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                    <div
                                        className={`h-full rounded-full ${
                                            userData.membershipTier === "Bronze"
                                                ? "bg-amber-700"
                                                : userData.membershipTier === "Silver"
                                                    ? "bg-gray-400"
                                                    : userData.membershipTier === "Gold"
                                                        ? "bg-yellow-500"
                                                        : "bg-indigo-500"
                                        }`}
                                        style={{ width: `${userData.loyaltyProgress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => navigateTo("/settings")}
                                    className={`py-2 rounded-lg transition-colors ${
                                        darkMode
                                            ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    Settings
                                </button>
                                <button
                                    onClick={() => navigateTo("/loyalty")}
                                    className={`py-2 rounded-lg transition-colors ${
                                        darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                >
                                    View Rewards
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div
                        className={`rounded-xl overflow-hidden ${
                            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                        }`}
                    >
                        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                Notifications
                                {unreadNotificationsCount > 0 && (
                                    <span
                                        className={`inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full ${
                                            darkMode ? "bg-red-500 text-white" : "bg-red-500 text-white"
                                        }`}
                                    >
                                        {unreadNotificationsCount}
                                    </span>
                                )}
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
                            {userData.notifications.length > 0 ? (
                                userData.notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 ${
                                            !notification.isRead
                                                ? darkMode
                                                    ? "bg-gray-700/50"
                                                    : "bg-blue-50/50"
                                                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        } transition-colors`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                                            <div className="flex-1 min-w-0">
                                                <p
                                                    className={`text-sm ${
                                                        !notification.isRead ? "font-medium" : darkMode ? "text-gray-300" : "text-gray-700"
                                                    }`}
                                                >
                                                    {notification.message}
                                                </p>
                                                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <FiBell size={40} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
                                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No notifications</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOverviewComponent;
