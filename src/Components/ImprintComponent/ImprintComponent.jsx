import React, { useState, useEffect } from "react";
import {
    FiX,
    FiMessageCircle,
    FiInfo,
    FiMapPin,
    FiMail,
    FiPhone,
    FiUser,
    FiFileText,
    FiDollarSign,
    FiEdit,
    FiAlertCircle,
    FiGlobe,
    FiClock,
    FiCheckCircle,
    FiBookOpen,
    FiLayers,
    FiShield,
    FiPrinter
} from "react-icons/fi";
import UseTheme from "../../CustomHooks/useTheme";


const ImprintComponent = () => {

    const { darkMode } = UseTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("company-info");


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
            id: "company-info",
            title: "Company Information",
            icon: <FiInfo />,
            content: `
            <h3 class="text-xl font-semibold mb-3">GadgetSwap Inc.</h3>
            <p>A technology rental marketplace platform registered in the United States.</p>
            <p class="mt-2">Founded in 2020, GadgetSwap operates an online platform that connects gadget owners with individuals looking to rent technology for temporary use.</p>
            `
        },
        {
            id: "contact-details",
            title: "Contact Details",
            icon: <FiMapPin />,
            content: `
            <p><strong>Address:</strong> 123 Tech Lane, Suite 500<br />San Francisco, CA 94107<br />United States</p>
            <p class="mt-3"><strong>Email:</strong> info@gadgetswap.com</p>
            <p class="mt-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p class="mt-1"><strong>Fax:</strong> +1 (555) 123-4568</p>
            <p class="mt-3"><strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM (PST)</p>
            `
        },
        {
            id: "legal-representatives",
            title: "Legal Representatives",
            icon: <FiUser />,
            content: `
            <p><strong>Chief Executive Officer:</strong> Sarah Johnson</p>
            <p class="mt-2"><strong>Chief Technology Officer:</strong> Michael Chen</p>
            <p class="mt-2"><strong>Chief Operations Officer:</strong> Priya Patel</p>
            <p class="mt-4">All representatives can be contacted through our company address listed in the Contact Details section.</p>
            `
        },
        {
            id: "registration-info",
            title: "Registration Information",
            icon: <FiFileText />,
            content: `
            <p><strong>Company Registration Number:</strong> US-CA-SF-12345678</p>
            <p class="mt-2"><strong>Registered at:</strong> California Secretary of State</p>
            <p class="mt-2"><strong>Date of Registration:</strong> March 15, 2020</p>
            <p class="mt-2"><strong>Legal Form:</strong> Corporation (C-Corp)</p>
            `
        },
        {
            id: "vat-info",
            title: "VAT Information",
            icon: <FiDollarSign />,
            content: `
            <p><strong>VAT Identification Number:</strong> US 987654321</p>
            <p class="mt-2"><strong>Tax ID:</strong> 12-3456789</p>
            <p class="mt-4">GadgetSwap Inc. is subject to sales tax in various states where we have nexus. For specific information regarding sales tax in your state, please contact our finance department.</p>
            `
        },
        {
            id: "content-responsibility",
            title: "Responsible for Content",
            icon: <FiEdit />,
            content: `
            <p><strong>Content Director:</strong> David Wilson</p>
            <p class="mt-2"><strong>Email:</strong> content@gadgetswap.com</p>
            <p class="mt-4">David Wilson is responsible for the content published on this website in accordance with § 55 Abs. 2 RStV (for German compliance).</p>
            <p class="mt-2">For press inquiries, please contact: press@gadgetswap.com</p>
            `
        },
        {
            id: "dispute-resolution",
            title: "Dispute Resolution",
            icon: <FiAlertCircle />,
            content: `
            <p>The European Commission provides a platform for online dispute resolution (OS) which is available at <a href="https://ec.europa.eu/consumers/odr/" class="text-blue-500 hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
            <p class="mt-4">GadgetSwap Inc. is neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.</p>
            <p class="mt-4">For any disputes, we strive to find amicable solutions. Please contact our customer support at support@gadgetswap.com before taking any legal action.</p>
            `
        },
        {
            id: "copyright",
            title: "Copyright Information",
            icon: <FiBookOpen />,
            content: `
            <p>© 2020-${new Date().getFullYear()} GadgetSwap Inc. All rights reserved.</p>
            <p class="mt-2">All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of GadgetSwap Inc. or its content suppliers and is protected by international copyright laws.</p>
            <p class="mt-4">The compilation of all content on this site is the exclusive property of GadgetSwap Inc. and is protected by international copyright laws.</p>
            `
        },
        {
            id: "liability-disclaimer",
            title: "Liability Disclaimer",
            icon: <FiShield />,
            content: `
            <p>Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.</p>
            <p class="mt-4">All information on this website is provided without warranty of any kind, either express or implied. GadgetSwap Inc. makes no representations about the suitability, reliability, availability, timeliness, and accuracy of the information, software, products, services, and related graphics contained on the website for any purpose.</p>
            <p class="mt-4">To the maximum extent permitted by applicable law, all such information, software, products, services, and related graphics are provided "as is" without warranty or condition of any kind.</p>
            `
        }
    ];


    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
            }`}>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className={`absolute inset-0 bg-black opacity-50`} onClick={toggleMobileMenu}></div>
                    <div className={`absolute left-0 top-0 bottom-0 w-3/4 max-w-xs p-4 overflow-y-auto transition-transform transform ${darkMode ? "bg-gray-800" : "bg-white"
                        }`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Sections</h2>
                            <button
                                onClick={toggleMobileMenu}
                                className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
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
                                            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeSection === section.id
                                                    ? darkMode
                                                        ? "bg-blue-900/30 text-blue-400"
                                                        : "bg-blue-50 text-blue-600"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <span className={`mr-3 ${activeSection === section.id
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
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${darkMode
                            ? 'bg-gray-800/70 text-blue-400 border border-gray-700/50'
                            : 'bg-white/80 text-blue-600 border border-blue-100/50 shadow-sm'
                        } backdrop-blur-md`}>
                        <FiMessageCircle className="mr-2" />
                        <span>Legal Information</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Imprint
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Legal disclosure and company information as required by law.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className={`sticky top-24 rounded-xl p-4 transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                            }`}>
                            <h2 className="text-lg font-bold mb-4">Contents</h2>
                            <nav>
                                <ul className="space-y-1">
                                    {sections.map((section) => (
                                        <li key={section.id}>
                                            <button
                                                onClick={() => handleSectionChange(section.id)}
                                                className={`w-full flex items-center p-2 rounded-lg text-left transition-colors ${activeSection === section.id
                                                        ? darkMode
                                                            ? "bg-blue-900/30 text-blue-400"
                                                            : "bg-blue-50 text-blue-600"
                                                        : darkMode
                                                            ? "hover:bg-gray-700"
                                                            : "hover:bg-gray-100"
                                                    }`}
                                            >
                                                <span className={`mr-3 ${activeSection === section.id
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
                        <div className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                            }`}>
                            {/* Introduction */}
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <div className={`p-3 rounded-full mr-4 ${darkMode ? "bg-blue-900/30" : "bg-blue-50"
                                        }`}>
                                        <FiLayers className={`${darkMode ? "text-blue-400" : "text-blue-600"
                                            }`} size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Legal Notice</h2>
                                        <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                            Information according to legal requirements
                                        </p>
                                    </div>
                                </div>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    The following information is provided in accordance with legal requirements for business entities operating online platforms. This imprint applies to the website gadgetswap.com and all its subdomains.
                                </p>
                            </div>

                            {/* Main Content Sections */}
                            <div className="prose max-w-none prose-headings:mb-4 prose-p:mb-4 prose-p:leading-relaxed">
                                {sections.map((section) => (
                                    <section
                                        key={section.id}
                                        id={section.id}
                                        className={`mb-10 scroll-mt-24 ${activeSection === section.id ? "" : ""
                                            }`}
                                    >
                                        <div className="flex items-center mb-4">
                                            <span className={`mr-3 ${darkMode ? "text-blue-400" : "text-blue-600"
                                                }`}>
                                                {section.icon}
                                            </span>
                                            <h2 className="text-2xl font-bold">{section.title}</h2>
                                        </div>

                                        <div
                                            className={`${darkMode ? "text-gray-300" : "text-gray-700"
                                                } space-y-4`}
                                            dangerouslySetInnerHTML={{ __html: section.content }}
                                        />
                                    </section>
                                ))}
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className={`mt-8 p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                            }`}>
                            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"
                                    }`}>
                                    <div className="flex items-center mb-3">
                                        <FiMail className={`mr-3 ${darkMode ? "text-blue-400" : "text-blue-600"
                                            }`} size={20} />
                                        <h4 className="font-medium">Email</h4>
                                    </div>
                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        For general inquiries:<br />
                                        <a href="mailto:info@gadgetswap.com" className={`${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                            }`}>info@gadgetswap.com</a>
                                    </p>
                                    <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        For legal matters:<br />
                                        <a href="mailto:legal@gadgetswap.com" className={`${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                            }`}>legal@gadgetswap.com</a>
                                    </p>
                                </div>

                                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"
                                    }`}>
                                    <div className="flex items-center mb-3">
                                        <FiPhone className={`mr-3 ${darkMode ? "text-blue-400" : "text-blue-600"
                                            }`} size={20} />
                                        <h4 className="font-medium">Phone</h4>
                                    </div>
                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        Customer Support:<br />
                                        +1 (555) 123-4567
                                    </p>
                                    <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        Business Hours:<br />
                                        Monday - Friday, 9:00 AM - 5:00 PM (PST)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Compliance Notice */}
                        <div className={`mt-8 p-6 rounded-xl transition-colors ${darkMode ? "bg-blue-900/20" : "bg-blue-50"
                            } border-l-4 ${darkMode ? "border-blue-600" : "border-blue-500"
                            }`}>
                            <div className="flex items-start">
                                <FiCheckCircle className={`mr-4 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-500"
                                    }`} size={24} />
                                <div>
                                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-blue-400" : "text-blue-700"
                                        }`}>Compliance Statement</h3>
                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        This imprint complies with the legal requirements of the United States and, where applicable, with EU regulations including but not limited to the German Telemedia Act (TMG) and the EU General Data Protection Regulation (GDPR).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* International Notice */}
                        <div className={`mt-8 p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"
                            }`}>
                            <div className="flex items-start">
                                <FiGlobe className={`mr-4 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-600"
                                    }`} size={24} />
                                <div>
                                    <h3 className="text-lg font-bold mb-2">International Operations</h3>
                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        GadgetSwap operates internationally. For country-specific legal information, please contact our legal department at legal@gadgetswap.com.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Print Button */}
                        <div className="mt-8 flex justify-between">
                            <div className={`flex items-center px-3 py-1 rounded-full text-xs ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                                }`}>
                                <FiClock className="mr-1" size={14} />
                                <span>Last updated: March 15, 2024</span>
                            </div>
                            <button
                                onClick={() => window.print()}
                                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${darkMode
                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                    }`}
                            >
                                <FiPrinter className="mr-2" />
                                Print Imprint
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ImprintComponent;
