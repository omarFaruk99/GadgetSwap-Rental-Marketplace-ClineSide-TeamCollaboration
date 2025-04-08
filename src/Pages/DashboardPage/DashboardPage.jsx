import React, { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa"
import {
    FiHome,
    FiUsers,
    FiPackage,
    FiShoppingCart,
    FiHeart,
    FiMessageSquare,
    FiSettings,
    FiLogOut,
    FiX,
    FiHelpCircle,
    FiCreditCard,
    FiMenu,
    FiUser,
    FiAward,
} from "react-icons/fi"
import AuthContext from "../../Providers/AuthContext.jsx"
import { Outlet } from "react-router"
import LoadingSkeleton from "./LoadingSkeleton.jsx";


const DashboardPage = () => {

    // State management
    const { signOutCurrentUser } = useContext(AuthContext)
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobileView, setIsMobileView] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const [isLoading, setIsLoading] = useState(true)
    const navigateTo = useNavigate()


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
        loyaltyPoints: 450,
    })


    // Mock data for dashboard
    const [dashboardData, setDashboardData] = useState({
        stats: {
            totalUsers: 1245,
            activeRentals: 78,
            totalGadgets: 342,
            totalRevenue: 28750.5,
            pendingReturns: 12,
            newMessages: 8,
            completedRentals: 156,
            wishlistedItems: 24,
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
                amount: 175.5,
            },
            {
                id: "rent002",
                gadgetName: 'MacBook Pro 16"',
                gadgetImage: "/placeholder.svg",
                renterName: "Bob Smith",
                startDate: "2023-11-08",
                endDate: "2023-11-22",
                status: "active",
                amount: 349.99,
            },
            {
                id: "rent003",
                gadgetName: "Sony A7 IV Camera",
                gadgetImage: "/placeholder.svg",
                renterName: "Carol White",
                startDate: "2023-11-05",
                endDate: "2023-11-12",
                status: "returned",
                amount: 210.0,
            },
            {
                id: "rent004",
                gadgetName: "DJI Mavic 3 Pro",
                gadgetImage: "/placeholder.svg",
                renterName: "David Brown",
                startDate: "2023-11-01",
                endDate: "2023-11-08",
                status: "returned",
                amount: 280.0,
            },
        ],
        wishlist: [
            {
                id: "wish001",
                name: "Canon EOS R5",
                image: "/placeholder.svg",
                category: "Cameras",
                dailyRate: 45.99,
                availability: "available",
                rating: 4.9,
            },
            {
                id: "wish001",
                name: "Canon EOS R5",
                image: "/placeholder.svg",
                category: "Cameras",
                dailyRate: 45.99,
                availability: "available",
                rating: 4.9,
            },
            {
                id: "wish002",
                name: "Steam Deck",
                image: "/placeholder.svg",
                category: "Gaming",
                dailyRate: 18.5,
                availability: "unavailable",
                rating: 4.7,
            },
        ],
        recentMessages: [
            {
                id: "msg001",
                sender: "Support Team",
                avatar: "/placeholder.svg",
                message: "Your inquiry about the rental extension has been processed.",
                time: "2 hours ago",
                read: false,
            },
            {
                id: "msg002",
                sender: "Alice Johnson",
                avatar: "/placeholder.svg",
                message: "I'd like to know if the MacBook is available next week?",
                time: "Yesterday",
                read: false,
            },
        ],
        popularCategories: [
            { name: "Smartphones", count: 85, icon: <FaMobileAlt /> },
            { name: "Laptops", count: 64, icon: <FaLaptop /> },
            { name: "Tablets", count: 42, icon: <FaTabletAlt /> },
            { name: "Headphones", count: 38, icon: <FaHeadphones /> },
            { name: "Cameras", count: 35, icon: <FaCamera /> },
            { name: "Gaming", count: 30, icon: <FaGamepad /> },
        ],
        notifications: [
            {
                id: "notif001",
                type: "rental",
                message: "Your rental request for iPad Pro has been confirmed",
                time: "10 minutes ago",
            },
            {
                id: "notif002",
                type: "return",
                message: "Return reminder: Your Sony camera is due tomorrow",
                time: "2 hours ago",
            },
            {
                id: "notif003",
                type: "payment",
                message: "Payment of $175.50 was processed for your rental",
                time: "Yesterday",
            },
        ],
    })


    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }


    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab)
        navigateTo(`/dashboard/${user.role}/${tab === "overview" ? "overview" : tab}`) // Navigate to the corresponding route
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false) // Close mobile menu if open
        }
    }


    const handleSignOutClick = async () => {
        await signOutCurrentUser()
        navigateTo("/")
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


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })
    }, [])


    const AdminLeftSidebarTabs = [
        { id: "total_overview", name: "Total Overview", icon: <FiHome className="mr-3" size={20} /> },
        { id: "all_users", name: "All Users", icon: <FiUsers className="mr-3" size={20} /> },
        { id: "all_messages", name: "All Messages", icon: <FiMessageSquare className="mr-3" size={20} /> },
        { id: "all_gadgets", name: "All Gadgets", icon: <FiPackage className="mr-3" size={20} /> },
        { id: "all_rentals", name: "All Rentals", icon: <FiShoppingCart className="mr-3" size={20} /> },
        { id: "settings", name: "Settings", icon: <FiSettings className="mr-3" size={20} /> },
    ]


    const UserLeftSidebarTabs = [
        { id: "overview", name: "Overview", icon: <FiHome className="mr-3" size={20} /> },
        { id: "my_rentals", name: "My Rentals", icon: <FiShoppingCart className="mr-3" size={20} /> },
        { id: "wishlist", name: "Wishlist", icon: <FiHeart className="mr-3" size={20} /> },
        { id: "messages", name: "Messages", icon: <FiMessageSquare className="mr-3" size={20} /> },
        { id: "loyalty_and_rewards", name: "Loyalty & Rewards", icon: <FiCreditCard className="mr-3" size={20} /> },
        { id: "settings", name: "Settings", icon: <FiSettings className="mr-3" size={20} /> },
    ]


    return (
        <div
            className={`min-h-[calc(100vh-421px)] transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
        >
            {/* Header with mobile menu button */}
            <div className="flex justify-center items-center">
                {isMobileView && (
                    <button
                        onClick={toggleMobileMenu}
                        className={`mt-20 px-2 py-1 border border-gray-600 rounded-lg ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"} cursor-pointer`}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                )}
            </div>

            {/* Mobile Navigation Menu - Exact replica from UserOverviewComponent */}
            {isMobileView && isMobileMenuOpen && (
                <div className={`mb-6 w-11/12 mx-auto rounded-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
                    <div className="p-4 border-b border-gray-700 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{user.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        {user.role === "admin" ? (
                            // Admin Navigation
                            <>
                                {AdminLeftSidebarTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                            activeTab === tab.id
                                                ? darkMode
                                                    ? "bg-blue-900/30 text-blue-400"
                                                    : "bg-blue-50 text-blue-600"
                                                : darkMode
                                                    ? "hover:bg-gray-700"
                                                    : "hover:bg-gray-100"
                                        }`}
                                    >
                                        {React.cloneElement(tab.icon, {
                                            size: 18,
                                            className: tab.icon.props.className.replace("mr-3", ""),
                                        })}
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                            </>
                        ) : (
                            // User Navigation - Matching exactly what was in UserOverviewComponent
                            <>
                                <button
                                    onClick={() => handleTabChange("overview")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <FiUser size={18} className="text-blue-500" />
                                    <span>Overview</span>
                                </button>
                                <button
                                    onClick={() => handleTabChange("my_rentals")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <FiShoppingCart size={18} className="text-green-500" />
                                    <span>My Rentals</span>
                                </button>
                                <button
                                    onClick={() => handleTabChange("wishlist")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <FiHeart size={18} className="text-red-500" />
                                    <span>Wishlist</span>
                                </button>
                                <button
                                    onClick={() => handleTabChange("loyalty_and_rewards")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <FiAward size={18} className="text-purple-500" />
                                    <span>Loyalty & Rewards</span>
                                </button>
                                <button
                                    onClick={() => handleTabChange("messages")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <FiMessageSquare size={18} className="text-cyan-500" />
                                    <span>Messages</span>
                                </button>
                                <button
                                    onClick={() => handleTabChange("settings")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <FiSettings size={18} className="text-gray-500" />
                                    <span>Settings</span>
                                </button>
                            </>
                        )}
                    </div>
                    <div className="p-4 border-t border-gray-700 dark:border-gray-700">
                        <button
                            onClick={handleSignOutClick}
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

            {/* Main Content */}
            <div className="container mx-auto px-4 py-5 lg:py-16 lg:pt-32">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className={`sticky top-32 rounded-xl p-4 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={user.avatar || "/placeholder.svg"}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full mr-3 object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold">{user.name}</h3>
                                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{user.role}</p>
                                    </div>
                                </div>
                            </div>

                            <nav>
                                <ul className="space-y-1">
                                    {user.role === "admin" ? (
                                        // Admin Navigation
                                        <>
                                            {AdminLeftSidebarTabs.map((tab) => (
                                                <li key={tab.id}>
                                                    <button
                                                        onClick={() => handleTabChange(tab.id)}
                                                        className={`w-full flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                                                            activeTab === tab.id
                                                                ? darkMode
                                                                    ? "bg-blue-900/30 text-blue-400"
                                                                    : "bg-blue-50 text-blue-600"
                                                                : darkMode
                                                                    ? "hover:bg-gray-700"
                                                                    : "hover:bg-gray-100"
                                                        }`}
                                                    >
                                                        {tab.icon}
                                                        <span>{tab.name}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </>
                                    ) : (
                                        // User Navigation
                                        <>
                                            {UserLeftSidebarTabs.map((tab) => (
                                                <li key={tab.id}>
                                                    <button
                                                        onClick={() => handleTabChange(tab.id)}
                                                        className={`w-full flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                                                            activeTab === tab.id
                                                                ? darkMode
                                                                    ? "bg-blue-900/30 text-blue-400"
                                                                    : "bg-blue-50 text-blue-600"
                                                                : darkMode
                                                                    ? "hover:bg-gray-700"
                                                                    : "hover:bg-gray-100"
                                                        }`}
                                                    >
                                                        {tab.icon}
                                                        <span>{tab.name}</span>
                                                        {tab.id === "messages" &&
                                                            dashboardData.recentMessages.filter((m) => !m.read).length > 0 && (
                                                                <span
                                                                    className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                                                                        darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"
                                                                    }`}
                                                                >
                                                                    {dashboardData.recentMessages.filter((m) => !m.read).length}
                                                                </span>
                                                            )}
                                                        {tab.id === "wishlist" && dashboardData.wishlist.length > 0 && (
                                                            <span
                                                                className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                                                                    darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"
                                                                }`}
                                                            >
                                                                {dashboardData.wishlist.length}
                                                            </span>
                                                        )}
                                                    </button>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                    <li>
                                        <button
                                            onClick={handleSignOutClick}
                                            className={`w-full flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                                                darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
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
                                        <Link to={"/contact-us"} className={`mt-2 text-xs ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                            Get Support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">{isLoading ? <LoadingSkeleton></LoadingSkeleton> : <Outlet></Outlet>}</div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
