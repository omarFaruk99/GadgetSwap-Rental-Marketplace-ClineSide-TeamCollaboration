import { useState } from "react"
import { useSelector } from "react-redux"
import {
    FiUser,
    FiLock,
    FiBriefcase,
    FiUpload,
    FiEye,
    FiEyeOff,
    FiSave,
    FiAlertTriangle,
    FiCheck,
    FiBell,
} from "react-icons/fi"
import { FaCrown } from "react-icons/fa"

const AdminSettingsComponent = () => {
    // Dark mode from Redux
    const darkMode = useSelector((state) => state.darkMode.isDark)

    // Admin data (fake data)
    const [adminData, setAdminData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "admin@gadgetswap.com",
        phone: "+1 (555) 123-4567",
        profileImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
        role: "Super Admin",
        department: "Management",
        joinDate: "2022-01-15",
        lastLogin: "2023-11-28 14:32:05",
        notificationPreferences: {
            email: true,
            push: true,
            sms: false,
            newGadgets: true,
            systemUpdates: true,
            userReports: true,
            securityAlerts: true,
        },
    })

    // Password states
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Active tab state
    const [activeTab, setActiveTab] = useState("profile")

    // Success and error messages
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    // Handle profile update
    const handleProfileUpdate = (e) => {
        e.preventDefault()
        setSuccessMessage("Profile information updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
    }

    // Handle password update
    const handlePasswordUpdate = (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            setErrorMessage("New passwords do not match!")
            setTimeout(() => setErrorMessage(""), 3000)
            return
        }
        setSuccessMessage("Password updated successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setTimeout(() => setSuccessMessage(""), 3000)
    }

    // Handle professional info update
    const handleProfessionalUpdate = (e) => {
        e.preventDefault()
        setSuccessMessage("Professional information updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
    }

    // Handle notification preferences update
    const handleNotificationUpdate = (e) => {
        e.preventDefault()
        setSuccessMessage("Notification preferences updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
    }

    // Handle profile image change
    const handleProfileImageChange = (e) => {
        // In a real app, this would upload the image to a server
        // For now, we'll just simulate it with a timeout
        setSuccessMessage("Profile image updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
    }

    // Handle notification toggle
    const handleNotificationToggle = (key) => {
        setAdminData((prevData) => ({
            ...prevData,
            notificationPreferences: {
                ...prevData.notificationPreferences,
                [key]: !prevData.notificationPreferences[key],
            },
        }))
    }

    // Tab button class generator
    const getTabClass = (tabName) => {
        return `px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            activeTab === tabName
                ? darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
        }`
    }

    // Input field class generator
    const getInputClass = () => {
        return `w-full px-4 py-2 rounded-lg border ${
            darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                : "bg-white border-gray-300 text-gray-800 focus:border-purple-500"
        } focus:outline-none transition-colors`
    }

    // Button class generator
    const getButtonClass = (isPrimary = true) => {
        return `px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            isPrimary
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
        }`
    }

    // Toggle switch class generator
    const getToggleSwitchClass = (isActive) => {
        return `relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
            isActive ? "bg-purple-600" : darkMode ? "bg-gray-600" : "bg-gray-300"
        }`
    }

    // Toggle switch button class
    const getToggleSwitchButtonClass = (isActive) => {
        return `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isActive ? "translate-x-6" : "translate-x-1"
        }`
    }

    return (
        <div
            className={`w-full max-w-7xl mx-auto rounded-xl transition-colors ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
        >

            {/* Success and Error Messages */}
            {successMessage && (
                <div className="mx-6 mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
                    <FiCheck className="mr-2" />
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mx-6 mt-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center">
                    <FiAlertTriangle className="mr-2" />
                    {errorMessage}
                </div>
            )}

            {/* Tabs */}
            <div className="p-6 pb-0 flex flex-wrap gap-2">
                <button onClick={() => setActiveTab("profile")} className={getTabClass("profile")}>
                    <div className="flex items-center">
                        <FiUser className="mr-2" />
                        <span>Profile</span>
                    </div>
                </button>
                <button onClick={() => setActiveTab("security")} className={getTabClass("security")}>
                    <div className="flex items-center">
                        <FiLock className="mr-2" />
                        <span>Security</span>
                    </div>
                </button>
                <button onClick={() => setActiveTab("professional")} className={getTabClass("professional")}>
                    <div className="flex items-center">
                        <FiBriefcase className="mr-2" />
                        <span>Professional</span>
                    </div>
                </button>
                <button onClick={() => setActiveTab("membership")} className={getTabClass("membership")}>
                    <div className="flex items-center">
                        <FaCrown className="mr-2 text-yellow-500" />
                        <span>Membership</span>
                    </div>
                </button>
                <button onClick={() => setActiveTab("notifications")} className={getTabClass("notifications")}>
                    <div className="flex items-center">
                        <FiBell className="mr-2" />
                        <span>Notifications</span>
                    </div>
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Profile Information */}
                {activeTab === "profile" && (
                    <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <FiUser className="mr-2" />
                            Profile Information
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Profile Image */}
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img
                                        src={adminData.profileImage || "/placeholder.svg"}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                                    />
                                    <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                                        <FiUpload className="text-white" />
                                        <input type="file" className="hidden" onChange={handleProfileImageChange} accept="image/*" />
                                    </label>
                                </div>
                                <p className="mt-2 font-medium">{adminData.role}</p>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Joined: {new Date(adminData.joinDate).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Profile Form */}
                            <div className="flex-1">
                                <form onSubmit={handleProfileUpdate}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>First Name</label>
                                            <input
                                                type="text"
                                                value={adminData.firstName}
                                                onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })}
                                                className={getInputClass()}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Last Name</label>
                                            <input
                                                type="text"
                                                value={adminData.lastName}
                                                onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })}
                                                className={getInputClass()}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Email</label>
                                            <input
                                                type="email"
                                                value={adminData.email}
                                                onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                                                className={getInputClass()}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Phone</label>
                                            <input
                                                type="tel"
                                                value={adminData.phone}
                                                onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                                                className={getInputClass()}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button type="submit" className={getButtonClass()}>
                                            <div className="flex items-center">
                                                <FiSave className="mr-2" />
                                                Save Changes
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security */}
                {activeTab === "security" && (
                    <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <FiLock className="mr-2" />
                            Security Settings
                        </h2>

                        <form onSubmit={handlePasswordUpdate}>
                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className={getInputClass()}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? (
                                                <FiEyeOff className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                            ) : (
                                                <FiEye className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className={getInputClass()}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? (
                                                <FiEyeOff className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                            ) : (
                                                <FiEye className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={getInputClass()}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <FiEyeOff className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                            ) : (
                                                <FiEye className={darkMode ? "text-gray-400" : "text-gray-500"} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button type="submit" className={getButtonClass()}>
                                    <div className="flex items-center">
                                        <FiSave className="mr-2" />
                                        Update Password
                                    </div>
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-600">
                            <h3 className="text-lg font-semibold mb-4">Login History</h3>
                            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Last login: {adminData.lastLogin}</p>
                                <p className="mt-2 text-sm text-purple-500 cursor-pointer hover:underline">View full login history</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Professional Information */}
                {activeTab === "professional" && (
                    <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <FiBriefcase className="mr-2" />
                            Professional Information
                        </h2>

                        <form onSubmit={handleProfessionalUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                <div>
                                    <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Role</label>
                                    <select
                                        value={adminData.role}
                                        onChange={(e) => setAdminData({ ...adminData, role: e.target.value })}
                                        className={getInputClass()}
                                    >
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Moderator">Moderator</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Department</label>
                                    <select
                                        value={adminData.department}
                                        onChange={(e) => setAdminData({ ...adminData, department: e.target.value })}
                                        className={getInputClass()}
                                    >
                                        <option value="Management">Management</option>
                                        <option value="Customer Support">Customer Support</option>
                                        <option value="Technical">Technical</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className={`block mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Admin Bio</label>
                                    <textarea
                                        rows="4"
                                        className={getInputClass()}
                                        placeholder="Write a short bio about your role and responsibilities"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button type="submit" className={getButtonClass()}>
                                    <div className="flex items-center">
                                        <FiSave className="mr-2" />
                                        Save Professional Info
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Membership */}
                {activeTab === "membership" && (
                    <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <FaCrown className="mr-2 text-yellow-500" />
                            Admin Membership
                        </h2>

                        <div className={`p-6 rounded-xl border-2 border-yellow-500 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center">
                                        <FaCrown className="mr-2 text-yellow-500" />
                                        Platinum Membership
                                    </h3>
                                    <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        Lifetime access to all admin features
                                    </p>
                                </div>
                                <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-bold">ACTIVE</div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <h4 className="font-semibold">Admin Privileges</h4>
                                    <ul className="mt-2 space-y-2">
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            Full platform management
                                        </li>
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            User account management
                                        </li>
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            Gadget inventory control
                                        </li>
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            Order processing and management
                                        </li>
                                    </ul>
                                </div>
                                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <h4 className="font-semibold">Advanced Features</h4>
                                    <ul className="mt-2 space-y-2">
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            Analytics dashboard access
                                        </li>
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            Financial reporting
                                        </li>
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            System configuration
                                        </li>
                                        <li className="flex items-center">
                                            <FiCheck className="mr-2 text-green-500" />
                                            API access management
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-purple-100 text-purple-800">
                                <p className="font-medium">
                                    As an admin, your Platinum membership is complimentary and does not require payment.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications */}
                {activeTab === "notifications" && (
                    <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <FiBell className="mr-2" />
                            Notification Preferences
                        </h2>

                        <form onSubmit={handleNotificationUpdate}>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Receive notifications via email
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className={getToggleSwitchClass(adminData.notificationPreferences.email)}
                                                onClick={() => handleNotificationToggle("email")}
                                            >
                                                <span className={getToggleSwitchButtonClass(adminData.notificationPreferences.email)} />
                                            </button>
                                        </div>
                                        {/*<div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Push Notifications</p>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Receive notifications in browser
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className={getToggleSwitchClass(adminData.notificationPreferences.push)}
                                                onClick={() => handleNotificationToggle("push")}
                                            >
                                                <span className={getToggleSwitchButtonClass(adminData.notificationPreferences.push)} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">SMS Notifications</p>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Receive notifications via SMS
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className={getToggleSwitchClass(adminData.notificationPreferences.sms)}
                                                onClick={() => handleNotificationToggle("sms")}
                                            >
                                                <span className={getToggleSwitchButtonClass(adminData.notificationPreferences.sms)} />
                                            </button>
                                        </div>*/}
                                    </div>
                                </div>

                                {/*<div>
                                    <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">New Gadgets</p>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    When new gadgets are added to the platform
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className={getToggleSwitchClass(adminData.notificationPreferences.newGadgets)}
                                                onClick={() => handleNotificationToggle("newGadgets")}
                                            >
                                                <span className={getToggleSwitchButtonClass(adminData.notificationPreferences.newGadgets)} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">System Updates</p>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Platform updates and maintenance notifications
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className={getToggleSwitchClass(adminData.notificationPreferences.systemUpdates)}
                                                onClick={() => handleNotificationToggle("systemUpdates")}
                                            >
                                                <span className={getToggleSwitchButtonClass(adminData.notificationPreferences.systemUpdates)} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">User Reports</p>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    When users submit reports or feedback
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className={getToggleSwitchClass(adminData.notificationPreferences.userReports)}
                                                onClick={() => handleNotificationToggle("userReports")}
                                            >
                                                <span className={getToggleSwitchButtonClass(adminData.notificationPreferences.userReports)} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Security Alerts</p>
                                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Important security notifications
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className={getToggleSwitchClass(adminData.notificationPreferences.securityAlerts)}
                                                onClick={() => handleNotificationToggle("securityAlerts")}
                                            >
                                                <span
                                                    className={getToggleSwitchButtonClass(adminData.notificationPreferences.securityAlerts)}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>*/}
                            </div>

                            <div className="mt-6">
                                <button type="submit" className={getButtonClass()}>
                                    <div className="flex items-center">
                                        <FiSave className="mr-2" />
                                        Save Notification Preferences
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminSettingsComponent;
