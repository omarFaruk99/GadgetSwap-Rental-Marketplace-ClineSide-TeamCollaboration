import { useState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FiShoppingCart, FiCalendar, FiSearch, FiDownload, FiStar, FiCreditCard, FiTag, FiAward, FiWifi, FiFileText, FiChevronDown, FiChevronUp, FiX, FiPackage, FiTruck, FiHome, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi"
import { FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt, FaVrCardboard } from "react-icons/fa"
import AuthContext from "../../../Providers/AuthContext.jsx"
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure.jsx"
import { getUserProfileDetails } from "../../../Features/userProfileDetails/userProfileDetailsSlice.js"
import { getUserRentalOrders } from "../../../Features/userRentalOrders/userRentalOrdersSlice.js"
import { useNavigate } from "react-router-dom"


const UserMyRentalsComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const { user: registeredUser } = useContext(AuthContext)
    const dispatch = useDispatch()
    const { userRentalOrders } = useSelector((state) => state.userRentalOrders)

    const axiosSecure = useAxiosSecure()
    const [searchQuery, setSearchQuery] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [expandedOrder, setExpandedOrder] = useState(null)
    const [isMobileView, setIsMobileView] = useState(false)
    const [statusFilter, setStatusFilter] = useState("all")
    const [showDateFilter, setShowDateFilter] = useState(false)
    const navigate = useNavigate()


    // Fetch gadget details on mount
    useEffect(() => {
        dispatch(getUserRentalOrders({ userEmail: registeredUser?.email, axiosSecure }))
        dispatch(getUserProfileDetails({ userEmail: registeredUser?.email, axiosSecure }))
    }, [dispatch, registeredUser?.email, axiosSecure])


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
            case "Audio":
                return <FaHeadphones className="text-yellow-500" />
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
    const handleDownloadInvoice = async (fullRentalOrderObject) => {
        await navigate(`/dashboard/user/my_rentals/${fullRentalOrderObject?.order_id}/invoice`, { state: { fullRentalOrderObject } })
        // console.log(fullRentalOrderObject)
    }


    // Handle review navigation
    const handleReviewNavigation = (orderId) => {
        console.log(`Navigating to review page for order ${orderId}`)
        // In a real app, this would navigate to the gadget details page with a review section
    }


    // Get status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "active":
                return darkMode ? "bg-green-900/80 text-green-300" : "bg-green-100 text-green-800"
            case "canceled":
                return darkMode ? "bg-red-900/80 text-red-300" : "bg-red-100 text-red-800"
            case "completed":
                return darkMode ? "bg-blue-900/80 text-blue-300" : "bg-blue-100 text-blue-800"
            default:
                return darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
        }
    }


    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return <FiCheck className="text-green-500" />
            case "canceled":
                return <FiAlertCircle className="text-red-500" />
            case "completed":
                return <FiCheck className="text-blue-500" />
            default:
                return <FiShoppingCart className="text-gray-500" />
        }
    }


    // Get shipment status steps
    const getShipmentSteps = () => {
        return [
            { id: "processing_order", label: "Processing", icon: <FiPackage /> },
            { id: "shipment_started", label: "Shipping", icon: <FiTruck /> },
            { id: "delivered", label: "Delivered", icon: <FiHome /> },
            { id: "return_started", label: "Return Started", icon: <FiSend /> },
            { id: "return_received", label: "Return Received", icon: <FiCheck /> },
        ]
    }


    // Check if a step is active
    const isStepActive = (step, currentStatus) => {
        const steps = getShipmentSteps().map((s) => s.id)
        const currentIndex = steps.indexOf(currentStatus)
        const stepIndex = steps.indexOf(step)

        // If the currentStatus is not found, return false
        if (currentIndex === -1) return false

        return stepIndex <= currentIndex
    }


    // Filter rentals based on status, search query, and date range
    const getFilteredRentals = () => {
        // Use the real rental data from the backend instead of fake data
        return (userRentalOrders || []).filter((rental) => {
            // Filter by rental status
            if (statusFilter !== "all" && rental?.rentalStatus !== statusFilter && rental?.rentalStatus !== statusFilter) {
                return false
            }

            // Filter by search query (order ID)
            if (searchQuery && !rental?.order_id?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false
            }

            // Filter by date range
            if (startDate && endDate) {
                const rentalStartDate = new Date(rental?.rentalStreak[0]?.startDate)
                const filterStartDate = new Date(startDate)
                const filterEndDate = new Date(endDate)

                if (rentalStartDate < filterStartDate || rentalStartDate > filterEndDate) {
                    return false
                }
            } else if (startDate) {
                const rentalStartDate = new Date(rental?.rentalStreak[0]?.startDate)
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
        setStatusFilter("all")
        setShowDateFilter(false)
    }


    // Toggle date filter
    const toggleDateFilter = () => {
        setShowDateFilter(!showDateFilter)
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


    // Shipment steps
    const shipmentSteps = getShipmentSteps()


    return (
        <div className={`w-full mx-auto rounded-xl ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
            {/* Filters */}
            <div
                className={`mb-2 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} rounded-xl p-3 shadow-sm`}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Main Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setStatusFilter("all")}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${statusFilter === "all"
                                    ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-600 text-white"
                                    : darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                } cursor-pointer`}
                        >
                            <FiShoppingCart size={14} /> All
                        </button>
                        <button
                            onClick={() => setStatusFilter("active")}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${statusFilter === "active"
                                    ? darkMode
                                        ? "bg-green-600 text-white"
                                        : "bg-green-600 text-white"
                                    : darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                } cursor-pointer`}
                        >
                            <FiCheck size={14} /> Active
                        </button>
                        <button
                            onClick={() => setStatusFilter("completed")}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${statusFilter === "completed"
                                    ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-600 text-white"
                                    : darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                } cursor-pointer`}
                        >
                            <FiCheck size={14} /> Completed
                        </button>
                        <button
                            onClick={() => setStatusFilter("canceled")}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${statusFilter === "canceled"
                                    ? darkMode
                                        ? "bg-red-600 text-white"
                                        : "bg-red-600 text-white"
                                    : darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                } cursor-pointer`}
                        >
                            <FiAlertCircle size={14} /> Canceled
                        </button>
                        <button
                            onClick={toggleDateFilter}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${showDateFilter
                                    ? darkMode
                                        ? "bg-purple-600 text-white"
                                        : "bg-purple-600 text-white"
                                    : darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                } cursor-pointer`}
                        >
                            <FiCalendar size={14} /> Date Filter
                        </button>
                        {(searchQuery || startDate || endDate || statusFilter !== "all") && (
                            <button
                                onClick={resetFilters}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    } cursor-pointer`}
                            >
                                <FiX size={14} /> Clear All
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className={darkMode ? "text-gray-500" : "text-gray-400"} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by order #"
                            className={`pl-10 pr-4 py-1.5 w-full md:w-64 rounded-lg ${darkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                    </div>
                </div>

                {/* Date Filter */}
                {showDateFilter && (
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
                                    className={`pl-10 pr-4 py-2 w-full rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
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
                                    className={`pl-10 pr-4 py-2 w-full rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
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
                            key={rental?._id}
                            className={`rounded-xl overflow-hidden shadow-sm transition-all ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                                }`}
                        >
                            {/* Main rental info */}
                            <div className="p-4">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    {/* Gadget image and basic info */}
                                    <div className="flex items-start gap-4">
                                        <div className="relative h-20 w-32 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={rental?.gadgetImage || "/placeholder.svg"}
                                                alt={rental?.gadgetName}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute -bottom-0 left-0 p-0.5">
                                                <span
                                                    className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium ${getStatusBadgeColor(
                                                        rental?.rentalStatus || rental?.rentalStatus,
                                                    )}`}
                                                >
                                                    {getStatusIcon(rental?.rentalStatus || rental?.rentalStatus)}
                                                    <span className="ml-1">
                                                        {rental?.rentalStatus
                                                            ? rental.rentalStatus.charAt(0).toUpperCase() + rental.rentalStatus.slice(1)
                                                            : rental?.rentalStatus === "active"
                                                                ? "Active"
                                                                : "Past"}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span
                                                    onClick={() => navigate(`/all-gadgets/gadget-details/${rental?.gadget_id}`)}
                                                    className="text-lg font-medium cursor-pointer"
                                                >
                                                    {rental?.gadgetName}
                                                </span>
                                                <span className="text-sm">{getCategoryIcon(rental?.category)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm mb-1">
                                                <FiCalendar className={darkMode ? "text-gray-400" : "text-gray-500"}
                                                    size={14} />
                                                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                    {formatDate(rental?.rentalStreak[0]?.startDate)} -{" "}
                                                    {formatDate(rental?.rentalStreak[0]?.endDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <FiFileText className={darkMode ? "text-gray-400" : "text-gray-500"}
                                                    size={14} />
                                                <span
                                                    className={darkMode ? "text-gray-300" : "text-gray-700"}>{rental?.order_id}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price and actions */}
                                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 items-start sm:items-center md:items-end justify-between md:min-w-[180px]">
                                        <div className="text-right">
                                            <div className="text-lg font-bold">
                                                {formatCurrency(rental?.rentalStreak[0]?.payableFinalAmount)}
                                            </div>
                                            {rental?.rentalStreak[0]?.discountApplied > 0 && (
                                                <div className="flex items-center gap-1 text-xs">
                                                    <FiTag className="text-green-500" size={12} />
                                                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                        {rental?.rentalStreak[0]?.discountApplied}% discount applied
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleOrderDetails(rental?._id)}
                                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 cursor-pointer ${darkMode
                                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                                    }`}
                                            >
                                                {expandedOrder === rental?._id ? (
                                                    <>
                                                        <FiChevronUp size={14} /> See Less Details
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiChevronDown size={14} /> See Order Details
                                                    </>
                                                )}
                                            </button>

                                            {rental?.hasInvoice && (
                                                <button
                                                    onClick={() => handleDownloadInvoice(rental)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 cursor-pointer ${darkMode
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
                            {expandedOrder === rental?._id && (
                                <div
                                    className={`p-4 border-t ${darkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"
                                        }`}
                                >
                                    {/* Shipment Status Progress */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                                            <FiTruck className="text-blue-500" />
                                            <span>Shipment Status</span>
                                        </h3>

                                        <div className="relative">
                                            {/* Progress Bar */}
                                            <div
                                                className={`absolute top-5 left-0 right-0 h-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                                            ></div>

                                            {/* Steps */}
                                            <div className="flex justify-between relative">
                                                {shipmentSteps.map((step) => {
                                                    // Get the current shipment status, defaulting to processing_order if not available
                                                    const currentShipmentStatus = rental?.shipmentStatus || "processing_order"
                                                    const isActive = isStepActive(step.id, currentShipmentStatus)

                                                    return (
                                                        <div key={step.id}
                                                            className="flex flex-col items-center relative z-10">
                                                            <div
                                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive
                                                                        ? darkMode
                                                                            ? "bg-blue-600 text-white"
                                                                            : "bg-blue-600 text-white"
                                                                        : darkMode
                                                                            ? "bg-gray-700 text-gray-400"
                                                                            : "bg-gray-200 text-gray-500"
                                                                    }`}
                                                            >
                                                                {step.icon}
                                                            </div>
                                                            <span
                                                                className={`mt-2 text-xs text-center ${isActive
                                                                        ? darkMode
                                                                            ? "text-gray-200"
                                                                            : "text-gray-800"
                                                                        : darkMode
                                                                            ? "text-gray-500"
                                                                            : "text-gray-500"
                                                                    }`}
                                                            >
                                                                {step.label}
                                                            </span>
                                                            {currentShipmentStatus === step.id && (
                                                                <span
                                                                    className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium ${darkMode ? "text-blue-400" : "text-blue-600"
                                                                        }`}
                                                                >
                                                                    Current
                                                                </span>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Order details */}
                                        <div>
                                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                                                <FiFileText className="text-blue-500" />
                                                <span>Order Details</span>
                                            </h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Order ID:</span>
                                                    <span className="text-sm font-medium">{rental?.order_id}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Membership Tier:
                                                    </span>
                                                    <span className="text-sm font-medium flex items-center gap-1">
                                                        <FiAward
                                                            className={
                                                                rental?.customerDetails?.membershipTier === "Gold"
                                                                    ? "text-yellow-500"
                                                                    : rental?.customerDetails?.membershipTier === "Silver"
                                                                        ? "text-gray-400"
                                                                        : "text-amber-700"
                                                            }
                                                            size={14}
                                                        />
                                                        {rental?.customerDetails?.membershipTier}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Points Earned:
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium">{rental?.rentalStreak[0]?.pointsEarned} pts</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Rental Duration:
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium">{rental?.rentalStreak[0]?.rentalDuration} days</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Rental Status:
                                                    </span>
                                                    <span className="text-sm font-medium flex items-center gap-1">
                                                        {getStatusIcon(rental?.rentalStatus || rental?.rentalStatus)}
                                                        <span
                                                            className={`${rental?.rentalStatus === "active" || rental?.rentalStatus === "active"
                                                                    ? "text-green-500"
                                                                    : rental?.rentalStatus === "canceled"
                                                                        ? "text-red-500"
                                                                        : rental?.rentalStatus === "completed"
                                                                            ? "text-blue-500"
                                                                            : ""
                                                                }`}
                                                        >
                                                            {rental?.rentalStatus
                                                                ? rental.rentalStatus.charAt(0).toUpperCase() + rental.rentalStatus.slice(1)
                                                                : rental?.rentalStatus === "active"
                                                                    ? "Active"
                                                                    : "Past"}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Shipment Status:
                                                    </span>
                                                    <span className="text-sm font-medium flex items-center gap-1">
                                                        {rental?.shipmentStatus === "processing_order" &&
                                                            <FiPackage className="text-blue-500" />}
                                                        {rental?.shipmentStatus === "shipment_started" &&
                                                            <FiTruck className="text-blue-500" />}
                                                        {rental?.shipmentStatus && <FiTruck className="text-blue-500" />}
                                                        {rental?.shipmentStatus === "delivered" &&
                                                            <FiHome className="text-blue-500" />}
                                                        {rental?.shipmentStatus === "return_started" &&
                                                            <FiSend className="text-blue-500" />}
                                                        {rental?.shipmentStatus === "return_received" &&
                                                            <FiCheck className="text-blue-500" />}
                                                        <span className="ml-1">
                                                            {rental?.shipmentStatus
                                                                ? rental.shipmentStatus
                                                                    .split("_")
                                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                    .join(" ")
                                                                : "Processing Order"}
                                                        </span>
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
                                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Payment Method:
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium">{rental?.rentalStreak[0]?.paymentMethod}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Subtotal:</span>
                                                    <span className="text-sm font-medium">
                                                        {formatCurrency(rental?.rentalStreak[0]?.onlyRentAmount)}
                                                    </span>
                                                </div>
                                                {rental?.rentalStreak[0]?.discountApplied > 0 && (
                                                    <div className="flex justify-between">
                                                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                            Discount ({rental?.rentalStreak[0]?.discountApplied}%):
                                                        </span>
                                                        <span className="text-sm font-medium text-green-500">
                                                            -
                                                            {formatCurrency(
                                                                rental?.rentalStreak[0]?.onlyRentAmount *
                                                                (rental?.rentalStreak[0]?.discountApplied / 100),
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Insurance:</span>
                                                    <span className="text-sm font-medium">
                                                        {formatCurrency(rental?.rentalStreak[0]?.onlyInsuranceAmount)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Shipping:</span>
                                                    <span className="text-sm font-medium">
                                                        {formatCurrency(rental?.rentalStreak[0]?.onlyShippingAmount)}
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex justify-between pt-1 border-t border-dashed border-gray-300 dark:border-gray-600">
                                                    <span
                                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Paid:</span>
                                                    <span className="text-sm font-bold">
                                                        {formatCurrency(rental?.rentalStreak[0]?.payableFinalAmount)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review section */}
                                    <div
                                        className={`mt-6 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium flex items-center gap-2">
                                                <FiStar className="text-yellow-500" />
                                                <span>Review & Rating</span>
                                            </h3>

                                            {(rental?.rentalStatus === "past" || rental?.rentalStatus === "completed") &&
                                                !rental?.isReviewed ? (
                                                <button
                                                    onClick={() => handleReviewNavigation(rental?.order_id)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 cursor-pointer ${darkMode
                                                            ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                                                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                                                        }`}
                                                >
                                                    <FiStar size={14} /> Write Review
                                                </button>
                                            ) : rental?.isReviewed ? (
                                                <div className="flex items-center">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FiStar
                                                                key={i}
                                                                className={i < rental?.rating ? "text-yellow-500 fill-current" : "text-gray-400"}
                                                                size={16}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span
                                                        className="ml-2 text-sm font-medium">{rental?.rating.toFixed(1)}</span>
                                                </div>
                                            ) : (
                                                <span
                                                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
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
                    className={`rounded-xl p-8 text-center ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                        }`}
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <FiShoppingCart className={`${darkMode ? "text-gray-500" : "text-gray-400"}`} size={32} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No rentals found</h3>
                    <p className={`mb-6 max-w-md mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {statusFilter === "active"
                            ? "You don't have any active rentals at the moment."
                            : statusFilter === "completed"
                                ? "You don't have any completed rentals."
                                : statusFilter === "canceled"
                                    ? "You don't have any canceled rentals."
                                    : "No rentals match your search criteria."}
                    </p>
                    <button
                        onClick={() => (window.location.href = "/all-gadgets")}
                        className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
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