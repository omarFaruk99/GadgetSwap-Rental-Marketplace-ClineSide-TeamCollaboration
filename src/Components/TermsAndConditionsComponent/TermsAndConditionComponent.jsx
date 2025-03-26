import React, { useState, useEffect } from "react";
import {
    FiX,
    FiUser,
    FiCalendar,
    FiDollarSign,
    FiShield,
    FiLock,
    FiSlash,
    FiGlobe,
    FiInfo,
    FiCheckCircle,
    FiAlertTriangle,
    FiFileText,
    FiHelpCircle,
    FiMessageCircle, FiClock
} from "react-icons/fi";
import UseTheme from "../../CustomHooks/useTheme";


const TermsAndConditionsComponent = () => {

    const { darkMode } = UseTheme();
    const [activeSection, setActiveSection] = useState("introduction");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lastUpdated] = useState("March 15, 2024");


    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    // Handle section change
    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }

        // Scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);


    // Sections data
    const sections = [
        {
            id: "introduction",
            title: "Introduction",
            icon: <FiInfo/>,
            content: `
            <p>Welcome to GadgetSwap, a platform that enables users to rent and lend gadgets. These Terms and Conditions govern your use of the GadgetSwap website, mobile applications, and services.</p>
            <p>By accessing or using GadgetSwap, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.</p>
            `
        },
        {
            id: "user-accounts",
            title: "User Accounts",
            icon: <FiUser/>,
            content: `
            <p>To use certain features of GadgetSwap, you must register for an account. You agree to provide accurate, current, and complete information during the registration process.</p>
            <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.</p>
            <p>Users must be at least 18 years old to create an account and use the services. GadgetSwap reserves the right to refuse service, terminate accounts, or remove content at our discretion.</p>
            `
        },
        {
            id: "rental-terms",
            title: "Rental Terms",
            icon: <FiCalendar/>,
            content: `
            <p>Rental periods begin and end on the dates specified in the rental agreement. Late returns may incur additional charges as outlined in the rental agreement.</p>
            <p>Renters are responsible for the proper use and care of rented gadgets. Any damage beyond normal wear and tear may result in additional charges.</p>
            <p>Gadget owners are responsible for ensuring their devices are in good working condition and accurately described on the platform.</p>
            <p>GadgetSwap is not responsible for any loss of data or privacy breaches that may occur during the rental period. Users are advised to remove personal data before lending or returning gadgets.</p>
            `
        },
        {
            id: "payment-terms",
            title: "Payment Terms",
            icon: <FiDollarSign/>,
            content: `
            <p>Rental fees are set by gadget owners and displayed on the listing. GadgetSwap charges a service fee for facilitating the transaction.</p>
            <p>Security deposits may be required for certain gadgets and will be refunded after the rental period, subject to the condition of the returned gadget.</p>
            <p>Payments are processed through our secure payment system. GadgetSwap does not store credit card information.</p>
            <p>Refunds are available under certain circumstances as outlined in our Refund Policy. Cancellation fees may apply depending on when the reservation is canceled.</p>
            `
        },
        {
            id: "liability",
            title: "Liability",
            icon: <FiShield/>,
            content: `
            <p>GadgetSwap is not liable for any damages, injuries, or losses resulting from the use of rented gadgets.</p>
            <p>Users agree to indemnify and hold harmless GadgetSwap from any claims, damages, or expenses arising from their use of the service or violation of these terms.</p>
            <p>GadgetSwap provides an optional Protection Plan for additional coverage against damage or theft. Terms of the Protection Plan are outlined separately.</p>
            `
        },
        {
            id: "privacy",
            title: "Privacy",
            icon: <FiLock/>,
            content: `
            <p>GadgetSwap collects and processes personal data as described in our Privacy Policy. By using our services, you consent to such processing.</p>
            <p>We implement various security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            <p>GadgetSwap may use cookies and similar tracking technologies to enhance user experience and collect usage data.</p>
            `
        },
        {
            id: "termination",
            title: "Termination",
            icon: <FiSlash/>,
            content: `
            <p>GadgetSwap reserves the right to terminate or suspend accounts without prior notice for violations of these Terms and Conditions.</p>
            <p>Users may terminate their accounts at any time by contacting customer support. Termination will not affect any pending transactions.</p>
            <p>Upon termination, certain provisions of these Terms and Conditions will continue to remain in effect, including ownership, warranty disclaimers, and limitations of liability.</p>
            `
        },
        {
            id: "governing-law",
            title: "Governing Law",
            icon: <FiGlobe/>,
            content: `
            <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which GadgetSwap is registered, without regard to its conflict of law provisions.</p>
            <p>Any disputes arising under or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
            `
        },
        {
            id: "changes",
            title: "Changes to Terms",
            icon: <FiFileText/>,
            content: `
            <p>GadgetSwap reserves the right to modify these Terms and Conditions at any time. We will provide notice of significant changes through the website or via email.</p>
            <p>Your continued use of the service after such modifications constitutes your acceptance of the updated terms.</p>
            <p>It is your responsibility to review these Terms and Conditions periodically for changes.</p>
            `
        },
        {
            id: "contact",
            title: "Contact Us",
            icon: <FiHelpCircle/>,
            content: `
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
            <p>Email: legal@gadgetswap.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Tech Lane, San Francisco, CA 94107</p>
            `
        }
    ];


    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className={`absolute inset-0 bg-black opacity-50`} onClick={toggleMobileMenu}></div>
                    <div className={`absolute left-0 top-0 bottom-0 w-3/4 max-w-xs p-4 overflow-y-auto transition-transform transform ${
                        darkMode ? "bg-gray-800" : "bg-white"
                    }`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Sections</h2>
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
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => handleSectionChange(section.id)}
                                            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                                                activeSection === section.id
                                                    ? darkMode
                                                        ? "bg-blue-900/30 text-blue-400"
                                                        : "bg-blue-50 text-blue-600"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                            }`}
                                        >
                                            <span className={`mr-3 ${
                                                activeSection === section.id
                                                    ? darkMode
                                                        ? "text-blue-400"
                                                        : "text-blue-600"
                                                    : darkMode
                                                        ? "text-gray-400"
                                                        : "text-gray-500"
                                            }`}>
                                            {section.icon}
                                            </span>
                                            <span>{section.title}</span>
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
                        <span>To know more</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Terms and Conditions
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Please read our terms carefully to understand your rights and responsibilities.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className={`sticky top-24 rounded-xl p-4 transition-colors ${
                            darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                        }`}>
                            <h2 className="text-lg font-bold mb-4">Contents</h2>
                            <nav>
                                <ul className="space-y-1">
                                    {sections.map((section) => (
                                        <li key={section.id}>
                                            <button
                                                onClick={() => handleSectionChange(section.id)}
                                                className={`w-full flex items-center p-2 rounded-lg text-left transition-colors ${
                                                    activeSection === section.id
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <span className={`mr-3 ${
                                                    activeSection === section.id
                                                        ? darkMode
                                                            ? "text-blue-400"
                                                            : "text-blue-600"
                                                        : darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-500"
                                                }`}>
                                                {section.icon}
                                                </span>
                                                <span>{section.title}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className={`p-6 rounded-xl transition-colors ${
                            darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                        }`}>
                            <div className="prose max-w-none prose-headings:mb-4 prose-p:mb-4 prose-p:leading-relaxed">
                                {sections.map((section) => (
                                    <section
                                        key={section.id}
                                        id={section.id}
                                        className={`mb-10 scroll-mt-24 ${
                                            activeSection === section.id ? "" : ""
                                        }`}
                                    >
                                        <div className="flex items-center mb-4">
                                            <span className={`mr-3 ${
                                                darkMode ? "text-blue-400" : "text-blue-600"
                                            }`}>
                                            {section.icon}
                                            </span>
                                            <h2 className="text-2xl font-bold">{section.title}</h2>
                                        </div>

                                        <div
                                            className={`${
                                                darkMode ? "text-gray-300" : "text-gray-700"
                                            } space-y-4`}
                                            dangerouslySetInnerHTML={{ __html: section.content }}
                                        />
                                    </section>
                                ))}
                            </div>
                        </div>

                        {/* Agreement Section */}
                        <div className={`mt-8 p-6 rounded-xl transition-colors ${
                            darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                        }`}>
                            <div className="flex items-start">
                                <div className={`p-3 rounded-full mr-4 ${
                                    darkMode ? "bg-blue-900/30" : "bg-blue-50"
                                }`}>
                                    <FiCheckCircle className={`${
                                        darkMode ? "text-blue-400" : "text-blue-600"
                                    }`} size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Agreement to Terms</h3>
                                    <p className={`${
                                        darkMode ? "text-gray-300" : "text-gray-700"
                                    }`}>
                                        By using GadgetSwap, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Warning Section */}
                        <div className={`mt-8 p-6 rounded-xl transition-colors ${
                            darkMode ? "bg-amber-900/20" : "bg-amber-50"
                        } border-l-4 ${
                            darkMode ? "border-amber-600" : "border-amber-500"
                        }`}>
                            <div className="flex items-start">
                                <FiAlertTriangle className={`mr-4 flex-shrink-0 ${
                                    darkMode ? "text-amber-400" : "text-amber-500"
                                }`} size={24} />
                                <div>
                                    <h3 className={`text-lg font-bold mb-2 ${
                                        darkMode ? "text-amber-400" : "text-amber-700"
                                    }`}>Important Notice</h3>
                                    <p className={`${
                                        darkMode ? "text-gray-300" : "text-gray-700"
                                    }`}>
                                        These Terms and Conditions may be updated periodically. It is your responsibility to check for updates. Continued use of GadgetSwap after changes constitutes acceptance of the modified terms.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Print Button */}
                        <div className="mt-8 flex justify-between">

                            <div className={`flex items-center px-3 py-1 rounded-full text-xs ${
                                darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                            }`}>
                                <FiClock className="mr-1" size={14} />
                                <span>Last updated: {lastUpdated}</span>
                            </div>

                            <button
                                onClick={() => window.print()}
                                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                }`}
                            >
                                <FiFileText className="mr-2" />
                                Print Terms
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsAndConditionsComponent;