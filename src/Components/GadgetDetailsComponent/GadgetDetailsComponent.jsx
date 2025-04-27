import { useState, useEffect, useContext } from "react"
import {useNavigate, useParams} from "react-router-dom"
import { FiArrowLeft, FiStar, FiCalendar, FiClock, FiHeart, FiShare2, FiChevronLeft, FiChevronRight, FiMenu, FiX, FiShield, FiCheckCircle, FiAlertCircle, FiInfo, FiPackage, FiBarChart2, FiLayers } from "react-icons/fi"
import { FaMobileAlt, FaLaptop, FaTabletAlt, FaHeadphones, FaCamera, FaGamepad, FaVolumeUp, FaVrCardboard, FaPlane, FaProjectDiagram, FaClock, FaWifi, FaSpeakerDeck } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfileDetails } from "../../Features/userProfileDetails/userProfileDetailsSlice.js"
import { fetchGadgetDetails } from "../../Features/getGadgetDetailsById/getGadgetDetailsByIdSlice.js"
import { addOrRemoveWishlistGadget } from "../../Features/gadgetWishlist/gadgetWishlistSlice.js"
import AuthContext from "../../Providers/AuthContext.jsx"
import useAxiosSecure from "../../CustomHooks/useAxiosSecure.jsx"
import {toast} from "react-toastify";


