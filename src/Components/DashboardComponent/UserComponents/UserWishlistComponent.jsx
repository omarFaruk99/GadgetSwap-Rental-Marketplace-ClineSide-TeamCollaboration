import {useContext, useEffect} from "react"
import {FiHeart, FiPackage, FiStar, FiTrash2, FiShoppingCart, FiEye, FiWifi} from "react-icons/fi"
import {useDispatch, useSelector} from "react-redux"
import {FaCamera, FaGamepad, FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt, FaVrCardboard} from "react-icons/fa"
import AuthContext from "../../../Providers/AuthContext.jsx";
import {addOrRemoveWishlistGadget, getWishlistGadgetsDetails} from "../../../Features/gadgetWishlist/gadgetWishlistSlice.js";
import {useNavigate} from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure.jsx";

const UserWishlistComponent = () => {


    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const {user: registeredUser} = useContext(AuthContext);
    const dispatch = useDispatch();
    const {wishlistGadgetDetails} = useSelector((state) => state.gadgetWishlist);

    const axiosSecure = useAxiosSecure();
    const navigateTo = useNavigate();


    // Fetch wishlist gadget details on mount
    useEffect(() => {
        if (registeredUser?.email) {
            dispatch(getWishlistGadgetsDetails({userEmail: registeredUser?.email, axiosSecure}))
        }
    }, [axiosSecure, dispatch, registeredUser?.email]);


        // Format currency
     const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount)
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
            return <FiPackage className="text-gray-500" />
    }
}



    // Handle remove from the wishlist
    const handleRemoveFromWishlist = async (id) => {
        await dispatch(addOrRemoveWishlistGadget({userEmail: registeredUser?.email, gadgetId: id, axiosSecure}));
        await dispatch(getWishlistGadgetsDetails(registeredUser?.email));
    }


    // Handle rent now
    const handleRentNow = (id) => {
        navigateTo(`/all-gadgets/gadget-details/${id}`);
    }


    // Handle view details
    const handleViewDetails = (id) => {
        navigateTo(`/all-gadgets/gadget-details/${id}`);
    }


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);


    return (
        <div
            className={`w-full mx-auto rounded-xl ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
        >

            {/* Wishlist Grid */}
            {wishlistGadgetDetails?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistGadgetDetails?.map((item) => (
                        <div
                            key={item?._id}
                            className={`rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md ${
                                darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                            }`}
                        >
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden group">
                                <img
                                    src={item?.images[0] || "/placeholder.svg"}
                                    alt={item?.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Availability Badge */}
                                <div className="absolute top-3 left-3">
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            item?.availability?.status
                                                ? darkMode
                                                    ? "bg-green-900/80 text-green-300"
                                                    : "bg-green-100 text-green-800"
                                                : darkMode
                                                    ? "bg-red-900/80 text-red-300"
                                                    : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                    {item?.availability?.status ? "Available" : "Unavailable"}
                                    </span>
                                </div>

                                {/* Quick Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleViewDetails(item?._id)}
                                        className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors"
                                        aria-label="View details"
                                    >
                                        <FiEye size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item?._id)}
                                        className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-white transition-colors"
                                        aria-label="Remove from wishlist"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-4">
                                {/* Category and Rating */}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <span className="mr-2">{getCategoryIcon(item?.category)}</span>
                                        <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{item?.category}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiStar className="text-yellow-500 mr-1" size={16} />
                                        <span className="text-sm font-medium">{item?.average_rating}</span>
                                    </div>
                                </div>

                                {/* Name and Price */}
                                <h3
                                    className="font-medium text-lg mb-1 cursor-pointer hover:underline"
                                    onClick={() => handleViewDetails(item?._id)}
                                >
                                    {item?.name}
                                </h3>
                                <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    {item?.description}
                                </p>
                                <div className="font-bold text-lg mb-4">
                                    {formatCurrency(item?.pricing?.perDay)}
                                    <span className={`text-xs font-normal ${darkMode ? "text-gray-400" : "text-gray-500"}`}>/day</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleRentNow(item?._id)}
                                        disabled={!item?.availability?.status}
                                        className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
                                            item?.availability?.status
                                                ? darkMode
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                                : darkMode
                                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        <FiShoppingCart className="mr-2" size={16} />
                                        Rent Now
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item?._id)}
                                        className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                                            darkMode
                                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                        }`}
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Empty State
                <div
                    className={`rounded-xl p-8 text-center ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <FiHeart className={`${darkMode ? "text-gray-500" : "text-gray-400"}`} size={32} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                    <p className={`mb-6 max-w-md mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Browse our collection and add gadgets you're interested in renting to your wishlist for easy access later.
                    </p>
                    <button
                        onClick={() => (window.location.href = "/all-gadgets")}
                        className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                            darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        Explore Gadgets
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserWishlistComponent;
