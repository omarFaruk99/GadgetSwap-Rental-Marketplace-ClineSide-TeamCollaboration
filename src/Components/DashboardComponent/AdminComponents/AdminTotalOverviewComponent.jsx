"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { FiUsers, FiShoppingCart, FiPackage, FiDollarSign, FiTrendingUp, FiBell, FiCheckCircle } from "react-icons/fi"
import {
    FaMobileAlt,
    FaLaptop,
    FaTabletAlt,
    FaHeadphones,
    FaCamera,
    FaGamepad,
    FaChartPie,
    FaChartLine,
    FaCrown,
} from "react-icons/fa"


const AdminTotalOverviewComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const [greeting, setGreeting] = useState("")
    const [currentTime, setCurrentTime] = useState("")
    const [dateRange, setDateRange] = useState("week")


    // Set greeting based on time of day
    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting("Good Morning")
        else if (hour < 18) setGreeting("Good Afternoon")
        else setGreeting("Good Evening")

        // Format current time
        const formatTime = () => {
            const now = new Date()
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
            setCurrentTime(now.toLocaleDateString("en-US", options))
        }

        formatTime()
        const timer = setInterval(formatTime, 60000)

        return () => clearInterval(timer)
    }, [])


    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount)
    }


    // Change date range for analytics
    const handleDateRangeChange = (range) => {
        setDateRange(range)
    }


    // Format date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString("en-US", options)
    }


    // Mock data for dashboard
    const [dashboardData, setDashboardData] = useState({
        admin: {
            name: "John Doe",
            avatar: "/placeholder.svg",
            role: "Super Admin",
            lastLogin: "2023-11-15T08:30:00",
            membershipTier: "Platinum",
        },
        stats: {
            totalUsers: 1245,
            activeRentals: 234,
            totalGadgets: 342,
            totalRevenue: 28750.5,
        },
        earnings: {
            weekly: [
                { date: "2023-11-01", amount: 420 },
                { date: "2023-11-02", amount: 380 },
                { date: "2023-11-03", amount: 450 },
                { date: "2023-11-04", amount: 520 },
                { date: "2023-11-05", amount: 490 },
                { date: "2023-11-06", amount: 550 },
                { date: "2023-11-07", amount: 480 },
            ],
            monthly: [
                { date: "2023-01-01", amount: 1200 },
                { date: "2023-02-01", amount: 1800 },
                { date: "2023-03-01", amount: 2200 },
                { date: "2023-04-01", amount: 1600 },
                { date: "2023-05-01", amount: 2100 },
                { date: "2023-06-01", amount: 2400 },
                { date: "2023-07-01", amount: 1900 },
                { date: "2023-08-01", amount: 2300 },
                { date: "2023-09-01", amount: 2500 },
                { date: "2023-10-01", amount: 2200 },
                { date: "2023-11-01", amount: 2400 },
                { date: "2023-12-01", amount: 2100 },
            ],
        },
        rentalsByCategory: [
            { name: "Smartphones", percentage: 25, color: "blue", icon: <FaMobileAlt /> },
            { name: "Laptops", percentage: 20, color: "purple", icon: <FaLaptop /> },
            { name: "Cameras", percentage: 15, color: "green", icon: <FaCamera /> },
            { name: "Audio", percentage: 12, color: "yellow", icon: <FaHeadphones /> },
            { name: "Gaming", percentage: 10, color: "red", icon: <FaGamepad /> },
            { name: "Tablets", percentage: 8, color: "indigo", icon: <FaTabletAlt /> },
            { name: "Others", percentage: 10, color: "gray", icon: null },
        ],
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
        ],
        unreadNotifications: [
            {
                id: "notif001",
                type: "rental",
                message: "New rental request for iPhone 15 Pro",
                time: "10 minutes ago",
                icon: <FiShoppingCart />,
            },
            {
                id: "notif002",
                type: "return",
                message: "Sony camera has been returned",
                time: "2 hours ago",
                icon: <FiPackage />,
            },
            {
                id: "notif003",
                type: "payment",
                message: "Payment of $175.50 was processed",
                time: "Yesterday",
                icon: <FiDollarSign />,
            },
            {
                id: "notif004",
                type: "user",
                message: "New user registration: Emma Thompson",
                time: "Yesterday",
                icon: <FiUsers />,
            },
        ],
    })


    // Calculate total percentage for pie chart
    const totalPercentage = dashboardData.rentalsByCategory.reduce((acc, category) => acc + category.percentage, 0)


    // Generate pie chart segments
    const generatePieChartSegments = () => {
        let cumulativePercentage = 0

        return dashboardData.rentalsByCategory.map((category, index) => {
            const startPercentage = cumulativePercentage
            cumulativePercentage += category.percentage

            const startAngle = (startPercentage / totalPercentage) * 360
            const endAngle = (cumulativePercentage / totalPercentage) * 360

            const x1 = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
            const y1 = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
            const x2 = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
            const y2 = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

            const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

            return {
                path: pathData,
                color: category.color,
                name: category.name,
                percentage: category.percentage,
                icon: category.icon,
            }
        })
    }


    const pieChartSegments = generatePieChartSegments()


    // Get data for current date range
    const getCurrentRangeData = () => {
        return dateRange === "week" ? dashboardData.earnings.weekly : dashboardData.earnings.monthly
    }


    // Find max value for scaling
    const getMaxValue = () => {
        const data = getCurrentRangeData()
        return Math.max(...data.map((item) => item.amount))
    }


    return (
        <div className={`w-full max-w-7xl mx-auto transition-colors ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
            {/* Greeting Section with Platinum Badge */}
            <div className={`rounded-xl p-6 mb-8 transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {greeting}, {dashboardData.admin.name}!
                            </h1>
                            <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{currentTime}</p>
                        </div>
                        <div
                            className={`ml-4 flex items-center px-3 py-1 rounded-full ${
                                darkMode ? "bg-amber-900/30" : "bg-amber-100"
                            }`}
                        >
                            <FaCrown className="text-amber-500 mr-1" size={14} />
                            <span className={`text-sm font-medium ${darkMode ? "text-amber-400" : "text-amber-700"}`}>
                Platinum Admin
              </span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                        <div className="mr-4">
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Last login</p>
                            <p className="text-sm font-medium">{formatDate(dashboardData.admin.lastLogin)}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-amber-500 shadow-lg shadow-amber-500/20">
                            <img
                                src={dashboardData.admin.avatar || "/placeholder.svg"}
                                alt="Admin"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div
                    className={`rounded-xl p-6 transition-colors cursor-pointer hover:scale-[1.02] transition-transform ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Users</p>
                            <h3 className="text-2xl font-bold mt-1">{dashboardData.stats.totalUsers}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-100"}`}>
                            <FiUsers className="text-blue-500" size={24} />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <FiTrendingUp className="text-green-500 mr-1" size={16} />
                        <span className="text-sm text-green-500">+12% this month</span>
                    </div>
                </div>

                <div
                    className={`rounded-xl p-6 transition-colors cursor-pointer hover:scale-[1.02] transition-transform ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Rentals</p>
                            <h3 className="text-2xl font-bold mt-1">{dashboardData.stats.activeRentals}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-100"}`}>
                            <FiShoppingCart className="text-green-500" size={24} />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <FiTrendingUp className="text-green-500 mr-1" size={16} />
                        <span className="text-sm text-green-500">+5% this week</span>
                    </div>
                </div>

                <div
                    className={`rounded-xl p-6 transition-colors cursor-pointer hover:scale-[1.02] transition-transform ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Gadgets</p>
                            <h3 className="text-2xl font-bold mt-1">{dashboardData.stats.totalGadgets}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-100"}`}>
                            <FiPackage className="text-purple-500" size={24} />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <FiTrendingUp className="text-green-500 mr-1" size={16} />
                        <span className="text-sm text-green-500">+8% this month</span>
                    </div>
                </div>

                <div
                    className={`rounded-xl p-6 transition-colors cursor-pointer hover:scale-[1.02] transition-transform ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Revenue</p>
                            <h3 className="text-2xl font-bold mt-1">{formatCurrency(dashboardData.stats.totalRevenue)}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? "bg-amber-900/20" : "bg-amber-100"}`}>
                            <FiDollarSign className="text-amber-500" size={24} />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <FiTrendingUp className="text-green-500 mr-1" size={16} />
                        <span className="text-sm text-green-500">+15% this month</span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Revenue Chart with Glow Effect */}
                <div
                    className={`lg:col-span-2 rounded-xl p-6 transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <FaChartLine className={`mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} size={20} />
                            <h3 className="text-lg font-bold">Revenue Overview</h3>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleDateRangeChange("week")}
                                className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                                    dateRange === "week"
                                        ? darkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => handleDateRangeChange("month")}
                                className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                                    dateRange === "month"
                                        ? darkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Month
                            </button>
                        </div>
                    </div>

                    <div className="h-64 flex items-end space-x-2">
                        {getCurrentRangeData().map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div
                                    className={`w-full rounded-t-sm transition-all relative ${
                                        darkMode ? "bg-blue-500/70 hover:bg-blue-500" : "bg-blue-500/80 hover:bg-blue-600"
                                    }`}
                                    style={{
                                        height: `${(item.amount / getMaxValue()) * 100}%`,
                                        filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))",
                                    }}
                                >
                                    {/* Glow effect */}
                                    <div
                                        className="absolute inset-0 rounded-t-sm opacity-30"
                                        style={{
                                            background:
                                                "radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 70%)",
                                            filter: "blur(4px)",
                                        }}
                                    ></div>
                                </div>
                                <span className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {dateRange === "week"
                      ? new Date(item.date).toLocaleDateString("en-US", { weekday: "short" })
                      : new Date(item.date).toLocaleDateString("en-US", { month: "short" })}
                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Distribution Pie Chart */}
                <div className={`rounded-xl p-6 transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                    <div className="flex items-center mb-6">
                        <FaChartPie className={`mr-2 ${darkMode ? "text-purple-400" : "text-purple-600"}`} size={20} />
                        <h3 className="text-lg font-bold">Rentals by Category</h3>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="relative w-48 h-48">
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                {pieChartSegments.map((segment, index) => (
                                    <path
                                        key={index}
                                        d={segment.path}
                                        className={`fill-${segment.color}-${darkMode ? "500" : "400"} hover:opacity-90 cursor-pointer transition-opacity ${
                                            darkMode ? "filter drop-shadow(0 0 3px rgba(255, 255, 255, 0.1))" : ""
                                        }`}
                                        stroke={darkMode ? "#1f2937" : "#ffffff"}
                                        strokeWidth="1"
                                    />
                                ))}
                                {/* Inner circle for donut effect */}
                                <circle cx="50" cy="50" r="20" fill={darkMode ? "#1f2937" : "#ffffff"} />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {dashboardData.rentalsByCategory.map((category, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                                            darkMode
                                                ? `bg-${category.color}-900/30 text-${category.color}-400`
                                                : `bg-${category.color}-100 text-${category.color}-600`
                                        }`}
                                    >
                                        {category.icon || <div className="w-3 h-3 rounded-full bg-gray-400"></div>}
                                    </div>
                                    <span className="text-sm">{category.name}</span>
                                </div>
                                <span className="text-sm font-medium">{category.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Unread Notifications */}
            <div className={`rounded-xl transition-colors mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <div className="flex items-center">
                        <FiBell className={`mr-2 ${darkMode ? "text-amber-400" : "text-amber-600"}`} size={20} />
                        <h3 className="text-lg font-bold">Unread Notifications</h3>
                    </div>
                    <div
                        className={`px-2 py-1 text-xs rounded-full ${
                            darkMode ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-800"
                        }`}
                    >
                        {dashboardData.unreadNotifications.length} new
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {dashboardData.unreadNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 rounded-lg cursor-pointer ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"}`}
                        >
                            <div className="flex items-start">
                                <div
                                    className={`p-2 rounded-full mr-3 ${
                                        notification.type === "rental"
                                            ? darkMode
                                                ? "bg-green-900/30 text-green-400"
                                                : "bg-green-100 text-green-600"
                                            : notification.type === "return"
                                                ? darkMode
                                                    ? "bg-blue-900/30 text-blue-400"
                                                    : "bg-blue-100 text-blue-600"
                                                : notification.type === "payment"
                                                    ? darkMode
                                                        ? "bg-amber-900/30 text-amber-400"
                                                        : "bg-amber-100 text-amber-600"
                                                    : darkMode
                                                        ? "bg-purple-900/30 text-purple-400"
                                                        : "bg-purple-100 text-purple-600"
                                    }`}
                                >
                                    {notification.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">{notification.message}</p>
                                    <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{notification.time}</p>
                                </div>
                                <button className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}>
                                    <FiCheckCircle className={darkMode ? "text-gray-400" : "text-gray-500"} size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        className={`w-full mt-2 text-center py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                            darkMode ? "text-blue-400 hover:bg-gray-700" : "text-blue-600 hover:bg-gray-100"
                        }`}
                    >
                        View all notifications
                    </button>
                </div>
            </div>

            {/* Recent Rentals */}
            <div className={`rounded-xl transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 className="text-lg font-bold">Recent Rentals</h3>
                    <button
                        className={`text-sm cursor-pointer ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
                    >
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className={darkMode ? "bg-gray-700/50" : "bg-gray-50"}>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gadget</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Renter</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dates</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                        </tr>
                        </thead>
                        <tbody className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                        {dashboardData.recentRentals.map((rental) => (
                            <tr
                                key={rental.id}
                                className={`transition-colors cursor-pointer hover:${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-lg object-cover"
                                                src={rental.gadgetImage || "/placeholder.svg"}
                                                alt={rental.gadgetName}
                                            />
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
                    <span
                        className={`px-2 py-1 text-xs rounded-full ${
                            rental.status === "active"
                                ? darkMode
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-green-100 text-green-800"
                                : rental.status === "returned"
                                    ? darkMode
                                        ? "bg-blue-900/30 text-blue-400"
                                        : "bg-blue-100 text-blue-800"
                                    : darkMode
                                        ? "bg-gray-700 text-gray-300"
                                        : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminTotalOverviewComponent;