const GadgetDetailsComponent = () => {

    const darkMode = useSelector((state) => state.darkMode.isDark)
    const { user: registeredUser } = useContext(AuthContext)
    const dispatch = useDispatch()
    const { userProfileDetails } = useSelector((state) => state.userProfileDetails)
    const { gadgetDetails } = useSelector((state) => state.getGadgetDetailsById)

    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const [gadget, setGadget] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [rentalDuration, setRentalDuration] = useState(3)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("details")
    const [insuranceOption, setInsuranceOption] = useState("basic")
    const navigate = useNavigate()


    // Category icons mapping
    const categoryIcons = {
        Smartphones: <FaMobileAlt className="text-blue-500" />,
        Laptops: <FaLaptop className="text-purple-500" />,
        Tablets: <FaTabletAlt className="text-green-500" />,
        Smartwatches: <FaClock className="text-pink-500" />,
        Cameras: <FaCamera className="text-red-500" />,
        Gaming: <FaGamepad className="text-indigo-500" />,
        Audio: <FaVolumeUp className="text-yellow-500" />,
        Headphones: <FaHeadphones className="text-cyan-500" />,
        Speakers: <FaSpeakerDeck className="text-orange-500" />,
        VR: <FaVrCardboard className="text-orange-500" />,
        Drones: <FaPlane className="text-teal-500" />,
        Projectors: <FaProjectDiagram className="text-amber-500" />,
        Wearables: <FaWifi className="text-lime-500" />,
    }



    // Fetch gadget details on mount
    useEffect(() => {
        dispatch(fetchGadgetDetails(id));
    }, [dispatch, id]);


       // Fetch gadget details data
    useEffect(() => {
        const fetchGadgetDetails = async () => {
            setLoading(true)
            setTimeout(() => {
                if (gadgetDetails !== null) {
                    setGadget(gadgetDetails)
                    setLoading(false)
                    return
                }
                setLoading(false)
            }, 200)
        }
        fetchGadgetDetails().then()
    }, [gadgetDetails, id])


    // Handle image navigation
    const handlePrevImage = () => {
        if (!gadget || !gadget.images || gadget.images.length === 0) return
        setSelectedImage((prev) => (prev === 0 ? gadget.images.length - 1 : prev - 1))
    }


    const handleNextImage = () => {
        if (!gadget || !gadget.images || gadget.images.length === 0) return
        setSelectedImage((prev) => (prev === gadget.images.length - 1 ? 0 : prev + 1))
    }


    // Function to get fully booked dates
    const getBlockedDates = (blockedDates, totalCopy) => {
        if (!blockedDates || !totalCopy) return [];

        // Count occurrences of each date in blockedDates
        const dateCounts = blockedDates.reduce((acc, date) => {
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Filter dates where count >= total_copy
        return Object.keys(dateCounts).filter((date) => dateCounts[date] >= totalCopy);
    };


    // Handle rental duration change
    const handleDurationChange = (e) => {
        setRentalDuration(Number.parseInt(e.target.value))
        updateEndDate(startDate, Number.parseInt(e.target.value))
    }


    // Handle date changes
    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value
        setStartDate(newStartDate)
        updateEndDate(newStartDate, rentalDuration)
    }


    // Update end date based on start date and duration
    const updateEndDate = (start, duration) => {
        if (start) {
            const startDate = new Date(start)
            const end = new Date(startDate)
            end.setDate(startDate.getDate() + duration)

            // Format end date to YYYY-MM-DD
            const formattedEndDate = end.toISOString().split("T")[0]
            setEndDate(formattedEndDate)
        } else {
            setEndDate("")
        }
    }


   // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }


    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }


    // Toggle wishlist
    const toggleWishlist = async () => {
        await dispatch(addOrRemoveWishlistGadget({ userEmail: registeredUser?.email, gadgetId: id, axiosSecure }))
    }


    // Handle back navigation
    const handleBack = () => {
        // navigate("/all-gadgets")
        window.history.back()
    }


    // Handle insurance option change
    const handleInsuranceChange = (option) => {
        setInsuranceOption(option)
    }


  // Calculate total price
  const calculateTotalPrice = () => {
    if (!gadget) return { basePrice: 0, insuranceFee: 0, total: 0 }

    const perDayPrice = gadget?.pricing?.perDay
    const basePrice = gadget?.pricing?.perDay * rentalDuration
    const insuranceFee =
        insuranceOption === "premium"
            ? gadget?.pricing?.premiumInsuranceFee * rentalDuration
            : gadget?.pricing?.basicInsuranceFee * rentalDuration

    return {
        perDayPrice: perDayPrice.toFixed(2),
        basePrice: basePrice.toFixed(2),
        insuranceFee: insuranceFee.toFixed(2),
        total: (basePrice + insuranceFee).toFixed(2),
    }
}


    // Generate a unique order ID
    const generateOrderId = () => {
        const now = new Date()
        const date = now.toISOString().split("T")[0].replace(/-/g, "")
        const time =
            now.getHours().toString().padStart(2, "0") +
            now.getMinutes().toString().padStart(2, "0") +
            now.getSeconds().toString().padStart(2, "0")
        const random = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")
        return `GSRO_${date}_${time}_${random}`
    }


        // Generate an array of dates between start and end date
        const generateDateRange = (start, end) => {
            const dates = []
            const currentDate = new Date(start)
            const endDate = new Date(end)
    
            while (currentDate <= endDate) {
                dates.push(currentDate.toISOString().split("T")[0])
                currentDate.setDate(currentDate.getDate() + 1)
            }
    
            return dates
        }
    
    
        const handleRentNowClick = async () => {
            if (!startDate || !endDate || !gadget) return
    
            if(userProfileDetails?.personalDetails?.verified === false){
                toast.error("Please complete your profile, get verified to rent this gadget!")
                navigate("/dashboard/user/settings")
                return
            }
    
            const blockedDates = generateDateRange(startDate, endDate)
            const priceDetails = calculateTotalPrice()
    
            const perDayAmount = Number.parseFloat(priceDetails.perDayPrice)
            const onlyRentAmount = Number.parseFloat(priceDetails.basePrice)
            const onlyInsuranceAmount = Number.parseFloat(priceDetails.insuranceFee)
            const rentAndInsuranceAmount = Number.parseFloat(priceDetails.total)
    
            const onlyShippingAmount = 5;
    
            const newRentalOrderObj = {
                order_id: generateOrderId(),
                gadget_id: id,
                gadgetName: gadget?.name,
                gadgetImage: gadget?.images?.[0],
                category: gadget?.category,
                rentalStreak: [
                    {
                        perDayPrice: perDayAmount,
    
                        startDate: startDate,
                        endDate: endDate,
                        rentalDuration: rentalDuration,
    
                        onlyRentAmount: onlyRentAmount,
    
                        insuranceOption: insuranceOption,
                        onlyInsuranceAmount: onlyInsuranceAmount,
                        rentAndInsuranceAmount: rentAndInsuranceAmount,
    
                        discountApplied: 0,
                        onlyShippingAmount: onlyShippingAmount,
    
                        payableFinalAmount: rentAndInsuranceAmount + onlyShippingAmount,
                        paymentMethod: "",
    
                        pointsEarned: Math.floor(onlyRentAmount),
                        pointsRedeemed: 0,
                    },
                ],
                blockedDates: blockedDates,
                rentalStatus: "active",
                shipmentStatus: "processing_order",
                customerDetails: {
                    name: userProfileDetails?.displayName,
                    email: userProfileDetails?.email,
                    phone: userProfileDetails?.personalDetails?.phone,
                    billingAddress: {
                        street: userProfileDetails?.personalDetails?.billingAddress?.street,
                        city: userProfileDetails?.personalDetails?.billingAddress?.city,
                        zipCode: userProfileDetails?.personalDetails?.billingAddress?.zipCode,
                        state: userProfileDetails?.personalDetails?.billingAddress?.state,
                        country: userProfileDetails?.personalDetails?.billingAddress?.country,
                    },
                    membershipTier: userProfileDetails?.membershipDetails?.membershipTier,
                    currentPoint: userProfileDetails?.membershipDetails?.points,
                },
                hasInvoice: true,
                isReviewed: false,
                rating: 0,
            }
    
            // console.log(newRentalOrderObj);
            await navigate(`/selected-gadget/rental_order/${newRentalOrderObj?.order_id}/payment`, { state: { newRentalOrderObj } });
        }
    

     // Format date for display
     const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    }


    // Calculate average rating
    const getAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0
        const sum = ratings.reduce((acc, rating) => acc + rating, 0)
        return (sum / ratings.length).toFixed(1)
    }


    // Render loading skeleton
    const renderSkeleton = () => (
        <div className={`mx-auto px-4 py-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
            <div className="container mx-auto animate-pulse">
                <div className="flex items-center mb-6">
                    <div className={`h-10 w-10 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                    <div className={`h-6 w-32 ml-4 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className={`h-96 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>

                    <div className="space-y-4">
                        <div className={`h-8 w-3/4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className={`h-6 w-1/4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className={`h-4 w-full ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className={`h-4 w-full ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className={`h-4 w-3/4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className={`h-12 w-full mt-6 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                    </div>
                </div>
            </div>
        </div>
    )


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })
    }, [])


    // If loading, show the skeleton
    if (loading) {
        return renderSkeleton()
    }



    // If gadget not found
    if (!gadget) {
        return (
            <div
                className={`container mx-auto px-4 py-16 text-center ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
            >
                <FiAlertCircle className="mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold mb-2">Gadget Not Found</h2>
                <p className="mb-6">The gadget you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={handleBack}
                    className={`px-6 py-2 rounded-lg flex items-center mx-auto cursor-pointer ${
                        darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                >
                    <FiArrowLeft className="mr-2" />
                    Back to All Gadgets
                </button>
            </div>
        )
    }


    // Calculate price details
    const priceDetails = calculateTotalPrice()


    // Get average rating
    const averageRating = gadget.average_rating || getAverageRating(gadget.ratings)


    return (
        <div
            className={`min-h-[calc(100vh-421px)] pt-16 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
        >
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={`fixed inset-0 z-50 lg:hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}>
                    <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <button
                            onClick={toggleMobileMenu}
                            className={`p-2 rounded-full cursor-pointer ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                            aria-label="Close menu"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                    <nav className="p-4">
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={() => {
                                        handleTabChange("details")
                                        toggleMobileMenu()
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                                        activeTab === "details"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Details
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        handleTabChange("specs")
                                        toggleMobileMenu()
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                                        activeTab === "specs"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Specifications
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        handleTabChange("reviews")
                                        toggleMobileMenu()
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                                        activeTab === "reviews"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Reviews
                                </button>
                            </li>
                            {registeredUser && (
                                <li>
                                    <button
                                        onClick={() => {
                                            handleTabChange("rental")
                                            toggleMobileMenu()
                                        }}
                                        className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                                            activeTab === "rental"
                                                ? "bg-blue-600 text-white"
                                                : darkMode
                                                    ? "hover:bg-gray-800"
                                                    : "hover:bg-gray-100"
                                        }`}
                                    >
                                        Rental Options
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                {/* Header with Back Button and Dark Mode Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleBack}
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                            darkMode
                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                        }`}
                        aria-label="Go back"
                    >
                        <FiArrowLeft className="mr-2" />
                        <span className="hidden sm:inline">Back</span>
                    </button>

                    <div className="flex items-center space-x-2">
                        {registeredUser && userProfileDetails?.role === "user" && (
                            <button
                                onClick={toggleWishlist}
                                className={`p-2 rounded-full cursor-pointer ${
                                    darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 shadow-sm"
                                }`}
                                aria-label={userProfileDetails?.wishlist?.includes(id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                <FiHeart
                                    size={20}
                                    className={userProfileDetails?.wishlist?.includes(id) ? "text-red-500 fill-current" : ""}
                                />
                            </button>
                        )}

                        {registeredUser && (
                            <button
                                className={`p-2 rounded-full cursor-pointer ${
                                    darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 shadow-sm"
                                }`}
                                aria-label="Share"
                            >
                                <FiShare2 size={20} />
                            </button>
                        )}
                        <button
                            onClick={toggleMobileMenu}
                            className={`p-2 rounded-full lg:hidden cursor-pointer ${
                                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 shadow-sm"
                            }`}
                            aria-label="Open menu"
                        >
                            <FiMenu size={20} />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div
                            className={`relative rounded-xl overflow-hidden aspect-[4/3] ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
                        >
                            <img
                                src={gadget?.images?.[selectedImage] || "/placeholder.svg"}
                                alt={gadget?.name}
                                className="w-full h-full object-cover"
                            />

                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors cursor-pointer"
                                aria-label="Previous image"
                            >
                                <FiChevronLeft size={24} />
                            </button>

                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors cursor-pointer"
                                aria-label="Next image"
                            >
                                <FiChevronRight size={24} />
                            </button>

                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {gadget?.images?.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-2 h-2 rounded-full cursor-pointer ${selectedImage === index ? "bg-white" : "bg-white/50"}`}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                            {gadget?.images?.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`rounded-lg overflow-hidden aspect-square cursor-pointer ${
                                        selectedImage === index ? "ring-2 ring-blue-500" : darkMode ? "bg-gray-800" : "bg-gray-100"
                                    }`}
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`${gadget?.name} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gadget Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center mb-2">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
                                    }`}
                                >
                                  {categoryIcons[gadget?.category]}
                                    <span className="ml-1">{gadget?.category}</span>
                                </span>

                                <div className="flex items-center ml-4">
                                    <FiStar className="text-yellow-500" />
                                    <span className="ml-1 text-sm font-medium">{averageRating}</span>
                                    <span className={`ml-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    ({gadget?.ratings?.length} reviews)
                                </span>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold">{gadget?.name}</h1>
                            <p className="text-sm mt-1">
                                <span className="font-medium">{gadget?.brand}</span> • Model: {gadget?.model}
                            </p>

                            <div className="mt-2 flex items-baseline">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    ${gadget?.pricing?.perDay?.toFixed(2)}
                                </span>
                                <span className={`ml-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>/ day</span>
                            </div>
                        </div>

                        {/* Tabs - Desktop */}
                        <div className="hidden lg:block">
                            <div className="border-b border-gray-200 dark:border-gray-700">
                                <nav className="flex space-x-8">
                                    <button
                                        onClick={() => handleTabChange("details")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                                            activeTab === "details"
                                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => handleTabChange("specs")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                                            activeTab === "specs"
                                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        Specifications
                                    </button>
                                    <button
                                        onClick={() => handleTabChange("reviews")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                                            activeTab === "reviews"
                                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        Reviews
                                    </button>
                                    {registeredUser && (
                                        <button
                                            onClick={() => handleTabChange("rental")}
                                            className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                                                activeTab === "rental"
                                                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                    : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                            }`}
                                        >
                                            Rental Options
                                        </button>
                                    )}
                                </nav>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="py-4">
                            {activeTab === "details" && (
                                <div className="space-y-4">
                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{gadget?.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                                            <div className="flex items-center mb-2">
                                                <FiShield className="text-green-500 mr-2" />
                                                <h3 className="font-medium">Damage Protection</h3>
                                            </div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                Basic coverage against accidental damage included. Premium protection available.
                                            </p>
                                        </div>

                                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                                            <div className="flex items-center mb-2">
                                                <FiPackage className="text-blue-500 mr-2" />
                                                <h3 className="font-medium">What's Included</h3>
                                            </div>
                                            <ul className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                {gadget?.included?.slice(0, 2).map((item, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <FiCheckCircle className="text-green-500 mr-1 flex-shrink-0" size={14} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                                {gadget?.included?.length > 2 && (
                                                    <li className="text-blue-500 cursor-pointer mt-1" onClick={() => handleTabChange("specs")}>
                                                        + {gadget.included.length - 2} more items
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                                        <h3 className="font-medium mb-2">Rental Stats</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <FiBarChart2 className="text-purple-500 mr-2" />
                                                <div>
                                                    <p className="font-medium">Total Rentals</p>
                                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                        {gadget?.totalRentalCount} successful rentals
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <FiLayers className="text-teal-500 mr-2" />
                                                <div>
                                                    <p className="font-medium">Availability</p>
                                                    <p className={`text-sm ${gadget?.availability?.status ? "text-green-500" : "text-red-500"}`}>
                                                        {gadget?.availability?.status ? "Available Now" : "Currently Unavailable"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "specs" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium mb-3">Technical Specifications</h3>
                                        <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                            {Object.entries(gadget?.specifications || {}).map(([key, value], index, arr) => (
                                                <div
                                                    key={key}
                                                    className={`flex py-3 px-4 ${
                                                        index !== arr.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""
                                                    }`}
                                                >
                                                    <span
                                                      className={`w-1/3 font-medium capitalize ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                                    >
                                                        {key}
                                                    </span>
                                                    <span className={`w-2/3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-3">What's Included</h3>
                                        <ul className="space-y-2">
                                            {gadget?.included?.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                                        <div className="flex items-start">
                                            <FiInfo className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                            <div>
                                                <h4 className={`font-medium ${darkMode ? "text-blue-400" : "text-blue-800"}`}>
                                                    Care Instructions
                                                </h4>
                                                <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                    Please handle with care. Any damage beyond normal wear and tear may incur additional charges.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <FiStar className="text-yellow-500" size={24} />
                                            <span className="ml-2 text-2xl font-bold">{averageRating}</span>
                                        </div>
                                        <div className="ml-4">
                                            <span className="text-sm font-medium">{gadget?.ratings?.length} reviews</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {gadget?.reviews?.map((review, index) => (
                                            <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                            {review?.reviewer_name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="font-medium">{review?.reviewer_name}</p>
                                                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                Verified Renter
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FiStar
                                                                key={i}
                                                                className={
                                                                    i < Math.floor(averageRating) ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                                                                }
                                                                size={16}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className={`mt-3 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                    {review?.review_text}
                                                </p>
                                            </div>
                                        ))}

                                        {(!gadget?.reviews || gadget.reviews.length === 0) && (
                                            <div className={`p-4 text-center rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <p className="text-sm">No reviews yet. Be the first to review this gadget!</p>
                                            </div>
                                        )}
                                    </div>

                                    {gadget?.reviews?.length > 2 && (
                                        <button
                                            className={`w-full py-2 rounded-lg text-center text-sm cursor-pointer ${
                                                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                        >
                                            View All Reviews
                                        </button>
                                    )}
                                </div>
                            )}

                            {registeredUser && activeTab === "rental" && (
                                <div className="space-y-6">
                                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                        <h3 className="font-medium mb-4">Rental Period</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label
                                                    className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                                >
                                                    Start Date
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        value={startDate}
                                                        onChange={handleStartDateChange}
                                                        min={new Date().toISOString().split("T")[0]}
                                                        className={`w-full p-2 pr-10 rounded-lg border cursor-pointer ${
                                                            darkMode
                                                                ? "bg-gray-700 border-gray-600 text-white"
                                                                : "bg-white border-gray-300 text-gray-900"
                                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    />
                                                    <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                                >
                                                    Rental Duration (days)
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={rentalDuration}
                                                        onChange={handleDurationChange}
                                                        className={`w-full p-2 pr-10 rounded-lg border appearance-none cursor-pointer ${
                                                            darkMode
                                                                ? "bg-gray-700 border-gray-600 text-white"
                                                                : "bg-white border-gray-300 text-gray-900"
                                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    >
                                                        {[1, 2, 3, 5, 7, 14, 30].map((days) => (
                                                            <option key={days} value={days}>
                                                                {days} {days === 1 ? "day" : "days"}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <FiClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                                >
                                                    End Date
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        value={endDate}
                                                        disabled
                                                        className={`w-full p-2 pr-10 rounded-lg border ${
                                                            darkMode
                                                                ? "bg-gray-700 border-gray-600 text-white"
                                                                : "bg-white border-gray-300 text-gray-900"
                                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-70`}
                                                    />
                                                    <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                                >
                                                    Insurance Option
                                                </label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => handleInsuranceChange("basic")}
                                                        className={`p-3 rounded-lg border text-left cursor-pointer ${
                                                            insuranceOption === "basic"
                                                                ? darkMode
                                                                    ? "bg-blue-900/30 border-blue-500"
                                                                    : "bg-blue-50 border-blue-500"
                                                                : darkMode
                                                                    ? "bg-gray-700 border-gray-600"
                                                                    : "bg-white border-gray-300"
                                                        }`}
                                                    >
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-medium">Basic</span>
                                                            <span className="text-sm font-bold">
                                                                ${gadget?.pricing?.basicInsuranceFee?.toFixed(2)}/day
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Covers accidental damage up to 50% of deposit
                                                        </p>
                                                    </button>

                                                    <button
                                                        onClick={() => handleInsuranceChange("premium")}
                                                        className={`p-3 rounded-lg border text-left cursor-pointer ${
                                                            insuranceOption === "premium"
                                                                ? darkMode
                                                                    ? "bg-blue-900/30 border-blue-500"
                                                                    : "bg-blue-50 border-blue-500"
                                                                : darkMode
                                                                    ? "bg-gray-700 border-gray-600"
                                                                    : "bg-white border-gray-300"
                                                        }`}
                                                    >
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-medium">Premium</span>
                                                            <span className="text-sm font-bold">
                                                                ${gadget?.pricing?.premiumInsuranceFee?.toFixed(2)}/day
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Full coverage for all types of damage
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                            <h4 className="font-medium mb-2">Price Summary</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                        ${gadget?.pricing?.perDay?.toFixed(2)} × {rentalDuration} days
                                                    </span>
                                                    <span className="font-medium">${priceDetails.basePrice}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                        {insuranceOption === "premium" ? "Premium" : "Basic"} Insurance
                                                    </span>
                                                    <span className="font-medium">${priceDetails.insuranceFee}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Shipping</span>
                                                    <span className="font-medium">$5.00</span>
                                                </div>
                                                <div className="border-t border-gray-200 dark:border-gray-600 my-2 pt-2 flex justify-between">
                                                    <span className="font-bold">Total</span>
                                                    <span className="font-bold">${(Number.parseFloat(priceDetails.total) + 5).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                        <h3 className="font-medium mb-4">Unavailable Dates</h3>
                                        {(() => {
                                            const fullyBookedDates = getBlockedDates(
                                                gadget?.availability?.blockedDates,
                                                gadget?.availability?.total_copy
                                            );

                                            return fullyBookedDates.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {fullyBookedDates.map((date, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1 rounded-md text-sm ${
                                                                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                                                            }`}
                                                        >
                                                        {formatDate(date)}
                                                    </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                    No unavailable dates. This gadget has available copies.
                                                </p>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rent Button now */}
                        {registeredUser && userProfileDetails?.role === "user" && (
                            <button
                                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                                    startDate
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!startDate}
                                onClick={handleRentNowClick}
                            >
                                {startDate ? "Rent Now" : "Select a start date"}
                            </button>
                        )}

                        {/* Quick Actions */}
                        <div className="flex gap-3 mt-4">
                            {registeredUser && userProfileDetails?.role === "user" && (
                                <button
                                    onClick={toggleWishlist}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center cursor-pointer ${
                                        darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    <FiHeart
                                        className={`mr-2 ${userProfileDetails?.wishlist?.includes(id) ? "text-red-500 fill-current" : ""}`}
                                        size={16}
                                    />
                                    {userProfileDetails?.wishlist?.includes(id) ? "Saved" : "Save"}
                                </button>
                            )}

                            {registeredUser && (
                                <button
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center cursor-pointer ${
                                        darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    <FiShare2 className="mr-2" size={16} />
                                    Share
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GadgetDetailsComponent;
