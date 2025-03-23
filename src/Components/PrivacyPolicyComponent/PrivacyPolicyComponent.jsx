import React, { useState, useEffect } from "react";
import {
    FiX,
    FiDatabase,
    FiServer,
    FiShield,
    FiHardDrive,
    FiLink,
    FiUsers,
    FiUserCheck,
    FiEdit,
    FiMessageCircle,
    FiClock,
    FiCheckCircle,
    FiAlertTriangle,
    FiFileText,
    FiHelpCircle,
    FiLock,
    FiEye,
    FiGlobe
} from "react-icons/fi";
import {useSelector} from "react-redux";


const PrivacyPolicyComponent = () => {

    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [activeSection, setActiveSection] = useState("information-collection");
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
            id: "information-collection",
            title: "Information Collection",
            icon: <FiDatabase />,
            content: `
            <p>GadgetSwap collects personal information when you create an account, list a gadget, rent a gadget, or contact customer support. This information may include:</p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Name, email address, phone number, and billing address</li>
                <li>Payment information (processed securely through our payment processors)</li>
                <li>Government-issued ID for identity verification</li>
                <li>Device information such as IP address, browser type, and operating system</li>
                <li>Location data when you use our services</li>
                <li>Communications with GadgetSwap and other users</li>
            </ul>
            <p class="mt-4">We collect this information to provide and improve our services, process transactions, verify identities, and ensure the security of our platform.</p>
            `
        },
        {
            id: "use-of-information",
            title: "Use of Information",
            icon: <FiServer />,
            content: `
            <p>GadgetSwap uses the collected information for the following purposes:</p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Providing and maintaining our services</li>
                <li>Processing and completing transactions</li>
                <li>Verifying user identities and preventing fraud</li>
                <li>Communicating with users about their accounts, rentals, and support requests</li>
                <li>Improving our services and developing new features</li>
                <li>Sending promotional communications (with your consent)</li>
                <li>Complying with legal obligations</li>
            </ul>
            <p class="mt-4">We process your information based on the following legal grounds: performance of our contract with you, our legitimate interests, compliance with legal obligations, and your consent where applicable.</p>
            `
        },
        {
            id: "data-storage",
            title: "Data Storage and Security",
            icon: <FiShield />,
            content: `
            <p>GadgetSwap takes data security seriously and implements appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            <p class="mt-4">We store your data on secure servers and use industry-standard encryption to protect data transmission. Payment information is processed by trusted third-party payment processors who comply with PCI DSS standards.</p>
            <p class="mt-4">We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your data as described in the User Rights section.</p>
            `
        },
        {
            id: "cookies",
            title: "Cookies and Tracking",
            icon: <FiHardDrive />,
            content: `
            <p>GadgetSwap uses cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device that help us recognize you and remember your preferences.</p>
            <p class="mt-4">We use the following types of cookies:</p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Essential cookies:</strong> Required for the operation of our platform</li>
                <li><strong>Analytical cookies:</strong> Help us understand how users interact with our platform</li>
                <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p class="mt-4">You can manage your cookie preferences through your browser settings. However, disabling certain cookies may affect the functionality of our platform.</p>
            `
        },
        {
            id: "third-party",
            title: "Third-Party Services",
            icon: <FiLink />,
            content: `
            <p>GadgetSwap works with trusted third-party service providers to help us operate, improve, and secure our platform. These providers may have access to your personal information but are only permitted to use it for specific purposes related to our services.</p>
            <p class="mt-4">Our third-party service providers include:</p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Payment processors</li>
                <li>Identity verification services</li>
                <li>Cloud storage providers</li>
                <li>Analytics services</li>
                <li>Customer support tools</li>
                <li>Marketing and communication platforms</li>
            </ul>
            <p class="mt-4">We ensure that all third-party providers adhere to appropriate data protection standards. However, we are not responsible for the privacy practices of third-party websites or services that may be linked from our platform.</p>
            `
        },
        {
            id: "user-rights",
            title: "User Rights",
            icon: <FiUserCheck />,
            content: `
            <p>Depending on your location, you may have certain rights regarding your personal information. These may include:</p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your personal information to another service provider</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Withdrawal of consent:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
            <p class="mt-4">To exercise these rights, please contact us at privacy@gadgetswap.com. We will respond to your request within the timeframe required by applicable law.</p>
            `
        },
        {
            id: "children",
            title: "Children's Privacy",
            icon: <FiUsers />,
            content: `
            <p>GadgetSwap services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.</p>
            <p class="mt-4">If we become aware that we have collected personal information from a child without parental consent, we will take steps to remove that information from our servers.</p>
            `
        },
        {
            id: "international",
            title: "International Transfers",
            icon: <FiGlobe />,
            content: `
            <p>GadgetSwap operates globally, which means your personal information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than your country.</p>
            <p class="mt-4">When we transfer your personal information internationally, we implement appropriate safeguards to ensure that your information receives an adequate level of protection, regardless of where it is processed.</p>
            <p class="mt-4">By using our services, you consent to the transfer of your personal information to countries outside your country of residence, including the United States, where our primary servers are located.</p>
            `
        },
        {
            id: "changes",
            title: "Changes to Privacy Policy",
            icon: <FiEdit />,
            content: `
            <p>GadgetSwap may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through our platform or via email.</p>
            <p class="mt-4">The date at the top of this Privacy Policy indicates when it was last updated. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your personal information.</p>
            <p class="mt-4">Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of the updated policy.</p>
            `
        },
        {
            id: "contact",
            title: "Contact Information",
            icon: <FiHelpCircle />,
            content: `
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:</p>
            <p class="mt-2">Email: privacy@gadgetswap.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Tech Lane, San Francisco, CA 94107</p>
            <p class="mt-4">Our Data Protection Officer can be reached at dpo@gadgetswap.com.</p>
            <p class="mt-4">If you have an unresolved privacy concern that we have not addressed satisfactorily, please contact your local data protection authority.</p>
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
                        Privacy Policy
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        How we collect, use, and protect your personal information.
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
                            {/* Introduction */}
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <div className={`p-3 rounded-full mr-4 ${
                                        darkMode ? "bg-blue-900/30" : "bg-blue-50"
                                    }`}>
                                        <FiLock className={`${
                                            darkMode ? "text-blue-400" : "text-blue-600"
                                        }`} size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Your Privacy Matters</h2>
                                        <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                            We're committed to protecting your personal information and being transparent about our practices.
                                        </p>
                                    </div>
                                </div>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    This Privacy Policy explains how GadgetSwap collects, uses, and protects your personal information when you use our website, mobile applications, and services. By using GadgetSwap, you consent to the data practices described in this policy.
                                </p>
                            </div>

                            {/* Main Content Sections */}
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

                        {/* Commitment Section */}
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
                                    <h3 className="text-xl font-bold mb-2">Our Commitment to Privacy</h3>
                                    <p className={`${
                                        darkMode ? "text-gray-300" : "text-gray-700"
                                    }`}>
                                        At GadgetSwap, we believe in transparency and respect for your privacy. We continuously review and improve our privacy practices to ensure the highest standards of data protection. If you have any questions or concerns about this Privacy Policy, please don't hesitate to contact us.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Data Protection Notice */}
                        <div className={`mt-8 p-6 rounded-xl transition-colors ${
                            darkMode ? "bg-blue-900/20" : "bg-blue-50"
                        } border-l-4 ${
                            darkMode ? "border-blue-600" : "border-blue-500"
                        }`}>
                            <div className="flex items-start">
                                <FiEye className={`mr-4 flex-shrink-0 ${
                                    darkMode ? "text-blue-400" : "text-blue-500"
                                }`} size={24} />
                                <div>
                                    <h3 className={`text-lg font-bold mb-2 ${
                                        darkMode ? "text-blue-400" : "text-blue-700"
                                    }`}>Your Data Protection Rights</h3>
                                    <p className={`${
                                        darkMode ? "text-gray-300" : "text-gray-700"
                                    }`}>
                                        Depending on your location, you may have specific rights regarding your personal data. We respect these rights and provide mechanisms for you to exercise them. For more information, please refer to the User Rights section of this policy or contact our Data Protection Officer.
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
                                        This Privacy Policy may be updated periodically. It is your responsibility to check for updates. Continued use of GadgetSwap after changes constitutes acceptance of the modified policy.
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
                                Print Privacy Policy
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicyComponent;
