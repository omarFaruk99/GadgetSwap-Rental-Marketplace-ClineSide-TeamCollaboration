import { useState, useRef, useEffect } from "react"
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiBriefcase,
    FiSave,
    FiUpload,
    FiX,
    FiZoomIn,
    FiZoomOut,
    FiRotateCw,
    FiLock,
    FiHome,
} from "react-icons/fi"
import {useSelector} from "react-redux";


const UserSettingsComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark);


    // Initial fake user data
    const initialUserData = {
        id: "usr_123456",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        profession: "Software Engineer",
        bio: "Passionate about technology and gadgets. Love to try out new devices before buying them.",
        profileImage: "/placeholder.svg",
        joinedDate: "January 2023",
        billingAddress: {
            street: "123 Tech Street",
            city: "San Francisco",
            state: "CA",
            zipCode: "94105",
            country: "United States",
        },
    }


    // States
    // const [darkMode, setDarkMode] = useState(false)
    const [userData, setUserData] = useState(initialUserData)
    const [formData, setFormData] = useState(initialUserData)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0, size: 0 })
    const [zoom, setZoom] = useState(1)
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })


    // Password states
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [passwordError, setPasswordError] = useState("")
    const fileInputRef = useRef(null)
    const imageContainerRef = useRef(null)


    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target

        // Handle nested billing address fields
        if (name.startsWith("billing.")) {
            const billingField = name.split(".")[1]
            setFormData({
                ...formData,
                billingAddress: {
                    ...formData.billingAddress,
                    [billingField]: value,
                },
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }


    // Handle password input changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData({
            ...passwordData,
            [name]: value,
        })

        // Clear error when user types
        if (passwordError) {
            setPasswordError("")
        }
    }


    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setImageFile(file)

        const reader = new FileReader()
        reader.onload = (event) => {
            setImagePreview(event.target.result)

            // Get image dimensions and size
            const img = new Image()
            img.onload = () => {
                setImageSize({
                    width: img.width,
                    height: img.height,
                    size: (file.size / 1024).toFixed(2), // Size in KB
                })
                setZoom(1)
                setPosition({ x: 0, y: 0 })
            }
            img.src = event.target.result
        }
        reader.readAsDataURL(file)
    }


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        // Create updated user object
        const updatedUser = {
            ...formData,
            profileImage: imagePreview || formData.profileImage,
        }

        // Update user data
        setUserData(updatedUser)

        // Log the updated user object to console
        console.log("Updated User Data:", updatedUser)
    }


    // Handle password update
    const handlePasswordUpdate = (e) => {
        e.preventDefault()

        // Simple validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("New passwords do not match")
            return
        }

        if (passwordData.newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long")
            return
        }

        // In a real app, you would send this to an API
        console.log("Password Update Data:", {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
        })

        // Reset form
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        })

        // Show success message (in a real app)
    }


    // Handle zoom in/out
    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.1, 3))
    }


    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.1, 0.5))
    }


    // Handle image rotation
    const handleRotate = () => {
        if (!imageContainerRef.current || !imagePreview) return

        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")

            // Swap width and height for rotation
            canvas.width = img.height
            canvas.height = img.width

            // Rotate 90 degrees clockwise
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(Math.PI / 2)
            ctx.drawImage(img, -img.width / 2, -img.height / 2)

            // Update preview
            setImagePreview(canvas.toDataURL())
        }
        img.src = imagePreview
    }


    // Handle image dragging for repositioning
    const handleMouseDown = (e) => {
        if (!imagePreview) return
        setIsDragging(true)
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        })
    }


    const handleMouseMove = (e) => {
        if (!isDragging) return
        setPosition({
            x: e.clientX - startPosition.x,
            y: e.clientY - startPosition.y,
        })
    }


    const handleMouseUp = () => {
        setIsDragging(false)
    }


    // Handle touch events for mobile
    const handleTouchStart = (e) => {
        if (!imagePreview) return
        setIsDragging(true)
        setStartPosition({
            x: e.touches[0].clientX - position.x,
            y: e.touches[0].clientY - position.y,
        })
    }


    const handleTouchMove = (e) => {
        if (!isDragging) return
        setPosition({
            x: e.touches[0].clientX - startPosition.x,
            y: e.touches[0].clientY - startPosition.y,
        })
    }


    const handleTouchEnd = () => {
        setIsDragging(false)
    }


    // Remove image preview
    const removeImage = () => {
        setImagePreview(null)
        setImageFile(null)
        setImageSize({ width: 0, height: 0, size: 0 })
        setZoom(1)
        setPosition({ x: 0, y: 0 })
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }


    // Add event listeners for mouse and touch events
    useEffect(() => {
        if (imageContainerRef.current) {
            const container = imageContainerRef.current

            container.addEventListener("mousedown", handleMouseDown)
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)

            container.addEventListener("touchstart", handleTouchStart)
            window.addEventListener("touchmove", handleTouchMove)
            window.addEventListener("touchend", handleTouchEnd)

            return () => {
                container.removeEventListener("mousedown", handleMouseDown)
                window.removeEventListener("mousemove", handleMouseMove)
                window.removeEventListener("mouseup", handleMouseUp)

                container.removeEventListener("touchstart", handleTouchStart)
                window.removeEventListener("touchmove", handleTouchMove)
                window.removeEventListener("touchend", handleTouchEnd)
            }
        }
    }, [isDragging, startPosition, imagePreview])


    return (
        <div
            className={`w-full mx-auto rounded-xl ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
        >

            {/* Main content */}
            <div className="space-y-5">

                {/* Profile Image Section */}
                <div
                    className={`rounded-xl overflow-hidden shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Profile Image</h2>

                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Image preview container */}
                            <div
                                ref={imageContainerRef}
                                className={`relative w-40 h-40 rounded-full overflow-hidden mx-auto md:mx-0 border-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                                style={{ cursor: imagePreview ? "move" : "default" }}
                            >
                                {imagePreview ? (
                                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                        <img
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Profile preview"
                                            className="object-cover"
                                            style={{
                                                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                                                transition: isDragging ? "none" : "transform 0.2s ease-out",
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className={`w-full h-full flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                                    >
                                        <FiUser size={48} className="text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Image upload controls */}
                            <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <button
                                        type="button"
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <FiUpload size={16} className="text-blue-500" />
                                        <span>Upload Image</span>
                                    </button>

                                    {imagePreview && (
                                        <>
                                            <button
                                                type="button"
                                                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                                                onClick={handleZoomIn}
                                            >
                                                <FiZoomIn size={16} className="text-green-500" />
                                                <span>Zoom In</span>
                                            </button>

                                            <button
                                                type="button"
                                                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                                                onClick={handleZoomOut}
                                            >
                                                <FiZoomOut size={16} className="text-yellow-500" />
                                                <span>Zoom Out</span>
                                            </button>

                                            <button
                                                type="button"
                                                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                                                onClick={handleRotate}
                                            >
                                                <FiRotateCw size={16} className="text-purple-500" />
                                                <span>Rotate</span>
                                            </button>

                                            <button
                                                type="button"
                                                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                                                onClick={removeImage}
                                            >
                                                <FiX size={16} className="text-red-500" />
                                                <span>Remove</span>
                                            </button>
                                        </>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />

                                {imagePreview && (
                                    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        <p>
                                            Dimensions: {imageSize.width} x {imageSize.height}px
                                        </p>
                                        <p>File size: {imageSize.size} KB</p>
                                        <p className="mt-2 text-xs">Drag to reposition image. Use zoom buttons to adjust size.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Information Section */}
                <form
                    onSubmit={handleSubmit}
                    className={`rounded-xl overflow-hidden shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Full Name
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiUser size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Email Address
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiMail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Phone Number
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiPhone size={18} />
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-colors"
                            >
                                <FiSave size={18} />
                                Save Profile
                            </button>
                        </div>
                    </div>
                </form>

                {/* Password Section */}
                <form
                    onSubmit={handlePasswordUpdate}
                    className={`rounded-xl overflow-hidden shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Update Password</h2>

                        <div className="space-y-4">
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Current Password
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiLock size={18} />
                                    </span>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    New Password
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiLock size={18} />
                                    </span>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Confirm New Password
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiLock size={18} />
                                    </span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                        required
                                    />
                                </div>
                            </div>

                            {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-colors"
                                >
                                    <FiSave size={18} />
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Professional Information Section */}
                <form
                    onSubmit={handleSubmit}
                    className={`rounded-xl overflow-hidden shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Professional Information</h2>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Profession
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiBriefcase size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className={`block w-full px-4 py-3 rounded-lg border focus:outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                                ></textarea>
                                <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Brief description about yourself that will be visible on your profile.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-colors"
                            >
                                <FiSave size={18} />
                                Save Professional Info
                            </button>
                        </div>
                    </div>
                </form>

                {/* Billing Address Section */}
                <form
                    onSubmit={handleSubmit}
                    className={`rounded-xl overflow-hidden shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Street Address
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiHome size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="billing.street"
                                        value={formData.billingAddress.street}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    City
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiMapPin size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="billing.city"
                                        value={formData.billingAddress.city}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    State/Province
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiMapPin size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="billing.state"
                                        value={formData.billingAddress.state}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    ZIP/Postal Code
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiMapPin size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="billing.zipCode"
                                        value={formData.billingAddress.zipCode}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Country
                                </label>
                                <div
                                    className={`flex items-center rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <span className="px-3 py-2 text-gray-500">
                                        <FiMapPin size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="billing.country"
                                        value={formData.billingAddress.country}
                                        onChange={handleInputChange}
                                        className={`block w-full px-3 py-2 rounded-r-lg focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-colors"
                            >
                                <FiSave size={18} />
                                Save Billing Address
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UserSettingsComponent;
