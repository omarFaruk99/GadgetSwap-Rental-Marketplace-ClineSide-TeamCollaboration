import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {
    FiArrowLeft,
    FiStar,
    FiCalendar,
    FiClock,
    FiHeart,
    FiShare2,
    FiChevronLeft,
    FiChevronRight,
    FiMoon,
    FiSun,
    FiMenu,
    FiX,
    FiMessageSquare,
    FiShield,
    FiCheckCircle,
    FiAlertCircle,
    FiInfo,
    FiPackage,
    FiBarChart2,
    FiLayers,
} from "react-icons/fi"
import {
    FaMobileAlt,
    FaLaptop,
    FaTabletAlt,
    FaHeadphones,
    FaCamera,
    FaGamepad,
    FaVolumeUp,
    FaVrCardboard,
    FaPlane,
    FaProjectDiagram,
    FaClock,
    FaWifi,
    FaSpeakerDeck,
} from "react-icons/fa"
import useTheme from "../../CustomHooks/useTheme.jsx";


const GadgetDetailsComponent = () => {

    // const [darkMode, setDarkMode] = useState(false);
    const {darkMode} = useTheme();


    const {id} = useParams()
    const [gadget, setGadget] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [rentalDuration, setRentalDuration] = useState(3)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [relatedGadgets, setRelatedGadgets] = useState([])
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("details")
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [insuranceOption, setInsuranceOption] = useState("basic")
    const [showDatePicker, setShowDatePicker] = useState(false)


    // Category icons mapping
    const categoryIcons = {
        Smartphones: <FaMobileAlt className="text-blue-500"/>,
        Laptops: <FaLaptop className="text-purple-500"/>,
        Tablets: <FaTabletAlt className="text-green-500"/>,
        Smartwatches: <FaClock className="text-pink-500"/>,
        Cameras: <FaCamera className="text-red-500"/>,
        Gaming: <FaGamepad className="text-indigo-500"/>,
        Audio: <FaVolumeUp className="text-yellow-500"/>,
        Headphones: <FaHeadphones className="text-cyan-500"/>,
        Speakers: <FaSpeakerDeck className="text-orange-500"/>,
        VR: <FaVrCardboard className="text-orange-500"/>,
        Drones: <FaPlane className="text-teal-500"/>,
        Projectors: <FaProjectDiagram className="text-amber-500"/>,
        Wearables: <FaWifi className="text-lime-500"/>,
    }


    // Fetch gadget data
    useEffect(() => {
        const fetchGadgetDetails = async () => {
            setLoading(true)
            // Simulate API call with ID from params
            setTimeout(() => {
                // Find gadget by ID or get a random one if ID not found
                const gadgetData =
                    mockGadgetsData.find((g) => g.id === id) ||
                    mockGadgetsData[Math.floor(Math.random() * mockGadgetsData.length)]

                // Get related gadgets (same category but different ID)
                const related = mockGadgetsData
                    .filter((g) => g.category === gadgetData.category && g.id !== gadgetData.id)
                    .slice(0, 4)

                setGadget(gadgetData)
                setRelatedGadgets(related)
                setLoading(false)
            }, 1000)
        }

        fetchGadgetDetails().then()
    }, [id])


    // Handle image navigation
    const handlePrevImage = () => {
        if (!gadget || !gadget.images || gadget.images.length === 0) return
        setSelectedImage((prev) => (prev === 0 ? gadget.images.length - 1 : prev - 1))
    }


    const handleNextImage = () => {
        if (!gadget || !gadget.images || gadget.images.length === 0) return
        setSelectedImage((prev) => (prev === gadget.images.length - 1 ? 0 : prev + 1))
    }


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
    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted)
    }


    // Handle back navigation
    const handleBack = () => {
        // navigate("/all-gadgets")
        window.history.back();
    }


    // Handle insurance option change
    const handleInsuranceChange = (option) => {
        setInsuranceOption(option)
    }


    // Toggle date picker visibility
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker)
    }


    // Calculate total price
    const calculateTotalPrice = () => {
        if (!gadget) return {basePrice: 0, insuranceFee: 0, total: 0}

        const basePrice = gadget.pricing.perDay * rentalDuration
        const insuranceFee =
            insuranceOption === "premium"
                ? gadget.pricing.premiumInsuranceFee * rentalDuration
                : gadget.pricing.basicInsuranceFee * rentalDuration

        return {
            basePrice: basePrice.toFixed(2),
            insuranceFee: insuranceFee.toFixed(2),
            total: (basePrice + insuranceFee).toFixed(2),
        }
    }


    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric"})
    }


    // Calculate average rating
    const getAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0
        const sum = ratings.reduce((acc, rating) => acc + rating, 0)
        return (sum / ratings.length).toFixed(1)
    }


    // Render loading skeleton
    const renderSkeleton = () => (
        <div
            className={`mx-auto px-4 py-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
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
        });
    }, []);


    // If loading, show skeleton
    if (loading) {
        return renderSkeleton()
    }


    // If gadget not found
    if (!gadget) {
        return (
            <div
                className={`container mx-auto px-4 py-16 text-center ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
            >
                <FiAlertCircle className="mx-auto mb-4" size={48}/>
                <h2 className="text-2xl font-bold mb-2">Gadget Not Found</h2>
                <p className="mb-6">The gadget you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={handleBack}
                    className={`px-6 py-2 rounded-lg flex items-center mx-auto ${
                        darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                >
                    <FiArrowLeft className="mr-2"/>
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
                    <div
                        className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <button
                            onClick={toggleMobileMenu}
                            className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                            aria-label="Close menu"
                        >
                            <FiX size={24}/>
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
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
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
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
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
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
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
                            <li>
                                <button
                                    onClick={() => {
                                        handleTabChange("rental")
                                        toggleMobileMenu()
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
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
                        </ul>
                    </nav>
                </div>
            )}

            <div className="container mx-auto px-4 py-8">

                {/* Header with Back Button and Dark Mode Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleBack}
                        className={`flex items-center px-3 py-2 rounded-lg ${
                            darkMode
                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                        }`}
                        aria-label="Go back"
                    >
                        <FiArrowLeft className="mr-2"/>
                        <span className="hidden sm:inline">Back</span>
                    </button>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleWishlist}
                            className={`p-2 rounded-full ${
                                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 shadow-sm"
                            }`}
                            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <FiHeart size={20} className={isWishlisted ? "text-red-500 fill-current" : ""}/>
                        </button>

                        <button
                            className={`p-2 rounded-full ${
                                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 shadow-sm"
                            }`}
                            aria-label="Share"
                        >
                            <FiShare2 size={20}/>
                        </button>
                        <button
                            onClick={toggleMobileMenu}
                            className={`p-2 rounded-full lg:hidden ${
                                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 shadow-sm"
                            }`}
                            aria-label="Open menu"
                        >
                            <FiMenu size={20}/>
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
                                src={gadget.images[selectedImage] || "/placeholder.svg"}
                                alt={gadget.name}
                                className="w-full h-full object-cover"
                            />

                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                                aria-label="Previous image"
                            >
                                <FiChevronLeft size={24}/>
                            </button>

                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                                aria-label="Next image"
                            >
                                <FiChevronRight size={24}/>
                            </button>

                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {gadget.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-2 h-2 rounded-full ${selectedImage === index ? "bg-white" : "bg-white/50"}`}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                            {gadget.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`rounded-lg overflow-hidden aspect-square ${
                                        selectedImage === index ? "ring-2 ring-blue-500" : darkMode ? "bg-gray-800" : "bg-gray-100"
                                    }`}
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`${gadget.name} thumbnail ${index + 1}`}
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
                                    {categoryIcons[gadget.category]}
                                    <span className="ml-1">{gadget.category}</span>
                                </span>

                                <div className="flex items-center ml-4">
                                    <FiStar className="text-yellow-500"/>
                                    <span className="ml-1 text-sm font-medium">{averageRating}</span>
                                    <span className={`ml-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        ({gadget.ratings.length} reviews)
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold">{gadget.name}</h1>
                            <p className="text-sm mt-1">
                                <span className="font-medium">{gadget.brand}</span> • Model: {gadget.model}
                            </p>

                            <div className="mt-2 flex items-baseline">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    ${gadget.pricing.perDay.toFixed(2)}
                                </span>
                                <span
                                    className={`ml-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>/ day</span>
                                <span className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    ${gadget.pricing.deposit.toFixed(2)} deposit
                                </span>
                            </div>
                        </div>

                        {/* Tabs - Desktop */}
                        <div className="hidden lg:block">
                            <div className="border-b border-gray-200 dark:border-gray-700">
                                <nav className="flex space-x-8">
                                    <button
                                        onClick={() => handleTabChange("details")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "details"
                                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => handleTabChange("specs")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "specs"
                                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        Specifications
                                    </button>
                                    <button
                                        onClick={() => handleTabChange("reviews")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "reviews"
                                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        Reviews
                                    </button>
                                    <button
                                        onClick={() => handleTabChange("rental")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "rental"
                                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        Rental Options
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="py-4">
                            {activeTab === "details" && (
                                <div className="space-y-4">
                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{gadget.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                                            <div className="flex items-center mb-2">
                                                <FiShield className="text-green-500 mr-2"/>
                                                <h3 className="font-medium">Damage Protection</h3>
                                            </div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                Basic coverage against accidental damage included. Premium protection
                                                available.
                                            </p>
                                        </div>

                                        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                                            <div className="flex items-center mb-2">
                                                <FiPackage className="text-blue-500 mr-2"/>
                                                <h3 className="font-medium">What's Included</h3>
                                            </div>
                                            <ul className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                {gadget.included.slice(0, 2).map((item, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <FiCheckCircle className="text-green-500 mr-1 flex-shrink-0"
                                                                       size={14}/>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                                {gadget.included.length > 2 && (
                                                    <li className="text-blue-500 cursor-pointer mt-1"
                                                        onClick={() => handleTabChange("specs")}>
                                                        + {gadget.included.length - 2} more items
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                                        <h3 className="font-medium mb-2">Rental Stats</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <FiBarChart2 className="text-purple-500 mr-2"/>
                                                <div>
                                                    <p className="font-medium">Total Rentals</p>
                                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                        {gadget.totalRentalCount} successful rentals
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <FiLayers className="text-teal-500 mr-2"/>
                                                <div>
                                                    <p className="font-medium">Availability</p>
                                                    <p className={`text-sm ${gadget.availability.status ? "text-green-500" : "text-red-500"}`}>
                                                        {gadget.availability.status ? "Available Now" : "Currently Unavailable"}
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
                                        <div
                                            className={`rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                            {Object.entries(gadget.specifications).map(([key, value], index, arr) => (
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
                                                    <span
                                                        className={`w-2/3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-3">What's Included</h3>
                                        <ul className="space-y-2">
                                            {gadget.included.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0"/>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                                        <div className="flex items-start">
                                            <FiInfo className="text-blue-500 mt-1 mr-2 flex-shrink-0"/>
                                            <div>
                                                <h4 className={`font-medium ${darkMode ? "text-blue-400" : "text-blue-800"}`}>
                                                    Care Instructions
                                                </h4>
                                                <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                    Please handle with care. Any damage beyond normal wear and tear may
                                                    incur additional charges
                                                    from the security deposit.
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
                                            <FiStar className="text-yellow-500" size={24}/>
                                            <span className="ml-2 text-2xl font-bold">{averageRating}</span>
                                        </div>
                                        <div className="ml-4">
                                            <span className="text-sm font-medium">{gadget.ratings.length} reviews</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {gadget.reviews.map((review, index) => (
                                            <div key={index}
                                                 className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                            {review.reviewer_name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="font-medium">{review.reviewer_name}</p>
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
                                                    {review.review_text}
                                                </p>
                                            </div>
                                        ))}

                                        {gadget.reviews.length === 0 && (
                                            <div
                                                className={`p-4 text-center rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <p className="text-sm">No reviews yet. Be the first to review this
                                                    gadget!</p>
                                            </div>
                                        )}
                                    </div>

                                    {gadget.reviews.length > 2 && (
                                        <button
                                            className={`w-full py-2 rounded-lg text-center text-sm ${
                                                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                        >
                                            View All Reviews
                                        </button>
                                    )}
                                </div>
                            )}

                            {activeTab === "rental" && (
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
                                                        className={`w-full p-2 pr-10 rounded-lg border ${
                                                            darkMode
                                                                ? "bg-gray-700 border-gray-600 text-white"
                                                                : "bg-white border-gray-300 text-gray-900"
                                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    />
                                                    <FiCalendar
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
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
                                                        className={`w-full p-2 pr-10 rounded-lg border appearance-none ${
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
                                                    <FiClock
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
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
                                                    <FiCalendar
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
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
                                                        className={`p-3 rounded-lg border text-left ${
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
                                                                ${gadget.pricing.basicInsuranceFee.toFixed(2)}/day
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Covers accidental damage up to 50% of deposit
                                                        </p>
                                                    </button>

                                                    <button
                                                        onClick={() => handleInsuranceChange("premium")}
                                                        className={`p-3 rounded-lg border text-left ${
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
                                                                ${gadget.pricing.premiumInsuranceFee.toFixed(2)}/day
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Full coverage for all types of damage
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                            <h4 className="font-medium mb-2">Price Summary</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                        ${gadget.pricing.perDay.toFixed(2)} × {rentalDuration} days
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
                                                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                                        Security Deposit (refundable)
                                                    </span>
                                                    <span
                                                        className="font-medium">${gadget.pricing.deposit.toFixed(2)}</span>
                                                </div>
                                                <div
                                                    className="border-t border-gray-200 dark:border-gray-600 my-2 pt-2 flex justify-between">
                                                    <span className="font-bold">Total</span>
                                                    <span className="font-bold">
                                                        ${(Number.parseFloat(priceDetails.total) + gadget.pricing.deposit).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                        <h3 className="font-medium mb-4">Blocked Dates</h3>
                                        {gadget.availability.blockedDates.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {gadget.availability.blockedDates.map((date, index) => (
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
                                                No blocked dates. This gadget is available for all dates.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rent Now Button */}
                        <button
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                                startDate
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!startDate}
                        >
                            {startDate ? "Rent Now" : "Select a start date"}
                        </button>

                        {/* Quick Actions */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={toggleWishlist}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
                                    darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                <FiHeart className={`mr-2 ${isWishlisted ? "text-red-500 fill-current" : ""}`}
                                         size={16}/>
                                {isWishlisted ? "Saved" : "Save"}
                            </button>

                            <button
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
                                    darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                <FiMessageSquare className="mr-2" size={16}/>
                                Contact Owner
                            </button>

                            <button
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
                                    darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                <FiShare2 className="mr-2" size={16}/>
                                Share
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Gadgets */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">You might also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedGadgets.map((relatedGadget) => (
                            <div
                                key={relatedGadget.id}
                                className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                                    darkMode ? "bg-gray-800 hover:bg-gray-750 shadow-lg" : "bg-white hover:bg-gray-50 shadow-md"
                                }`}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={relatedGadget.images[0] || "/placeholder.svg"}
                                        alt={relatedGadget.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                                            darkMode ? "bg-gray-900/80 text-white" : "bg-white/80 text-gray-900"
                                        }`}
                                    >
                                        {relatedGadget.category}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3
                                        className={`text-lg font-medium mb-2 line-clamp-1 transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                        {relatedGadget.name}
                                    </h3>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <FiStar className="text-yellow-500 mr-1" size={16}/>
                                            <span
                                                className={`text-sm font-medium transition-colors ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                                            >
                                                {relatedGadget.average_rating || getAverageRating(relatedGadget.ratings)}
                                            </span>
                                        </div>
                                        <div
                                            className={`text-lg font-bold transition-colors ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                                        >
                                            ${relatedGadget.pricing.perDay.toFixed(2)}
                                            <span className="text-xs font-normal">/day</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Mock data for gadgets
const mockGadgetsData = [
    // Smartphone
    {
        id: "smartphone1",
        name: "iPhone 15 Pro Max",
        category: "Smartphones",
        brand: "Apple",
        model: "A2849",
        description:
            "Experience the latest Apple iPhone with A17 Pro chip, 48MP camera system, and titanium design. This device features a stunning Super Retina XDR display with ProMotion technology, all-day battery life, and the powerful iOS 17 operating system. Perfect for photography, gaming, and everyday use.",
        specifications: {
            display: "6.7-inch Super Retina XDR OLED",
            processor: "A17 Pro chip",
            storage: "256GB",
            camera: "48MP main, 12MP ultrawide, 12MP telephoto",
            battery: "4,422 mAh",
            os: "iOS 17",
        },
        included: [
            "iPhone 15 Pro Max device",
            "USB-C to USB-C cable",
            "Documentation",
            "Protective case",
            "Screen protector (pre-applied)",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 24.99,
            deposit: 200.0,
            basicInsuranceFee: 2.99,
            premiumInsuranceFee: 5.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-24", "2023-12-25", "2023-12-31", "2024-01-01"],
        },
        ratings: [4.8, 5.0, 4.9, 5.0, 4.7],
        average_rating: 4.9,
        reviews: [
            {
                reviewer_id: "user123",
                reviewer_name: "Sarah M.",
                reviewer_email: "sarah@example.com",
                review_text:
                    "Amazing phone! It was in perfect condition and the battery lasted all day. The camera quality is outstanding.",
            },
            {
                reviewer_id: "user456",
                reviewer_name: "Michael T.",
                reviewer_email: "michael@example.com",
                review_text:
                    "Great experience renting this iPhone. The owner was very responsive and the pickup process was smooth.",
            },
        ],
        totalRentalCount: 28,
    },

    // Laptop
    {
        id: "laptop1",
        name: 'MacBook Pro 16" M3 Max',
        category: "Laptops",
        brand: "Apple",
        model: "A2485",
        description:
            "The most powerful MacBook Pro ever is here. With the blazing-fast M3 Max chip, stunning Liquid Retina XDR display, and up to 32 hours of battery life. Perfect for professional video editing, 3D rendering, software development, and any demanding creative work.",
        specifications: {
            display: "16-inch Liquid Retina XDR",
            processor: "Apple M3 Max",
            storage: "1TB SSD",
            memory: "32GB unified memory",
            graphics: "30-core GPU",
            battery: "Up to 22 hours",
        },
        included: [
            'MacBook Pro 16" device',
            "140W USB-C Power Adapter",
            "USB-C to MagSafe 3 Cable",
            "Documentation",
            "Protective sleeve",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 49.99,
            deposit: 500.0,
            basicInsuranceFee: 5.99,
            premiumInsuranceFee: 12.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-20", "2023-12-21", "2023-12-22"],
        },
        ratings: [4.9, 5.0, 4.8, 5.0, 4.9],
        average_rating: 4.9,
        reviews: [
            {
                reviewer_id: "user789",
                reviewer_name: "David L.",
                reviewer_email: "david@example.com",
                review_text:
                    "Incredible machine! I needed it for a video editing project and it handled 4K footage like a breeze. Highly recommend.",
            },
            {
                reviewer_id: "user101",
                reviewer_name: "Jennifer K.",
                reviewer_email: "jennifer@example.com",
                review_text:
                    "Perfect condition and super fast. Battery life is amazing - I worked all day without needing to plug in.",
            },
        ],
        totalRentalCount: 42,
    },

    // Tablet
    {
        id: "tablet1",
        name: 'iPad Pro 12.9" M2',
        category: "Tablets",
        brand: "Apple",
        model: "A2436",
        description:
            "The ultimate iPad experience with the powerful M2 chip, stunning Liquid Retina XDR display, and support for Apple Pencil and Magic Keyboard. Perfect for digital artists, designers, and professionals who need desktop-class performance in a portable device.",
        specifications: {
            display: "12.9-inch Liquid Retina XDR",
            processor: "Apple M2 chip",
            storage: "512GB",
            camera: "12MP wide, 10MP ultra-wide",
            battery: "Up to 10 hours",
            connectivity: "Wi-Fi 6E, Bluetooth 5.3",
        },
        included: [
            'iPad Pro 12.9" device',
            "USB-C Charging Cable",
            "20W USB-C Power Adapter",
            "Documentation",
            "Protective case",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 29.99,
            deposit: 300.0,
            basicInsuranceFee: 3.99,
            premiumInsuranceFee: 7.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-15", "2023-12-16"],
        },
        ratings: [4.8, 4.7, 5.0, 4.9, 4.8],
        average_rating: 4.8,
        reviews: [
            {
                reviewer_id: "user202",
                reviewer_name: "Emma S.",
                reviewer_email: "emma@example.com",
                review_text:
                    "Perfect for my design work while traveling. The display is gorgeous and the Apple Pencil works flawlessly.",
            },
        ],
        totalRentalCount: 35,
    },

    // Smartwatch
    {
        id: "smartwatch1",
        name: "Apple Watch Ultra 2",
        category: "Smartwatches",
        brand: "Apple",
        model: "A2686",
        description:
            "The most rugged and capable Apple Watch ever, with a robust titanium case, precision dual-frequency GPS, up to 36 hours of battery life, and three specialized bands for outdoor adventures, water sports, and endurance training.",
        specifications: {
            display: "49mm Always-On Retina LTPO OLED",
            processor: "S9 SiP",
            storage: "64GB",
            battery: "Up to 36 hours (72 hours in Low Power Mode)",
            water_resistance: "100m water resistant",
            connectivity: "LTE, Wi-Fi, Bluetooth 5.3",
        },
        included: [
            "Apple Watch Ultra 2",
            "Alpine Loop, Trail Loop, or Ocean Band",
            "Fast Charging USB-C Cable",
            "Documentation",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 14.99,
            deposit: 150.0,
            basicInsuranceFee: 1.99,
            premiumInsuranceFee: 3.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-10", "2023-12-11", "2023-12-12"],
        },
        ratings: [4.9, 4.8, 5.0, 4.7, 4.9],
        average_rating: 4.9,
        reviews: [
            {
                reviewer_id: "user303",
                reviewer_name: "Alex H.",
                reviewer_email: "alex@example.com",
                review_text:
                    "Perfect for my hiking trip! The GPS accuracy is incredible and the battery lasted the entire weekend.",
            },
        ],
        totalRentalCount: 22,
    },

    // Camera
    {
        id: "camera1",
        name: "Sony Alpha a7R V",
        category: "Cameras",
        brand: "Sony",
        model: "ILCE-7RM5",
        description:
            "Sony's flagship mirrorless camera with a 61MP full-frame sensor, 8K video recording, and advanced AI-based autofocus. Perfect for professional photographers and videographers who demand the highest image quality and performance.",
        specifications: {
            sensor: "61MP full-frame Exmor R CMOS",
            processor: "BIONZ XR",
            iso_range: "100-32000 (expandable to 50-102400)",
            video: "8K 24p, 4K 60p, Full HD 120p",
            stabilization: "5-axis in-body image stabilization",
            autofocus: "759-point phase-detection AF",
        },
        included: [
            "Sony Alpha a7R V camera body",
            "FE 24-70mm f/2.8 GM II lens",
            "NP-FZ100 rechargeable battery",
            "Battery charger",
            "Neck strap",
            "64GB SD card",
            "Camera bag",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 59.99,
            deposit: 800.0,
            basicInsuranceFee: 7.99,
            premiumInsuranceFee: 15.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-05", "2023-12-06", "2023-12-07"],
        },
        ratings: [4.9, 5.0, 4.8, 4.9, 5.0],
        average_rating: 4.9,
        reviews: [
            {
                reviewer_id: "user404",
                reviewer_name: "Chris P.",
                reviewer_email: "chris@example.com",
                review_text:
                    "Incredible camera! Used it for a professional photoshoot and the image quality is outstanding. The autofocus is lightning fast and accurate.",
            },
        ],
        totalRentalCount: 31,
    },

    // Gaming
    {
        id: "gaming1",
        name: "PlayStation 5 Pro",
        category: "Gaming",
        brand: "Sony",
        model: "CFI-2000",
        description:
            "The most powerful PlayStation console ever, with enhanced GPU, ray tracing capabilities, and support for 8K gaming. Includes a DualSense controller, 3D audio, and ultra-high speed SSD for near-instant load times.",
        specifications: {
            cpu: "Custom 8-core AMD Zen 2",
            gpu: "Custom AMD RDNA 3 (Enhanced)",
            storage: "2TB SSD",
            resolution: "Up to 8K",
            frame_rate: "Up to 120fps",
            ray_tracing: "Hardware-accelerated",
        },
        included: [
            "PlayStation 5 Pro console",
            "DualSense wireless controller",
            "HDMI cable",
            "Power cord",
            "USB cable",
            "2 games of your choice",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 24.99,
            deposit: 250.0,
            basicInsuranceFee: 2.99,
            premiumInsuranceFee: 5.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-25", "2023-12-26", "2023-12-27"],
        },
        ratings: [4.8, 4.9, 5.0, 4.7, 4.8],
        average_rating: 4.8,
        reviews: [
            {
                reviewer_id: "user505",
                reviewer_name: "Ryan M.",
                reviewer_email: "ryan@example.com",
                review_text:
                    "Amazing gaming experience! The graphics are incredible and load times are practically non-existent. Great selection of games too.",
            },
        ],
        totalRentalCount: 45,
    },

    // Audio
    {
        id: "audio1",
        name: "Sonos Era 300",
        category: "Audio",
        brand: "Sonos",
        model: "Era 300",
        description:
            "A premium spatial audio smart speaker with Dolby Atmos, voice control, and multi-room capabilities. Delivers an immersive sound experience with six powerful drivers that direct sound in all directions for a truly spatial audio experience.",
        specifications: {
            drivers: "6 Class-D digital amplifiers",
            connectivity: "Wi-Fi 6, Bluetooth 5.0, AirPlay 2",
            voice_control: "Amazon Alexa, Sonos Voice Control",
            audio_formats: "Dolby Atmos, Stereo, Spatial Audio",
            dimensions: "6.3 x 10.2 x 7.3 inches",
            weight: "9.85 lbs",
        },
        included: ["Sonos Era 300 speaker", "Power cable", "Quick start guide", "1-month free Sonos Radio HD subscription"],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 19.99,
            deposit: 200.0,
            basicInsuranceFee: 2.49,
            premiumInsuranceFee: 4.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-18", "2023-12-19"],
        },
        ratings: [4.7, 4.8, 4.9, 4.7, 4.8],
        average_rating: 4.8,
        reviews: [
            {
                reviewer_id: "user606",
                reviewer_name: "Lisa K.",
                reviewer_email: "lisa@example.com",
                review_text:
                    "Incredible sound quality! The spatial audio really makes a difference, and it was perfect for our house party.",
            },
        ],
        totalRentalCount: 27,
    },

    // Headphones
    {
        id: "headphones1",
        name: "Apple AirPods Max",
        category: "Headphones",
        brand: "Apple",
        model: "A2096",
        description:
            "Premium over-ear headphones with active noise cancellation, spatial audio, and exceptional sound quality. Features Apple's H1 chips, nine microphones, and up to 20 hours of battery life for an unparalleled listening experience.",
        specifications: {
            drivers: "40mm dynamic drivers",
            chip: "Apple H1 (dual)",
            battery: "Up to 20 hours",
            connectivity: "Bluetooth 5.0, Lightning port",
            features: "Active Noise Cancellation, Transparency mode, Spatial Audio",
            weight: "384.8g",
        },
        included: ["AirPods Max", "Smart Case", "Lightning to USB-C Cable", "Documentation"],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 24.99,
            deposit: 250.0,
            basicInsuranceFee: 2.99,
            premiumInsuranceFee: 5.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-01", "2023-12-02"],
        },
        ratings: [4.9, 4.8, 5.0, 4.9, 4.8],
        average_rating: 4.9,
        reviews: [
            {
                reviewer_id: "user707",
                reviewer_name: "Thomas B.",
                reviewer_email: "thomas@example.com",
                review_text:
                    "The sound quality is incredible, and the noise cancellation is the best I've ever experienced. Perfect for my long flight!",
            },
        ],
        totalRentalCount: 38,
    },

    // Speakers
    {
        id: "speakers1",
        name: "Bang & Olufsen Beosound A5",
        category: "Speakers",
        brand: "Bang & Olufsen",
        model: "Beosound A5",
        description:
            "Portable luxury speaker with wooden handle, 12-hour battery life, and 360° sound. Crafted with premium materials including solid oak, Kvadrat textile, and pearl-blasted aluminum for stunning sound and design.",
        specifications: {
            drivers: "4 drivers with 280 watts total power",
            battery: "Up to 12 hours playback",
            connectivity: "Wi-Fi, Bluetooth 5.2, AirPlay 2, Chromecast",
            water_resistance: "IP65 dust and water resistant",
            dimensions: "11.6 x 6.7 x 8.3 inches",
            weight: "7.7 lbs",
        },
        included: ["Beosound A5 speaker", "Power adapter", "Quick start guide", "Cleaning cloth"],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 34.99,
            deposit: 300.0,
            basicInsuranceFee: 3.99,
            premiumInsuranceFee: 7.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-28", "2023-12-29", "2023-12-30"],
        },
        ratings: [4.7, 4.8, 4.6, 4.7, 4.8],
        average_rating: 4.7,
        reviews: [
            {
                reviewer_id: "user808",
                reviewer_name: "Olivia P.",
                reviewer_email: "olivia@example.com",
                review_text:
                    "Absolutely stunning speaker, both in terms of design and sound quality. Perfect for our beach day and outdoor dinner party.",
            },
        ],
        totalRentalCount: 19,
    },

    // VR
    {
        id: "vr1",
        name: "Meta Quest 3",
        category: "VR",
        brand: "Meta",
        model: "Quest 3",
        description:
            "Advanced standalone VR headset with mixed reality capabilities, high-resolution display, and powerful performance. Experience immersive gaming, fitness, social, and productivity applications without the need for a PC or console.",
        specifications: {
            processor: "Snapdragon XR2 Gen 2",
            display: "2064 x 2208 per eye",
            storage: "128GB",
            tracking: "Inside-out 6DoF tracking",
            battery: "Up to 3 hours",
            weight: "515g",
        },
        included: [
            "Meta Quest 3 headset",
            "Two Touch Plus controllers",
            "Charging cable and adapter",
            "Glasses spacer",
            "2 free games",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 24.99,
            deposit: 250.0,
            basicInsuranceFee: 2.99,
            premiumInsuranceFee: 5.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-13", "2023-12-14"],
        },
        ratings: [4.8, 4.7, 4.9, 4.8, 4.7],
        average_rating: 4.8,
        reviews: [
            {
                reviewer_id: "user909",
                reviewer_name: "Nathan K.",
                reviewer_email: "nathan@example.com",
                review_text:
                    "Amazing VR experience! The mixed reality features are game-changing, and the resolution is crystal clear. Had a blast with the included games.",
            },
        ],
        totalRentalCount: 33,
    },

    // Drones
    {
        id: "drone1",
        name: "DJI Mavic 3 Pro",
        category: "Drones",
        brand: "DJI",
        model: "Mavic 3 Pro",
        description:
            "Professional drone with Hasselblad camera system, 4/3 CMOS sensor, and 46-minute flight time. Capture stunning aerial photography and videography with 5.1K video, 10-bit D-Log color profile, and omnidirectional obstacle sensing.",
        specifications: {
            camera: 'Hasselblad 4/3 CMOS + 1/1.3" tele camera',
            video: "5.1K/50fps, 4K/120fps",
            photo: "20MP, 10-bit RAW",
            flight_time: "Up to 46 minutes",
            range: "15km video transmission",
            max_speed: "47 mph (75 kph)",
        },
        included: [
            "DJI Mavic 3 Pro drone",
            "RC Pro controller",
            "3 batteries",
            "Battery charging hub",
            "ND filter set",
            "Carrying case",
            "64GB microSD card",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 49.99,
            deposit: 500.0,
            basicInsuranceFee: 5.99,
            premiumInsuranceFee: 12.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-08", "2023-12-09"],
        },
        ratings: [4.9, 4.8, 5.0, 4.9, 4.8],
        average_rating: 4.9,
        reviews: [
            {
                reviewer_id: "user1010",
                reviewer_name: "James L.",
                reviewer_email: "james@example.com",
                review_text:
                    "Incredible drone! The image quality is outstanding and the flight time is impressive. Was able to capture amazing footage for my project.",
            },
        ],
        totalRentalCount: 25,
    },

    // Projectors
    {
        id: "projector1",
        name: "Samsung The Premiere",
        category: "Projectors",
        brand: "Samsung",
        model: "LSP9T",
        description:
            "Ultra-short throw 4K laser projector with 130-inch display, built-in speakers, and smart TV capabilities. Enjoy a cinema-quality experience in your home with HDR10+, 2,800 ANSI lumens brightness, and 40W 4.2 channel audio.",
        specifications: {
            resolution: "4K UHD (3840 x 2160)",
            brightness: "2,800 ANSI lumens",
            contrast_ratio: "2,000,000:1",
            projection_size: "Up to 130 inches",
            speakers: "40W 4.2 channel",
            smart_platform: "Tizen Smart TV",
        },
        included: [
            "Samsung The Premiere projector",
            "Samsung Smart Remote",
            "Power cable",
            "Quick setup guide",
            "HDMI cable",
        ],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 69.99,
            deposit: 800.0,
            basicInsuranceFee: 7.99,
            premiumInsuranceFee: 15.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-22", "2023-12-23", "2023-12-24"],
        },
        ratings: [4.8, 4.9, 4.7, 4.8, 4.9],
        average_rating: 4.8,
        reviews: [
            {
                reviewer_id: "user1111",
                reviewer_name: "Robert C.",
                reviewer_email: "robert@example.com",
                review_text:
                    "Incredible home theater experience! The picture quality is stunning, and the ultra-short throw design means no shadows when people walk by. Perfect for our movie night.",
            },
        ],
        totalRentalCount: 18,
    },

    // Wearables
    {
        id: "wearable1",
        name: "Oura Ring Gen 3",
        category: "Wearables",
        brand: "Oura",
        model: "Gen 3",
        description:
            "Smart ring that tracks sleep, activity, and readiness with 7-day battery life. This lightweight, water-resistant wearable provides detailed health insights without the bulk of a traditional smartwatch.",
        specifications: {
            sensors: "Heart rate, temperature, accelerometer",
            battery: "Up to 7 days",
            connectivity: "Bluetooth 5.0",
            water_resistance: "Up to 100m",
            material: "Titanium with PVD coating",
            weight: "4-6g (depending on size)",
        },
        included: ["Oura Ring Gen 3", "Charging dock", "USB-C cable", "Sizing kit", "Quick start guide"],
        images: ["https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg", "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg"],
        pricing: {
            perDay: 14.99,
            deposit: 150.0,
            basicInsuranceFee: 1.99,
            premiumInsuranceFee: 3.99,
        },
        availability: {
            status: true,
            blockedDates: ["2023-12-03", "2023-12-04"],
        },
        ratings: [4.7, 4.6, 4.8, 4.7, 4.6],
        average_rating: 4.7,
        reviews: [
            {
                reviewer_id: "user1212",
                reviewer_name: "Sophia W.",
                reviewer_email: "sophia@example.com",
                review_text:
                    "Love this ring! It's so comfortable I forget I'm wearing it, and the sleep tracking data is incredibly detailed and accurate.",
            },
        ],
        totalRentalCount: 29,
    },
]

export default GadgetDetailsComponent;
