"use client"

import {useEffect, useState} from "react"
import {
    FiSun,
    FiMoon,
    FiMenu,
    FiX,
    FiUsers,
    FiTrendingUp,
    FiShield,
    FiGlobe,
    FiStar,
    FiMail,
    FiLinkedin,
    FiTwitter,
    FiInstagram,
    FiArrowRight,
    FiClock,
    FiHeart,
    FiSmile,
    FiThumbsUp,
    FiAward, FiMessageCircle,
} from "react-icons/fi"
import {FaLaptop} from "react-icons/fa"
import useTheme from "../../CustomHooks/useTheme.jsx";


const AboutUsComponent = () => {

    // const [darkMode, setDarkMode] = useState(false);
    const {darkMode} = useTheme();


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("story")


    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }


    // Handle section change
    const handleSectionChange = (section) => {
        setActiveSection(section)
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false)
        }
    }


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);


    // Team members data
    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "/placeholder.svg",
            bio: "Former tech executive with a passion for sustainable consumption and the sharing economy.",
            social: {
                linkedin: "#",
                twitter: "#",
            },
        },
        {
            name: "Michael Chen",
            role: "CTO",
            image: "/placeholder.svg",
            bio: "Full-stack developer with 10+ years experience building marketplace platforms.",
            social: {
                linkedin: "#",
                twitter: "#",
            },
        },
        {
            name: "Priya Patel",
            role: "Head of Operations",
            image: "/placeholder.svg",
            bio: "Supply chain expert focused on creating seamless rental experiences.",
            social: {
                linkedin: "#",
                twitter: "#",
            },
        },
        {
            name: "David Wilson",
            role: "Marketing Director",
            image: "/placeholder.svg",
            bio: "Digital marketing specialist with experience in growing tech startups.",
            social: {
                linkedin: "#",
                twitter: "#",
            },
        },
    ]


    // Company values
    const companyValues = [
        {
            title: "Sustainability",
            description: "Reducing e-waste through a circular economy of shared gadgets.",
            icon: <FiGlobe className="text-green-500" size={24}/>,
        },
        {
            title: "Accessibility",
            description: "Making premium technology accessible to everyone through affordable rentals.",
            icon: <FiUsers className="text-blue-500" size={24}/>,
        },
        {
            title: "Innovation",
            description: "Constantly improving our platform to provide the best rental experience.",
            icon: <FiTrendingUp className="text-purple-500" size={24}/>,
        },
        {
            title: "Trust & Safety",
            description: "Ensuring secure transactions and well-maintained gadgets for every rental.",
            icon: <FiShield className="text-red-500" size={24}/>,
        },
    ]


    // Milestones
    const milestones = [
        {
            year: "2020",
            title: "Company Founded",
            description: "GadgetSwap was founded with a mission to reduce e-waste and make technology more accessible.",
        },
        {
            year: "2021",
            title: "Platform Launch",
            description: "Our rental marketplace went live with 500 gadgets across 5 major cities.",
        },
        {
            year: "2022",
            title: "Series A Funding",
            description: "Secured $5M in funding to expand our inventory and improve the platform.",
        },
        {
            year: "2023",
            title: "Nationwide Expansion",
            description: "Expanded operations to 25 cities with over 10,000 gadgets available for rent.",
        },
        {
            year: "2024",
            title: "Sustainability Award",
            description: "Recognized for preventing 50 tons of e-waste through our rental model.",
        },
    ]


    // Testimonials
    const testimonials = [
        {
            name: "Jason T.",
            role: "Photographer",
            quote:
                "GadgetSwap allowed me to try out expensive camera gear before committing to a purchase. Saved me thousands!",
            rating: 5,
            image: "/placeholder.svg",
        },
        {
            name: "Emma L.",
            role: "Student",
            quote:
                "As a student, I could never afford the latest laptop. With GadgetSwap, I can rent high-end devices for my projects.",
            rating: 5,
            image: "/placeholder.svg",
        },
        {
            name: "Marcus R.",
            role: "Content Creator",
            quote: "The quality of gadgets is exceptional, and the rental process is seamless. My go-to for all tech needs!",
            rating: 4,
            image: "/placeholder.svg",
        },
    ]


    // Stats
    const stats = [
        {
            value: "25K+",
            label: "Gadgets Available",
            icon: <FaLaptop className="text-blue-500" size={20}/>,
        },
        {
            value: "50K+",
            label: "Happy Customers",
            icon: <FiSmile className="text-yellow-500" size={20}/>,
        },
        {
            value: "100+",
            label: "Cities Covered",
            icon: <FiGlobe className="text-green-500" size={20}/>,
        },
        {
            value: "4.8/5",
            label: "Average Rating",
            icon: <FiStar className="text-amber-500" size={20}/>,
        },
    ]


    return (
        <div
            className={`min-h-[calc(100vh-421px)] py-16 pt-32 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
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
                                    onClick={() => handleSectionChange("story")}
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
                                        activeSection === "story"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Our Story
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSectionChange("values")}
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
                                        activeSection === "values"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Our Values
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSectionChange("team")}
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
                                        activeSection === "team"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Our Team
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSectionChange("journey")}
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
                                        activeSection === "journey"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Our Journey
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSectionChange("testimonials")}
                                    className={`w-full text-left px-4 py-2 rounded-lg ${
                                        activeSection === "testimonials"
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                    }`}
                                >
                                    Testimonials
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            <div className="container mx-auto px-4">
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
                        About Us
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Discover Our Story, Passion, and Commitment to Excellence.
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation - Desktop */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div
                            className={`sticky top-8 rounded-xl p-4 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                            <nav>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            onClick={() => handleSectionChange("story")}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                                activeSection === "story"
                                                    ? "bg-blue-600 text-white"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Our Story
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSectionChange("values")}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                                activeSection === "values"
                                                    ? "bg-blue-600 text-white"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Our Values
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSectionChange("team")}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                                activeSection === "team"
                                                    ? "bg-blue-600 text-white"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Our Team
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSectionChange("journey")}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                                activeSection === "journey"
                                                    ? "bg-blue-600 text-white"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Our Journey
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleSectionChange("testimonials")}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                                activeSection === "testimonials"
                                                    ? "bg-blue-600 text-white"
                                                    : darkMode
                                                        ? "hover:bg-gray-700"
                                                        : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Testimonials
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Stats Section */}
                        <div
                            className={`rounded-xl p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex justify-center mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div
                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Our Story Section */}
                        {activeSection === "story" && (
                            <div
                                className={`rounded-xl overflow-hidden mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                                <div className="relative h-64 md:h-80">
                                    <img src="https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742345962/about-us-2_efnfat.jpg" alt="GadgetSwap Team"
                                         className="w-full h-full object-cover"/>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                        <div className="p-6">
                                            <h2 className="text-3xl font-bold text-white">Our Story</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="mb-4">
                                        GadgetSwap was born from a simple observation: most of us only use our tech
                                        gadgets for a fraction
                                        of their lifespan before upgrading, while many others can't afford to experience
                                        the latest
                                        technology.
                                    </p>

                                    <p className="mb-4">
                                        Founded in 2020 by Sarah Johnson, a former tech executive with a passion for
                                        sustainability,
                                        GadgetSwap set out to create a circular economy for consumer electronics. Our
                                        mission is to reduce
                                        e-waste by extending the useful life of gadgets through a peer-to-peer rental
                                        marketplace.
                                    </p>

                                    <p className="mb-4">
                                        What started as a small operation in San Francisco has grown into a nationwide
                                        platform connecting
                                        gadget owners with renters across the country. We've helped thousands of people
                                        access technology
                                        they otherwise couldn't afford, while enabling owners to offset the cost of
                                        their devices.
                                    </p>

                                    <p>
                                        Today, GadgetSwap offers everything from the latest smartphones and laptops to
                                        high-end cameras,
                                        gaming consoles, and VR headsets. Our community of users continues to grow as
                                        more people embrace
                                        the sharing economy and sustainable consumption.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Our Values Section */}
                        {activeSection === "values" && (
                            <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                                <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {companyValues.map((value, index) => (
                                        <div key={index}
                                             className={`p-5 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                            <div className="flex items-center mb-4">
                                                {value.icon}
                                                <h3 className="text-xl font-medium ml-3">{value.title}</h3>
                                            </div>
                                            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>{value.description}</p>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className={`mt-8 p-5 rounded-lg border-l-4 border-blue-500 ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}
                                >
                                    <h3 className="text-xl font-medium mb-2">Our Mission</h3>
                                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                        To create a world where everyone can access the technology they need without
                                        waste, by building the
                                        most trusted platform for gadget rentals.
                                    </p>
                                </div>

                                <div
                                    className={`mt-6 p-5 rounded-lg border-l-4 border-green-500 ${darkMode ? "bg-gray-700" : "bg-green-50"}`}
                                >
                                    <h3 className="text-xl font-medium mb-2">Our Vision</h3>
                                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                        A future where renting is the default for occasional-use technology,
                                        dramatically reducing e-waste
                                        while democratizing access to innovation.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Our Team Section */}
                        {activeSection === "team" && (
                            <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                                <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>

                                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {teamMembers.map((member, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-xl overflow-hidden transition-transform hover:-translate-y-1 ${darkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}
                                        >
                                            <div className="aspect-square">
                                                <img
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg">{member.name}</h3>
                                                <p className={`text-sm mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{member.role}</p>
                                                <p className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{member.bio}</p>
                                                <div className="flex space-x-2">
                                                    <a
                                                        href={member.social.linkedin}
                                                        className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                                                        aria-label={`${member.name}'s LinkedIn`}
                                                    >
                                                        <FiLinkedin size={16} className="text-blue-500"/>
                                                    </a>
                                                    <a
                                                        href={member.social.twitter}
                                                        className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                                                        aria-label={`${member.name}'s Twitter`}
                                                    >
                                                        <FiTwitter size={16} className="text-blue-400"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={`mt-8 p-5 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                    <h3 className="text-xl font-medium mb-3">Join Our Team</h3>
                                    <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        We're always looking for passionate individuals to join our mission of making
                                        technology more
                                        accessible and sustainable.
                                    </p>
                                    <a
                                        href="#careers"
                                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                                            darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                    >
                                        View Open Positions
                                        <FiArrowRight className="ml-2"/>
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Our Journey Section */}
                        {activeSection === "journey" && (
                            <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                                <h2 className="text-2xl font-bold mb-6">Our Journey</h2>

                                <div className="relative">
                                    {/* Timeline line */}
                                    <div
                                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 transform md:-translate-x-1/2"></div>

                                    {/* Timeline items */}
                                    <div className="space-y-12">
                                        {milestones.map((milestone, index) => (
                                            <div key={index}
                                                 className={`relative ${index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"}`}>
                                                {/* Timeline dot */}
                                                <div
                                                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800 transform -translate-y-1/2 md:-translate-x-1/2"></div>

                                                {/* Content */}
                                                <div
                                                    className={`ml-12 md:ml-0 p-5 rounded-lg ${
                                                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                                                    } ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                                                >
                                                    <div className="flex items-center mb-2">
                                                        <FiClock className="text-blue-500 mr-2"/>
                                                        <span
                                                            className={`text-sm font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                                            {milestone.year}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-medium mb-2">{milestone.title}</h3>
                                                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>{milestone.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className={`mt-12 p-5 rounded-lg text-center ${darkMode ? "bg-blue-900/30" : "bg-blue-50"}`}>
                                    <h3 className="text-xl font-medium mb-3">The Future of GadgetSwap</h3>
                                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                        We're just getting started! Our roadmap includes international expansion, new
                                        product categories,
                                        and innovative features to make gadget rentals even more seamless.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Testimonials Section */}
                        {activeSection === "testimonials" && (
                            <div className={`rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                                <h2 className="text-2xl font-bold mb-6">What Our Users Say</h2>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {testimonials.map((testimonial, index) => (
                                        <div key={index}
                                             className={`p-5 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={testimonial.image || "/placeholder.svg"}
                                                    alt={testimonial.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div className="ml-3">
                                                    <h3 className="font-medium">{testimonial.name}</h3>
                                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mb-3 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar
                                                        key={i}
                                                        className={`${
                                                            i < testimonial.rating
                                                                ? "text-yellow-500 fill-current"
                                                                : darkMode
                                                                    ? "text-gray-600"
                                                                    : "text-gray-300"
                                                        }`}
                                                        size={16}
                                                    />
                                                ))}
                                            </div>

                                            <p className={`italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>"{testimonial.quote}"</p>
                                        </div>
                                    ))}
                                </div>

                                <div className={`mt-8 p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                                    <div className="flex flex-col md:flex-row items-center justify-between">
                                        <div className="mb-4 md:mb-0">
                                            <h3 className="text-xl font-medium mb-2">Ready to join our community?</h3>
                                            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                                Start renting or listing your gadgets today.
                                            </p>
                                        </div>
                                        <div className="flex space-x-4">
                                            <a
                                                href="#rent"
                                                className={`px-4 py-2 rounded-lg font-medium ${
                                                    darkMode
                                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                                }`}
                                            >
                                                Rent a Gadget
                                            </a>
                                            <a
                                                href="#list"
                                                className={`px-4 py-2 rounded-lg font-medium ${
                                                    darkMode
                                                        ? "bg-gray-600 hover:bg-gray-700 text-white"
                                                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                                }`}
                                            >
                                                List Your Gadget
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div
                            className={`rounded-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                            <div className="relative">
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
                                <div className="relative p-8 md:p-12 text-white text-center">
                                    <h2 className="text-3xl font-bold mb-4">Join the GadgetSwap Revolution</h2>
                                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                                        Help us build a more sustainable future while accessing the latest technology at
                                        a fraction of the
                                        cost.
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <a
                                            href="#signup"
                                            className="px-6 py-3 rounded-lg font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors"
                                        >
                                            Sign Up Now
                                        </a>
                                        <a
                                            href="#learn-more"
                                            className="px-6 py-3 rounded-lg font-medium bg-transparent border border-white hover:bg-white/10 transition-colors"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="flex justify-center mb-3">
                                            <FiHeart className="text-red-500" size={24}/>
                                        </div>
                                        <h3 className="font-medium mb-2">Eco-Friendly</h3>
                                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Every rental prevents a new gadget purchase, reducing e-waste and carbon
                                            emissions.
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex justify-center mb-3">
                                            <FiThumbsUp className="text-blue-500" size={24}/>
                                        </div>
                                        <h3 className="font-medium mb-2">Cost-Effective</h3>
                                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Access high-end technology at a fraction of the purchase price.
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex justify-center mb-3">
                                            <FiAward className="text-amber-500" size={24}/>
                                        </div>
                                        <h3 className="font-medium mb-2">Quality Guaranteed</h3>
                                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            All gadgets are verified and insured for a worry-free experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        {/*<div className={`rounded-xl p-6 mt-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/2">
                                    <p className="mb-4">
                                        Have questions about GadgetSwap? We'd love to hear from you! Our team is
                                        available to assist with
                                        any inquiries.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <FiMail
                                                className={`mt-1 mr-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                            <div>
                                                <h3 className="font-medium">Email Us</h3>
                                                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>support@gadgetswap.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FiInstagram
                                                className={`mt-1 mr-3 ${darkMode ? "text-pink-400" : "text-pink-600"}`}/>
                                            <div>
                                                <h3 className="font-medium">Follow Us</h3>
                                                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                                    @gadgetswap on Instagram, Twitter, and Facebook
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-1/2">
                                    <form className="space-y-4">
                                        <div>
                                            <label
                                                className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full p-2 rounded-lg border ${
                                                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className={`w-full p-2 rounded-lg border ${
                                                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                rows="4"
                                                className={`w-full p-2 rounded-lg border ${
                                                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className={`px-4 py-2 rounded-lg font-medium ${
                                                darkMode
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                            }`}
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsComponent;
