import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {
    FiShoppingCart,
    FiCalendar,
    FiSearch,
    FiFilter,
    FiDownload,
    FiStar,
    FiCreditCard,
    FiTag,
    FiAward,
    FiWifi,
    FiFileText,
    FiChevronDown,
    FiChevronUp,
    FiX,
} from "react-icons/fi"
import { FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt, FaVrCardboard } from "react-icons/fa"


const UserMyRentalsComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const [activeTab, setActiveTab] = useState("active")
    const [searchQuery, setSearchQuery] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [expandedOrder, setExpandedOrder] = useState(null)
    const [isMobileView, setIsMobileView] = useState(false)


    // Fake rentals data
    const [rentals, setRentals] = useState([
        {
            id: "ORD-2023-001",
            gadgetName: "iPhone 15 Pro Max",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Smartphones",
            startDate: "2023-11-10",
            endDate: "2023-11-17",
            status: "active",
            amount: 175.5,
            discount: 10,
            membershipTier: "Silver",
            pointsEarned: 150,
            paymentMethod: "Credit Card (**** 4582)",
            hasInvoice: true,
            isReviewed: false,
            rating: 0,
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
            discount: 15,
            membershipTier: "Silver",
            pointsEarned: 300,
            paymentMethod: "PayPal",
            hasInvoice: true,
            isReviewed: false,
            rating: 0,
        },
        {
            id: "ORD-2023-003",
            gadgetName: "Sony A7 IV Camera",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Cameras",
            startDate: "2023-10-05",
            endDate: "2023-10-12",
            status: "past",
            amount: 210.0,
            discount: 0,
            membershipTier: "Bronze",
            pointsEarned: 180,
            paymentMethod: "Credit Card (**** 7890)",
            hasInvoice: true,
            isReviewed: true,
            rating: 4.5,
        },
        {
            id: "ORD-2023-004",
            gadgetName: "DJI Mavic Air 2",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Drones",
            startDate: "2023-10-01",
            endDate: "2023-10-08",
            status: "past",
            amount: 280.0,
            discount: 5,
            membershipTier: "Bronze",
            pointsEarned: 220,
            paymentMethod: "Debit Card (**** 1234)",
            hasInvoice: true,
            isReviewed: false,
            rating: 0,
        },
        {
            id: "ORD-2023-005",
            gadgetName: "Oculus Quest 3",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "VR",
            startDate: "2023-09-15",
            endDate: "2023-09-22",
            status: "past",
            amount: 175.0,
            discount: 0,
            membershipTier: "Bronze",
            pointsEarned: 150,
            paymentMethod: "Credit Card (**** 5678)",
            hasInvoice: true,
            isReviewed: true,
            rating: 5,
        },
        {
            id: "ORD-2023-006",
            gadgetName: "Bose QuietComfort Ultra",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Headphones",
            startDate: "2023-11-20",
            endDate: "2023-11-27",
            status: "active",
            amount: 89.99,
            discount: 0,
            membershipTier: "Silver",
            pointsEarned: 80,
            paymentMethod: "PayPal",
            hasInvoice: true,
            isReviewed: false,
            rating: 0,
        },
    ])


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
                return <FiWifi className="text-orange-500" />
            case "VR":
                return <FaVrCardboard className="text-pink-500" />
            default:
                return <FiShoppingCart className="text-gray-500" />
        }
    }


    // Toggle order details expansion
    const toggleOrderDetails = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null)
        } else {
            setExpandedOrder(orderId)
        }
    }


    // Handle download invoice
    const handleDownloadInvoice = (orderId) => {
        console.log(`Downloading invoice for order ${orderId}`)
        // In a real app, this would trigger a download of the invoice PDF
    }


    // Handle review navigation
    const handleReviewNavigation = (orderId) => {
        console.log(`Navigating to review page for order ${orderId}`)
        // In a real app, this would navigate to the gadget details page with a review section
    }


    // Filter rentals based on active tab, search query, and date range
    const getFilteredRentals = () => {
        return rentals.filter((rental) => {
            // Filter by active/past status
            if (activeTab !== "all" && rental.status !== activeTab) {
                return false
            }

            // Filter by search query (order ID)
            if (searchQuery && !rental.id.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false
            }

            // Filter by date range
            if (startDate && endDate) {
                const rentalStartDate = new Date(rental.startDate)
                const filterStartDate = new Date(startDate)
                const filterEndDate = new Date(endDate)

                if (rentalStartDate < filterStartDate || rentalStartDate > filterEndDate) {
                    return false
                }
            } else if (startDate) {
                const rentalStartDate = new Date(rental.startDate)
                const filterStartDate = new Date(startDate)

                if (rentalStartDate < filterStartDate) {
                    return false
                }
            }

            return true
        })
    }


    // Reset filters
    const resetFilters = () => {
        setSearchQuery("")
        setStartDate("")
        setEndDate("")
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


    // Filtered rentals
    const filteredRentals = getFilteredRentals()


    return (
        <div
            className={`w-full mx-auto rounded-xl ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
        >

            {/* Filters */}
            <div className={`mb-2 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} rounded-xl p-3 shadow-sm`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* Date Filter */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            <FiFilter className="text-blue-500" />
                            <span>Filters</span>
                            {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        {(searchQuery || startDate || endDate) && (
                            <button
                                onClick={resetFilters}
                                className={`ml-4 flex items-center gap-1 text-sm ${
                                    darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <FiX size={14} />
                                <span>Clear</span>
                            </button>
                        )}
                    </div>

                    <div className={'flex space-x-5'}>

                        {/* Activity Filter */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab("active")}
                                className={`px-4 py-1 rounded-lg transition-colors ${
                                    activeTab === "active"
                                        ? darkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setActiveTab("past")}
                                className={`px-4 py-1 rounded-lg transition-colors ${
                                    activeTab === "past"
                                        ? darkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                            >
                                Past
                            </button>
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`px-4 py-1 rounded-lg transition-colors ${
                                    activeTab === "all"
                                        ? darkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                            >
                                All
                            </button>
                        </div>

                        {/* Order Filter */}
                        <div className="relative w-full md:w-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className={darkMode ? "text-gray-500" : "text-gray-400"} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by order #"
                                className={`pl-10 pr-4 py-1 w-full md:w-64 rounded-lg ${
                                    darkMode
                                        ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            />
                        </div>
                    </div>


                </div>

                {showFilters && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={`block mb-1 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                From Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiCalendar className={darkMode ? "text-gray-500" : "text-gray-400"} />
                                </div>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className={`pl-10 pr-4 py-2 w-full rounded-lg ${
                                        darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                    } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={`block mb-1 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                To Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiCalendar className={darkMode ? "text-gray-500" : "text-gray-400"} />
                                </div>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                    className={`pl-10 pr-4 py-2 w-full rounded-lg ${
                                        darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                    } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results count */}
            <div className="ml-2 mb-2">
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Showing {filteredRentals.length} {filteredRentals.length === 1 ? "rental" : "rentals"}
                </p>
            </div>

            {/* Rentals List */}
            {filteredRentals.length > 0 ? (
                <div className="space-y-5">
                    {filteredRentals.map((rental) => (
                        <div
                            key={rental.id}
                            className={`rounded-xl overflow-hidden shadow-sm transition-all ${
                                darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                            }`}
                        >
                            {/* Main rental info */}
                            <div className="p-4">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    {/* Gadget image and basic info */}
                                    <div className="flex items-start gap-4">
                                        <div className="relative h-full w-32 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={rental.gadgetImage || "/placeholder.svg"}
                                                alt={rental.gadgetName}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute -bottom-0 left-0 p-1">
                                                <span
                                                    className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium ${
                                                        rental.status === "active"
                                                            ? darkMode
                                                                ? "bg-green-900/80 text-green-300"
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

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg font-medium">{rental.gadgetName}</span>
                                                <span className="text-sm">{getCategoryIcon(rental.category)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm mb-1">
                                                <FiCalendar className={darkMode ? "text-gray-400" : "text-gray-500"} size={14} />
                                                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                    {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <FiFileText className={darkMode ? "text-gray-400" : "text-gray-500"} size={14} />
                                                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{rental.id}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price and actions */}
                                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 items-start sm:items-center md:items-end justify-between md:min-w-[180px]">
                                        <div className="text-right">
                                            <div className="text-lg font-bold">{formatCurrency(rental.amount)}</div>
                                            {rental.discount > 0 && (
                                                <div className="flex items-center gap-1 text-xs">
                                                    <FiTag className="text-green-500" size={12} />
                                                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                        {rental.discount}% discount applied
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleOrderDetails(rental.id)}
                                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                                                    darkMode
                                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                                }`}
                                            >
                                                {expandedOrder === rental.id ? (
                                                    <>
                                                        <FiChevronUp size={14} /> Less
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiChevronDown size={14} /> More
                                                    </>
                                                )}
                                            </button>

                                            {rental.hasInvoice && (
                                                <button
                                                    onClick={() => handleDownloadInvoice(rental.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                                                        darkMode
                                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                                    }`}
                                                >
                                                    <FiDownload size={14} /> Invoice
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded details */}
                            {expandedOrder === rental.id && (
                                <div
                                    className={`p-4 border-t ${
                                        darkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"
                                    }`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Order details */}
                                        <div>
                                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                                                <FiFileText className="text-blue-500" />
                                                <span>Order Details</span>
                                            </h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Order ID:</span>
                                                    <span className="text-sm font-medium">{rental.id}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Membership Tier:
                                                    </span>
                                                    <span className="text-sm font-medium flex items-center gap-1">
                                                    <FiAward
                                                        className={
                                                            rental.membershipTier === "Gold"
                                                                ? "text-yellow-500"
                                                                : rental.membershipTier === "Silver"
                                                                    ? "text-gray-400"
                                                                    : "text-amber-700"
                                                        }
                                                        size={14}
                                                    />
                                                        {rental.membershipTier}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Points Earned:
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium">{rental.pointsEarned} pts</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Rental Duration:
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                    {Math.ceil((new Date(rental.endDate) - new Date(rental.startDate)) / (1000 * 60 * 60 * 24))}{" "}
                                                        days
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment details */}
                                        <div>
                                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                                                <FiCreditCard className="text-green-500" />
                                                <span>Payment Details</span>
                                            </h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Payment Method:
                                                    </span>
                                                    <span className="text-sm font-medium">{rental.paymentMethod}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Subtotal:</span>
                                                    <span className="text-sm font-medium">
                                                        {formatCurrency(rental.amount / (1 - rental.discount / 100))}
                                                    </span>
                                                </div>
                                                {rental.discount > 0 && (
                                                    <div className="flex justify-between">
                                                        <span
                                                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Discount ({rental.discount}%):
                                                        </span>
                                                        <span className="text-sm font-medium text-green-500">
                                                        -{formatCurrency((rental.amount / (1 - rental.discount / 100)) * (rental.discount / 100))}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between pt-1 border-t border-dashed border-gray-300 dark:border-gray-600">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Paid:</span>
                                                    <span className="text-sm font-bold">{formatCurrency(rental.amount)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review section */}
                                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium flex items-center gap-2">
                                                <FiStar className="text-yellow-500" />
                                                <span>Review & Rating</span>
                                            </h3>

                                            {rental.status === "past" && !rental.isReviewed ? (
                                                <button
                                                    onClick={() => handleReviewNavigation(rental.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                                                        darkMode
                                                            ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                                                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                                                    }`}
                                                >
                                                    <FiStar size={14} /> Write Review
                                                </button>
                                            ) : rental.isReviewed ? (
                                                <div className="flex items-center">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FiStar
                                                                key={i}
                                                                className={i < rental.rating ? "text-yellow-500 fill-current" : "text-gray-400"}
                                                                size={16}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="ml-2 text-sm font-medium">{rental.rating.toFixed(1)}</span>
                                                </div>
                                            ) : (
                                                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Available after rental ends
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                // Empty state
                <div
                    className={`rounded-xl p-8 text-center ${
                        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                    }`}
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <FiShoppingCart className={`${darkMode ? "text-gray-500" : "text-gray-400"}`} size={32} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No rentals found</h3>
                    <p className={`mb-6 max-w-md mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {activeTab === "active"
                            ? "You don't have any active rentals at the moment."
                            : activeTab === "past"
                                ? "You don't have any past rentals."
                                : "No rentals match your search criteria."}
                    </p>
                    <button
                        onClick={() => (window.location.href = "/all-gadgets")}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        Browse Gadgets
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserMyRentalsComponent;
