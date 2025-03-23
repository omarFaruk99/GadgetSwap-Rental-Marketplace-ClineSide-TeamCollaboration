import React, { useState, useEffect } from "react";
import {
    FiMessageCircle,
    FiX,
    FiShield,
    FiSettings,
    FiBarChart2,
    FiTarget,
    FiInfo,
    FiAlertTriangle,
    FiCheck,
    FiChevronDown,
    FiChevronUp,
    FiSave,
    FiRefreshCw,
    FiHelpCircle,
    FiLock
} from "react-icons/fi";
import {useSelector} from "react-redux";


const CookieSettingsComponent = () => {

    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);


    // Cookie settings state
    const [cookieSettings, setCookieSettings] = useState({
        necessary: {
            enabled: true,
            mandatory: true,
            title: "Necessary Cookies",
            description: "These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.",
            cookies: [
                { name: "session_id", purpose: "Maintains your session across page requests", duration: "Session" },
                { name: "csrf_token", purpose: "Helps prevent Cross-Site Request Forgery attacks", duration: "Session" },
                { name: "cookie_consent", purpose: "Stores your cookie consent preferences", duration: "1 year" }
            ]
        },
        functional: {
            enabled: false,
            mandatory: false,
            title: "Functional Cookies",
            description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
            cookies: [
                { name: "language", purpose: "Remembers your preferred language", duration: "1 year" },
                { name: "theme_preference", purpose: "Stores your theme preference (light/dark)", duration: "1 year" },
                { name: "recently_viewed", purpose: "Tracks recently viewed gadgets", duration: "30 days" }
            ]
        },
        analytics: {
            enabled: false,
            mandatory: false,
            title: "Analytics Cookies",
            description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website and services.",
            cookies: [
                { name: "_ga", purpose: "Google Analytics - Distinguishes unique users", duration: "2 years" },
                { name: "_gid", purpose: "Google Analytics - Identifies user session", duration: "24 hours" },
                { name: "_gat", purpose: "Google Analytics - Throttles request rate", duration: "1 minute" }
            ]
        },
        marketing: {
            enabled: false,
            mandatory: false,
            title: "Marketing Cookies",
            description: "These cookies are used to track visitors across websites. They are set to display targeted advertisements that are relevant and engaging for individual users, and thereby more valuable for publishers and third-party advertisers.",
            cookies: [
                { name: "_fbp", purpose: "Facebook Pixel - Identifies browsers for ad targeting", duration: "3 months" },
                { name: "ads_id", purpose: "Tracks conversion from ads", duration: "30 days" },
                { name: "recommendation_id", purpose: "Powers product recommendations", duration: "30 days" }
            ]
        }
    }); // TODO: Create a redux slice and save this settings in the Redux Store.


    // Check if mandatory cookies are selected
    useEffect(() => {
        const mandatorySelected = Object.keys(cookieSettings).every(key =>
            !cookieSettings[key].mandatory || cookieSettings[key].enabled
        );

        if (!mandatorySelected) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [cookieSettings]);


    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    // Toggle cookie category
    const toggleCookieCategory = (category) => {
        if (cookieSettings[category].mandatory) return;

        setCookieSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                enabled: !prev[category].enabled
            }
        }));
    };


    // Toggle section expansion
    const toggleSection = (section) => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };


    // Accept all cookies
    const acceptAllCookies = () => {
        const updatedSettings = {};

        Object.keys(cookieSettings).forEach(key => {
            updatedSettings[key] = {
                ...cookieSettings[key],
                enabled: true
            };
        });

        setCookieSettings(updatedSettings);
        setShowAlert(false);
        console.log("All cookies accepted:", updatedSettings);
    };


    // Accept only necessary cookies
    const acceptNecessaryCookies = () => {
        const updatedSettings = {};

        Object.keys(cookieSettings).forEach(key => {
            updatedSettings[key] = {
                ...cookieSettings[key],
                enabled: cookieSettings[key].mandatory
            };
        });

        setCookieSettings(updatedSettings);
        setShowAlert(false);
        console.log("Only necessary cookies accepted:", updatedSettings);
    };


    // Save cookie preferences
    const saveCookiePreferences = () => {
        console.log("Cookie preferences saved:", cookieSettings);
        setShowAlert(false);
    };


    // Reset cookie preferences
    const resetCookiePreferences = () => {
        const updatedSettings = {};

        Object.keys(cookieSettings).forEach(key => {
            updatedSettings[key] = {
                ...cookieSettings[key],
                enabled: cookieSettings[key].mandatory
            };
        });

        setCookieSettings(updatedSettings);
    };


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);


    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}>
            {/* Cookie Alert */}
            {showAlert && (
                <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${
                    darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200 shadow-lg"
                }`}>
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-start">
                                <FiAlertTriangle className={`mt-1 mr-3 flex-shrink-0 ${
                                    darkMode ? "text-amber-400" : "text-amber-500"
                                }`} size={20} />
                                <div>
                                    <h3 className="font-bold text-lg">Cookie Settings</h3>
                                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        We use cookies to enhance your experience. Please select your cookie preferences.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={acceptNecessaryCookies}
                                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                        darkMode
                                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    }`}
                                >
                                    Necessary Only
                                </button>
                                <button
                                    onClick={acceptAllCookies}
                                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                        darkMode
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className={`absolute inset-0 bg-black opacity-50`} onClick={toggleMobileMenu}></div>
                    <div className={`absolute left-0 top-0 bottom-0 w-3/4 max-w-xs p-4 overflow-y-auto transition-transform transform ${
                        darkMode ? "bg-gray-800" : "bg-white"
                    }`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Cookie Settings</h2>
                            <button
                                onClick={toggleMobileMenu}
                                className={`p-2 rounded-full ${
                                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                }`}
                                aria-label="Close menu"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <nav>
                            <ul className="space-y-2">
                                {Object.keys(cookieSettings).map((key) => (
                                    <li key={key}>
                                        <button
                                            onClick={() => toggleSection(key)}
                                            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                expandedSection === key
                                                    ? darkMode
                                                        ? "bg-blue-900/30 text-blue-400"
                                                        : "bg-blue-50 text-blue-600"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                            }`}
                                        >
                                            <span className={`mr-3 ${
                                                expandedSection === key
                                                    ? darkMode
                                                        ? "text-blue-400"
                                                        : "text-blue-600"
                                                    : darkMode
                                                        ? "text-gray-400"
                                                        : "text-gray-500"
                                            }`}>
                                            {key === "necessary" && <FiShield size={18}/>}
                                                {key === "functional" && <FiSettings size={18}/>}
                                                {key === "analytics" && <FiBarChart2 size={18}/>}
                                                {key === "marketing" && <FiTarget size={18}/>}
                                            </span>
                                            <span>{cookieSettings[key].title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="container mx-auto px-4 py-16 pt-32">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                        darkMode
                            ? 'bg-gray-800/70 text-blue-400 border border-gray-700/50'
                            : 'bg-white/80 text-blue-600 border border-blue-100/50 shadow-sm'
                    } backdrop-blur-md`}>
                        <FiMessageCircle className="mr-2" />
                        <span>Privacy Preferences</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Cookie Settings
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Manage how we use cookies to enhance your experience.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                    <div className={`p-6 rounded-xl mb-8 transition-colors ${
                        darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                    }`}>
                        <div className="flex items-start">
                            <FiInfo className={`mt-1 mr-4 flex-shrink-0 ${
                                darkMode ? "text-blue-400" : "text-blue-600"
                            }`} size={24} />
                            <div>
                                <h3 className="text-xl font-bold mb-2">About Cookies</h3>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    Cookies are small text files that are placed on your device to help the website provide a better user experience. In general, cookies are used to retain user preferences, store information for things like shopping carts, and provide anonymized tracking data to third-party applications like Google Analytics.
                                </p>
                                <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    As a rule, cookies will make your browsing experience better. However, you may prefer to disable cookies on this site and on others. The most effective way to do this is to disable cookies in your browser. We suggest consulting the Help section of your browser or taking a look at the <a href="#" className={`${darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>About Cookies website</a> which offers guidance for all modern browsers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cookie Categories */}
                    <div className="space-y-4 mb-8">
                        {Object.keys(cookieSettings).map((key) => (
                            <div
                                key={key}
                                className={`rounded-xl overflow-hidden transition-colors ${
                                    darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                                }`}
                            >
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className={`mr-3 ${
                                                cookieSettings[key].enabled
                                                    ? darkMode
                                                        ? "text-blue-400"
                                                        : "text-blue-600"
                                                    : darkMode
                                                        ? "text-gray-400"
                                                        : "text-gray-500"
                                            }`}>
                                            {key === "necessary" && <FiShield size={20}/>}
                                                {key === "functional" && <FiSettings size={20}/>}
                                                {key === "analytics" && <FiBarChart2 size={20}/>}
                                                {key === "marketing" && <FiTarget size={20}/>}
                                            </span>
                                            <div>
                                                <h3 className="font-bold">{cookieSettings[key].title}</h3>
                                                {cookieSettings[key].mandatory && (
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                        darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                                                    }`}>
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => toggleSection(key)}
                                                className={`p-2 rounded-full transition-colors ${
                                                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                                }`}
                                                aria-label={expandedSection === key ? "Collapse details" : "Expand details"}
                                            >
                                                {expandedSection === key ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                            </button>

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={cookieSettings[key].enabled}
                                                    onChange={() => toggleCookieCategory(key)}
                                                    disabled={cookieSettings[key].mandatory}
                                                />
                                                <div className={`w-11 h-6 rounded-full peer ${
                                                    cookieSettings[key].mandatory
                                                        ? darkMode
                                                            ? "bg-gray-600"
                                                            : "bg-gray-300"
                                                        : darkMode
                                                            ? "bg-gray-700 peer-checked:bg-blue-600"
                                                            : "bg-gray-200 peer-checked:bg-blue-600"
                                                } peer-focus:outline-none peer-focus:ring-4 ${
                                                    darkMode
                                                        ? "peer-focus:ring-blue-800"
                                                        : "peer-focus:ring-blue-300"
                                                } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                                            </label>
                                        </div>
                                    </div>

                                    {expandedSection === key && (
                                        <div className={`mt-4 pt-4 border-t ${
                                            darkMode ? "border-gray-700" : "border-gray-200"
                                        }`}>
                                            <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                {cookieSettings[key].description}
                                            </p>

                                            <h4 className="font-medium mb-2">Cookies used:</h4>
                                            <div className={`rounded-lg overflow-hidden ${
                                                darkMode ? "bg-gray-900" : "bg-gray-50"
                                            }`}>
                                                <table
                                                    className={`min-w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                                                    <thead className={darkMode ? "bg-gray-800" : "bg-gray-100"}>
                                                    <tr>
                                                        <th scope="col"
                                                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                            Name
                                                        </th>
                                                        <th scope="col"
                                                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                            Purpose
                                                        </th>
                                                        <th scope="col"
                                                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                            Duration
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody
                                                        className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                                                    {cookieSettings[key]?.cookies.map((cookie, index) => (
                                                        <tr key={index}>
                                                            <td className="px-4 py-3 text-sm font-mono">
                                                                {cookie.name}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm">
                                                                {cookie.purpose}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm">
                                                                {cookie.duration}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={acceptAllCookies}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                <span className="flex items-center justify-center">
                                    <FiCheck className="mr-2"/>
                                    Accept All
                                </span>
                            </button>

                            <button
                                onClick={acceptNecessaryCookies}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                }`}
                            >
                                <span className="flex items-center justify-center">
                                    <FiShield className="mr-2" />
                                    Necessary Only
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={resetCookiePreferences}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                }`}
                            >
                                <span className="flex items-center justify-center">
                                    <FiRefreshCw className="mr-2" />
                                    Reset
                                </span>
                            </button>

                            <button
                                onClick={saveCookiePreferences}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                            >
                                <span className="flex items-center justify-center">
                                      <FiSave className="mr-2" />
                                      Save Preferences
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className={`p-6 rounded-xl mb-8 transition-colors ${
                        darkMode ? "bg-blue-900/20 border border-blue-800/30" : "bg-blue-50 border border-blue-100"
                    }`}>
                        <div className="flex items-start">
                            <FiHelpCircle className={`mt-1 mr-4 flex-shrink-0 ${
                                darkMode ? "text-blue-400" : "text-blue-600"
                            }`} size={24} />
                            <div>
                                <h3 className="text-lg font-bold mb-2">Need More Information?</h3>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    If you have any questions about our cookie policy or how we handle your data, please visit our <a href="/privacy-policy" className={`${darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>Privacy Policy</a> page or <a href="/contact" className={`${darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>contact us</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data Protection Notice */}
                    <div className={`p-6 rounded-xl transition-colors ${
                        darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                    }`}>
                        <div className="flex items-start">
                            <FiLock className={`mt-1 mr-4 flex-shrink-0 ${
                                darkMode ? "text-green-400" : "text-green-600"
                            }`} size={24} />
                            <div>
                                <h3 className="text-lg font-bold mb-2">Your Data is Protected</h3>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    GadgetSwap is committed to protecting your privacy. We use cookies responsibly and in accordance with our Privacy Policy. Your cookie preferences will be remembered for 6 months, after which you'll be asked to confirm them again.
                                </p>
                                <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    You can change your cookie preferences at any time by visiting this page.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CookieSettingsComponent;
