import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    FiSearch,
    FiChevronDown,
    FiStar,
    FiChevronLeft,
    FiChevronRight,
    FiX,
    FiSliders,
    FiGrid,
    FiList,
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
} from "react-icons/fa"
import useTheme from "../../CustomHooks/useTheme.jsx";


const AllGadgetsComponent = () => {

    // const [darkMode, setDarkMode] = useState(false);
    const {darkMode} = useTheme();


    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [sortOption, setSortOption] = useState("alphabetic")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(12)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
    const [viewMode, setViewMode] = useState("grid")
    const [isLoading, setIsLoading] = useState(true)
    const [gadgetsData, setGadgetsData] = useState([])
    const [filteredGadgets, setFilteredGadgets] = useState([])
    const [isFiltering, setIsFiltering] = useState(false)


    // Categories with their icons
    const categories = [
        { name: "All", icon: <FiGrid className="mr-2" /> },
        { name: "Smartphones", icon: <FaMobileAlt className="mr-2 text-blue-500" /> },
        { name: "Laptops", icon: <FaLaptop className="mr-2 text-purple-500" /> },
        { name: "Tablets", icon: <FaTabletAlt className="mr-2 text-green-500" /> },
        { name: "Smartwatches", icon: <FaClock className="mr-2 text-pink-500" /> },
        { name: "Cameras", icon: <FaCamera className="mr-2 text-red-500" /> },
        { name: "Gaming", icon: <FaGamepad className="mr-2 text-indigo-500" /> },
        { name: "Audio", icon: <FaVolumeUp className="mr-2 text-yellow-500" /> },
        { name: "Headphones", icon: <FaHeadphones className="mr-2 text-cyan-500" /> },
        { name: "Speakers", icon: <FaVolumeUp className="mr-2 text-blue-500" /> },
        { name: "Wearables", icon: <FaWifi className="mr-2 text-lime-500" /> },
        { name: "VR", icon: <FaVrCardboard className="mr-2 text-orange-500" /> },
        { name: "Drones", icon: <FaPlane className="mr-2 text-teal-500" /> },
        { name: "Projectors", icon: <FaProjectDiagram className="mr-2 text-amber-500" /> },
    ]


    // Sorting options
    const sortOptions = [
        { value: "alphabetic", label: "Alphabetic (A-Z)" },
        { value: "priceAsc", label: "Price: Low to High" },
        { value: "priceDesc", label: "Price: High to Low" },
        { value: "popularity", label: "Popularity" },
    ]


    // Mock data for gadgets
    const mockGadgetsData = [
        // Smartphones
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 24.99,
            description: "Latest Apple iPhone with A17 Pro chip, 48MP camera system, and titanium design.",
            popularity: 98,
        },
        {
            id: 2,
            name: "Samsung Galaxy S23 Ultra",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 22.99,
            description: "Flagship Android phone with S Pen, 200MP camera, and Snapdragon 8 Gen 2.",
            popularity: 95,
        },
        {
            id: 3,
            name: "Google Pixel 8 Pro",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 19.99,
            description: "Google's latest with Tensor G3 chip and advanced AI photography features.",
            popularity: 90,
        },
        {
            id: 4,
            name: "OnePlus 11",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 18.99,
            description: "Flagship killer with Snapdragon 8 Gen 2, Hasselblad cameras, and 100W charging.",
            popularity: 87,
        },
        {
            id: 5,
            name: "Xiaomi 13 Pro",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 17.99,
            description: "Premium smartphone with Leica optics and Snapdragon 8 Gen 2.",
            popularity: 85,
        },
        {
            id: 6,
            name: "Nothing Phone (2)",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 16.99,
            description: "Unique transparent design with Glyph interface and clean Android experience.",
            popularity: 82,
        },
        {
            id: 7,
            name: "Motorola Edge 40 Pro",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.3,
            pricePerDay: 15.99,
            description: "Flagship with curved display, Snapdragon 8 Gen 2, and 125W charging.",
            popularity: 80,
        },
        {
            id: 8,
            name: "Sony Xperia 1 V",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 19.99,
            description: "Professional-grade camera features with 4K 120fps recording and 21:9 display.",
            popularity: 78,
        },
        {
            id: 9,
            name: "ASUS ROG Phone 7",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 21.99,
            description: "Ultimate gaming phone with AirTriggers, 165Hz display, and cooling system.",
            popularity: 88,
        },
        {
            id: 10,
            name: "Oppo Find X6 Pro",
            category: "Smartphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 18.99,
            description: "Premium smartphone with Hasselblad cameras and Snapdragon 8 Gen 2.",
            popularity: 83,
        },

        // Laptops
        {
            id: 11,
            name: 'MacBook Pro 16" M3 Max',
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 49.99,
            description: "Apple's most powerful laptop with M3 Max chip, 32GB RAM, and 1TB SSD.",
            popularity: 96,
        },
        {
            id: 12,
            name: "Dell XPS 15",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 39.99,
            description: "Premium Windows laptop with Intel Core i9, RTX 4070, and 4K OLED display.",
            popularity: 92,
        },
        {
            id: 13,
            name: "ASUS ROG Zephyrus G14",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 34.99,
            description: "Compact gaming powerhouse with AMD Ryzen 9 and RTX 4090.",
            popularity: 90,
        },
        {
            id: 14,
            name: "Lenovo ThinkPad X1 Carbon",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 32.99,
            description: "Business laptop with Intel Core i7, 32GB RAM, and legendary keyboard.",
            popularity: 88,
        },
        {
            id: 15,
            name: "HP Spectre x360",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 29.99,
            description: "Convertible laptop with OLED display, Intel Core i7, and gem-cut design.",
            popularity: 85,
        },
        {
            id: 16,
            name: "Microsoft Surface Laptop Studio",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 36.99,
            description: "Innovative form factor with pull-forward display and powerful specs.",
            popularity: 87,
        },
        {
            id: 17,
            name: "Razer Blade 16",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 44.99,
            description: "Premium gaming laptop with RTX 4090 and dual-mode mini-LED display.",
            popularity: 89,
        },
        {
            id: 18,
            name: "Framework Laptop 16",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 31.99,
            description: "Modular, repairable laptop with AMD Ryzen 9 and expansion bay system.",
            popularity: 84,
        },
        {
            id: 19,
            name: "Acer Swift Edge",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 27.99,
            description: 'Ultra-lightweight 16" laptop with 4K OLED display and AMD Ryzen 7.',
            popularity: 82,
        },
        {
            id: 20,
            name: "MSI Creator Z16",
            category: "Laptops",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 38.99,
            description: "Creator-focused laptop with RTX 4070, Intel Core i9, and color-accurate display.",
            popularity: 86,
        },

        // Tablets
        {
            id: 21,
            name: 'iPad Pro 12.9" M2',
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 29.99,
            description: "Apple's most powerful tablet with M2 chip, mini-LED display, and Apple Pencil support.",
            popularity: 95,
        },
        {
            id: 22,
            name: "Samsung Galaxy Tab S9 Ultra",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 27.99,
            description: 'Premium Android tablet with 14.6" AMOLED display and S Pen included.',
            popularity: 92,
        },
        {
            id: 23,
            name: "Microsoft Surface Pro 9",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 26.99,
            description: "Windows tablet with Intel Core i7 or Microsoft SQ3 processor options.",
            popularity: 88,
        },
        {
            id: 24,
            name: "Lenovo Tab P12 Pro",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 22.99,
            description: 'Premium Android tablet with 12.6" AMOLED display and Snapdragon 870.',
            popularity: 84,
        },
        {
            id: 25,
            name: "Xiaomi Pad 6 Pro",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 19.99,
            description: "High-performance tablet with 144Hz display and Snapdragon 8+ Gen 1.",
            popularity: 86,
        },
        {
            id: 26,
            name: "OnePlus Pad",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 18.99,
            description: "OnePlus's first tablet with 11.61\" 144Hz display and Dimensity 9000.",
            popularity: 83,
        },
        {
            id: 27,
            name: "HUAWEI MatePad Pro",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 21.99,
            description: "Premium tablet with OLED display and M-Pencil support.",
            popularity: 80,
        },
        {
            id: 28,
            name: "Amazon Fire Max 11",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.2,
            pricePerDay: 12.99,
            description: "Amazon's largest and most powerful Fire tablet with octa-core processor.",
            popularity: 78,
        },
        {
            id: 29,
            name: "Oppo Pad 2",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.3,
            pricePerDay: 17.99,
            description: 'Premium tablet with 11.61" 144Hz display and Dimensity 9000.',
            popularity: 79,
        },
        {
            id: 30,
            name: "Realme Pad X",
            category: "Tablets",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.1,
            pricePerDay: 14.99,
            description: "5G tablet with Snapdragon 695 and quad speakers with Dolby Atmos.",
            popularity: 76,
        },

        // Smartwatches
        {
            id: 31,
            name: "Apple Watch Ultra 2",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 14.99,
            description:
                "Rugged smartwatch with titanium case, precision dual-frequency GPS, and up to 36 hours of battery life.",
            popularity: 94,
        },
        {
            id: 32,
            name: "Samsung Galaxy Watch 6 Classic",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 12.99,
            description: "Premium smartwatch with rotating bezel, BioActive sensor, and Wear OS.",
            popularity: 90,
        },
        {
            id: 33,
            name: "Garmin Fenix 7X Solar",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 15.99,
            description: "Multisport GPS watch with solar charging and up to 37 days of battery life.",
            popularity: 92,
        },
        {
            id: 34,
            name: "Google Pixel Watch 2",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 11.99,
            description: "Google's latest smartwatch with Wear OS, Fitbit integration, and sleek design.",
            popularity: 86,
        },
        {
            id: 35,
            name: "Fitbit Sense 2",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 9.99,
            description: "Advanced health smartwatch with ECG, EDA sensor, and 6+ days of battery life.",
            popularity: 84,
        },
        {
            id: 36,
            name: "Huawei Watch GT 4",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.3,
            pricePerDay: 8.99,
            description: "Stylish smartwatch with up to 14 days of battery life and comprehensive health tracking.",
            popularity: 82,
        },
        {
            id: 37,
            name: "Amazfit GTR 4",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.2,
            pricePerDay: 7.99,
            description: "Feature-rich smartwatch with 14-day battery life and 150+ sports modes.",
            popularity: 80,
        },
        {
            id: 38,
            name: "Withings ScanWatch 2",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 10.99,
            description: "Hybrid smartwatch with ECG, SpO2, and up to 30 days of battery life.",
            popularity: 85,
        },
        {
            id: 39,
            name: "Fossil Gen 6 Wellness Edition",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.1,
            pricePerDay: 8.99,
            description: "Stylish Wear OS smartwatch with fast charging and wellness features.",
            popularity: 78,
        },
        {
            id: 40,
            name: "TicWatch Pro 5",
            category: "Smartwatches",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 9.99,
            description: "Dual-display smartwatch with Snapdragon W5+ Gen 1 and up to 80 hours of battery life.",
            popularity: 83,
        },

        // Cameras
        {
            id: 41,
            name: "Sony Alpha a7R V",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 59.99,
            description: "Flagship mirrorless camera with 61MP sensor, 8K video, and AI-based autofocus.",
            popularity: 95,
        },
        {
            id: 42,
            name: "Canon EOS R5",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 54.99,
            description: "Professional mirrorless camera with 45MP sensor and 8K RAW video recording.",
            popularity: 93,
        },
        {
            id: 43,
            name: "Nikon Z9",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 64.99,
            description: "Flagship mirrorless camera with 45.7MP stacked CMOS sensor and 8K video.",
            popularity: 94,
        },
        {
            id: 44,
            name: "Fujifilm X-T5",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 39.99,
            description: "Compact mirrorless camera with 40MP APS-C sensor and classic dial controls.",
            popularity: 89,
        },
        {
            id: 45,
            name: "Panasonic Lumix GH6",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 44.99,
            description: "Video-focused mirrorless camera with 5.7K ProRes recording and 25.2MP sensor.",
            popularity: 87,
        },
        {
            id: 46,
            name: "Leica Q3",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 79.99,
            description: "Premium compact camera with 60MP full-frame sensor and fixed 28mm f/1.7 lens.",
            popularity: 90,
        },
        {
            id: 47,
            name: "DJI Pocket 3",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 29.99,
            description: "Pocket-sized gimbal camera with 1-inch sensor and 4K/120fps video.",
            popularity: 86,
        },
        {
            id: 48,
            name: "GoPro HERO12 Black",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 24.99,
            description: "Flagship action camera with 5.3K video, HyperSmooth 6.0, and HDR.",
            popularity: 91,
        },
        {
            id: 49,
            name: "Insta360 X4",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 27.99,
            description: "360-degree camera with 8K video, 48MP photos, and AI editing features.",
            popularity: 88,
        },
        {
            id: 50,
            name: "Blackmagic Pocket Cinema Camera 6K G2",
            category: "Cameras",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 69.99,
            description: "Cinema camera with Super 35 sensor, 13 stops of dynamic range, and Blackmagic RAW.",
            popularity: 92,
        },

        // Gaming
        {
            id: 51,
            name: "PlayStation 5 Pro",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 24.99,
            description: "Sony's most powerful console with enhanced GPU, ray tracing, and 8K support.",
            popularity: 97,
        },
        {
            id: 52,
            name: "Xbox Series X",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 22.99,
            description: "Microsoft's flagship console with 12 teraflops of GPU power and Quick Resume.",
            popularity: 94,
        },
        {
            id: 53,
            name: "Nintendo Switch OLED",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 19.99,
            description: "Enhanced Switch with 7-inch OLED screen and improved audio.",
            popularity: 93,
        },
        {
            id: 54,
            name: "Steam Deck OLED",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 21.99,
            description: "Handheld gaming PC with OLED display, AMD APU, and extensive game compatibility.",
            popularity: 95,
        },
        {
            id: 55,
            name: "ASUS ROG Ally",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 20.99,
            description: "Windows-based handheld gaming device with AMD Z1 Extreme processor.",
            popularity: 89,
        },
        {
            id: 56,
            name: "Meta Quest 3",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 18.99,
            description: "Advanced standalone VR headset with mixed reality capabilities.",
            popularity: 90,
        },
        {
            id: 57,
            name: "PlayStation VR2",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 19.99,
            description: "Next-gen VR headset for PS5 with 4K HDR, eye tracking, and haptic feedback.",
            popularity: 88,
        },
        {
            id: 58,
            name: "Razer Kishi V2 Pro",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 9.99,
            description: "Premium mobile gaming controller with haptics and programmable buttons.",
            popularity: 85,
        },
        {
            id: 59,
            name: "Backbone One",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 8.99,
            description: "Premium mobile gaming controller with PlayStation edition available.",
            popularity: 84,
        },
        {
            id: 60,
            name: "Logitech G Cloud",
            category: "Gaming",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.3,
            pricePerDay: 14.99,
            description: "Cloud gaming handheld with 7-inch touchscreen and 12+ hour battery life.",
            popularity: 82,
        },

        // Audio
        {
            id: 61,
            name: "Sonos Era 300",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 19.99,
            description: "Spatial audio smart speaker with Dolby Atmos and voice control.",
            popularity: 92,
        },
        {
            id: 62,
            name: "Bose Smart Soundbar 900",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 24.99,
            description: "Premium soundbar with Dolby Atmos, voice assistants, and Bose spatial technologies.",
            popularity: 90,
        },
        {
            id: 63,
            name: "KEF LSX II",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 29.99,
            description: "Wireless hi-fi speakers with 100W per channel and streaming capabilities.",
            popularity: 88,
        },
        {
            id: 64,
            name: "Devialet Phantom I",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 39.99,
            description: "High-end wireless speaker with 108dB SPL and Heart Bass Implosion technology.",
            popularity: 86,
        },
        {
            id: 65,
            name: "Bang & Olufsen Beosound A5",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 34.99,
            description: "Portable luxury speaker with wooden handle, 12-hour battery, and 360° sound.",
            popularity: 85,
        },
        {
            id: 66,
            name: "JBL PartyBox 710",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 27.99,
            description: "Powerful party speaker with 800W output, light show, and DJ pad.",
            popularity: 89,
        },
        {
            id: 67,
            name: "Marshall Stanmore III",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 18.99,
            description: "Iconic home speaker with vintage design and modern connectivity.",
            popularity: 87,
        },
        {
            id: 68,
            name: "Yamaha MusicCast 50",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 16.99,
            description: "Wireless speaker with MusicCast multi-room audio and voice control.",
            popularity: 83,
        },
        {
            id: 69,
            name: "Denon Home 350",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 21.99,
            description: "Premium wireless speaker with HEOS multi-room and hi-res audio support.",
            popularity: 84,
        },
        {
            id: 70,
            name: "Harman Kardon Citation 500",
            category: "Audio",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 22.99,
            description: "Smart speaker with 200W output, premium wool fabric, and Google Assistant.",
            popularity: 86,
        },

        // Headphones
        {
            id: 71,
            name: "Apple AirPods Max",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 24.99,
            description: "Premium over-ear headphones with active noise cancellation and spatial audio.",
            popularity: 94,
        },
        {
            id: 72,
            name: "Sony WH-1000XM5",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 22.99,
            description: "Industry-leading noise cancellation with 30-hour battery life and LDAC support.",
            popularity: 93,
        },
        {
            id: 73,
            name: "Bose QuietComfort Ultra",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 21.99,
            description: "Premium noise-cancelling headphones with Immersive Audio and up to 24 hours of battery.",
            popularity: 91,
        },
        {
            id: 74,
            name: "Sennheiser Momentum 4 Wireless",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 19.99,
            description: "Audiophile-grade wireless headphones with 60-hour battery life.",
            popularity: 88,
        },
        {
            id: 75,
            name: "Apple AirPods Pro 2",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 18.99,
            description: "Premium in-ear headphones with active noise cancellation and adaptive transparency.",
            popularity: 92,
        },
        {
            id: 76,
            name: "Samsung Galaxy Buds 3 Pro",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 14.99,
            description: "Premium earbuds with intelligent ANC and 360 Audio technology.",
            popularity: 87,
        },
        {
            id: 77,
            name: "Bowers & Wilkins Px8",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 26.99,
            description: "Luxury wireless headphones with premium materials and audiophile sound quality.",
            popularity: 86,
        },
        {
            id: 78,
            name: "Shure AONIC 50 Gen 2",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 23.99,
            description: "Studio-quality wireless headphones with adjustable noise cancellation.",
            popularity: 85,
        },
        {
            id: 79,
            name: "Master & Dynamic MW75",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 25.99,
            description: "Luxury headphones with premium materials, ANC, and 28-hour battery life.",
            popularity: 84,
        },
        {
            id: 80,
            name: "Focal Bathys",
            category: "Headphones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 29.99,
            description: "High-end wireless headphones with built-in DAC and audiophile sound quality.",
            popularity: 89,
        },

        // VR
        {
            id: 81,
            name: "Meta Quest 3",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 24.99,
            description: "Advanced standalone VR headset with mixed reality capabilities and high-res display.",
            popularity: 93,
        },
        {
            id: 82,
            name: "PlayStation VR2",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 26.99,
            description: "Next-gen VR for PS5 with 4K HDR OLED displays and eye tracking.",
            popularity: 90,
        },
        {
            id: 83,
            name: "Valve Index",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 29.99,
            description: "Premium PC VR headset with finger tracking controllers and high refresh rate.",
            popularity: 92,
        },
        {
            id: 84,
            name: "HTC Vive Pro 2",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 27.99,
            description: "High-resolution PC VR headset with 5K display and 120-degree FOV.",
            popularity: 87,
        },
        {
            id: 85,
            name: "Pico 4 Enterprise",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 22.99,
            description: "Lightweight standalone VR headset with pancake optics and business features.",
            popularity: 85,
        },
        {
            id: 86,
            name: "Apple Vision Pro",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 49.99,
            description: "Premium mixed reality headset with eye tracking, hand tracking, and spatial computing.",
            popularity: 95,
        },
        {
            id: 87,
            name: "Varjo XR-4",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 59.99,
            description: "Professional mixed reality headset with human-eye resolution and advanced tracking.",
            popularity: 88,
        },
        {
            id: 88,
            name: "HP Reverb G2",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 19.99,
            description: "High-resolution Windows Mixed Reality headset with spatial audio.",
            popularity: 83,
        },
        {
            id: 89,
            name: "Pimax Crystal",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 34.99,
            description: "Wide FOV VR headset with dual 4K displays and modular design.",
            popularity: 84,
        },
        {
            id: 90,
            name: "Lynx R1",
            category: "VR",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.3,
            pricePerDay: 21.99,
            description: "Compact mixed reality headset with innovative optics and open-source platform.",
            popularity: 82,
        },

        // Drones
        {
            id: 91,
            name: "DJI Mavic 3 Pro",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 49.99,
            description: "Professional drone with Hasselblad camera system and 46-minute flight time.",
            popularity: 94,
        },
        {
            id: 92,
            name: "Autel EVO II Pro V3",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 44.99,
            description: "6K camera drone with 1-inch sensor and 40-minute flight time.",
            popularity: 89,
        },
        {
            id: 93,
            name: "Skydio 2+",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 39.99,
            description: "Autonomous drone with advanced obstacle avoidance and tracking capabilities.",
            popularity: 90,
        },
        {
            id: 94,
            name: "DJI Mini 4 Pro",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 29.99,
            description: "Sub-250g drone with 4K/60fps camera, obstacle sensing, and 34-minute flight time.",
            popularity: 92,
        },
        {
            id: 95,
            name: "DJI FPV 2",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 34.99,
            description: "Immersive first-person view drone with 4K/60fps and 140km/h top speed.",
            popularity: 88,
        },
        {
            id: 96,
            name: "Parrot Anafi AI",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 36.99,
            description: "4G-connected professional drone with 48MP camera and omnidirectional obstacle avoidance.",
            popularity: 85,
        },
        {
            id: 97,
            name: "Sony Airpeak S1",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 59.99,
            description: "Professional drone designed to carry Sony Alpha cameras for cinematography.",
            popularity: 87,
        },
        {
            id: 98,
            name: "PowerVision PowerEgg X",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.3,
            pricePerDay: 26.99,
            description: "Versatile drone that transforms into a handheld camera and can fly in rain.",
            popularity: 83,
        },
        {
            id: 99,
            name: "Autel Dragonfish",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 69.99,
            description: "VTOL fixed-wing drone with 4K camera and 120-minute flight time.",
            popularity: 84,
        },
        {
            id: 100,
            name: "Zero Zero Robotics Hover 2",
            category: "Drones",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.2,
            pricePerDay: 24.99,
            description: "Autonomous drone with obstacle avoidance and tracking features.",
            popularity: 80,
        },

        // Projectors
        {
            id: 101,
            name: "Samsung The Premiere",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 69.99,
            description: "4K ultra-short throw laser projector with 130-inch display and built-in speakers.",
            popularity: 92,
        },
        {
            id: 102,
            name: "LG CineBeam HU915QE",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 64.99,
            description: "Ultra-short throw 4K laser projector with 3700 ANSI lumens and 120-inch display.",
            popularity: 90,
        },
        {
            id: 103,
            name: "Sony VPL-XW7000ES",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 79.99,
            description: "Native 4K SXRD home theater projector with 3200 lumens and HDR enhancement.",
            popularity: 89,
        },
        {
            id: 104,
            name: "Epson EpiqVision Ultra LS800",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 59.99,
            description: "Ultra-short throw laser projector with 4K PRO-UHD and 4000 lumens.",
            popularity: 87,
        },
        {
            id: 105,
            name: "XGIMI Horizon Pro",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 39.99,
            description: "Portable 4K projector with Android TV, auto keystone correction, and Harman Kardon speakers.",
            popularity: 88,
        },
        {
            id: 106,
            name: "BenQ X3000i",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 44.99,
            description: "4K gaming projector with 3000 ANSI lumens and dedicated game modes.",
            popularity: 86,
        },
        {
            id: 107,
            name: "Anker Nebula Cosmos Laser 4K",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 34.99,
            description: "Portable 4K laser projector with 2400 ISO lumens and Android TV.",
            popularity: 85,
        },
        {
            id: 108,
            name: "Formovie Theater",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 49.99,
            description: "Ultra-short throw 4K laser projector with Dolby Vision and ALPD technology.",
            popularity: 88,
        },
        {
            id: 109,
            name: "JVC DLA-NZ9",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.9,
            pricePerDay: 99.99,
            description: "Flagship 8K laser projector with 3000 lumens and advanced HDR processing.",
            popularity: 91,
        },
        {
            id: 110,
            name: "Hisense PX2-PRO",
            category: "Projectors",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 54.99,
            description: "Triple laser 4K UST projector with 2400 ANSI lumens and 130-inch display.",
            popularity: 84,
        },

        // Wearables
        {
            id: 111,
            name: "Oura Ring Gen 3",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 14.99,
            description: "Smart ring that tracks sleep, activity, and readiness with 7-day battery life.",
            popularity: 89,
        },
        {
            id: 112,
            name: "Whoop 4.0",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 12.99,
            description: "Screenless fitness tracker focused on recovery, strain, and sleep metrics.",
            popularity: 87,
        },
        {
            id: 113,
            name: "Garmin Enduro 2",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 19.99,
            description: "Ultra-performance multisport watch with solar charging and up to 150 hours of GPS.",
            popularity: 90,
        },
        {
            id: 114,
            name: "Withings ScanWatch 2",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 13.99,
            description: "Hybrid smartwatch with ECG, SpO2, and up to 30 days of battery life.",
            popularity: 86,
        },
        {
            id: 115,
            name: "Polar Vantage V3",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.6,
            pricePerDay: 16.99,
            description: "Advanced multisport watch with ECG, offline maps, and dual-frequency GPS.",
            popularity: 85,
        },
        {
            id: 116,
            name: "Fitbit Charge 6",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.4,
            pricePerDay: 9.99,
            description: "Advanced fitness tracker with ECG, GPS, and 7-day battery life.",
            popularity: 88,
        },
        {
            id: 117,
            name: "Amazfit GTR 4",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.3,
            pricePerDay: 8.99,
            description: "Feature-rich smartwatch with 14-day battery life and 150+ sports modes.",
            popularity: 84,
        },
        {
            id: 118,
            name: "Garmin Venu 3",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.7,
            pricePerDay: 15.99,
            description: "Advanced health smartwatch with AMOLED display and up to 14 days of battery life.",
            popularity: 89,
        },
        {
            id: 119,
            name: "Coros Vertix 2",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.8,
            pricePerDay: 17.99,
            description: "Adventure GPS watch with dual-frequency GPS, offline maps, and 60-day battery life.",
            popularity: 86,
        },
        {
            id: 120,
            name: "Suunto Vertical",
            category: "Wearables",
            image: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            rating: 4.5,
            pricePerDay: 14.99,
            description: "Outdoor watch with solar charging, offline maps, and up to 60 days of battery life.",
            popularity: 83,
        },
    ]


    // Fetch gadgets data
    useEffect(() => {
        const fetchGadgets = async () => {
            setIsLoading(true)
            // Simulate API call
            setTimeout(() => {
                setGadgetsData(mockGadgetsData)
                setFilteredGadgets(mockGadgetsData)
                setIsLoading(false)
            }, 1500)
        }
        fetchGadgets().then()
    }, [])


    // Filter and sort gadgets when dependencies change
    useEffect(() => {
        if (!isLoading && gadgetsData.length > 0) {
            setIsFiltering(true)

            const timer = setTimeout(() => {
                const filtered = filterGadgets()
                const sorted = sortGadgets(filtered)
                setFilteredGadgets(sorted)
                setCurrentPage(1)
                setIsFiltering(false)
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [searchTerm, selectedCategory, sortOption])


    // Filter gadgets based on search term and selected category
    const filterGadgets = () => {
        return gadgetsData.filter((gadget) => {
            const matchesSearch =
                gadget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gadget.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === "All" || gadget.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }


    // Sort filtered gadgets
    const sortGadgets = (gadgets) => {
        switch (sortOption) {
            case "alphabetic":
                return [...gadgets].sort((a, b) => a.name.localeCompare(b.name))
            case "priceAsc":
                return [...gadgets].sort((a, b) => a.pricePerDay - b.pricePerDay)
            case "priceDesc":
                return [...gadgets].sort((a, b) => b.pricePerDay - a.pricePerDay)
            case "popularity":
                return [...gadgets].sort((a, b) => b.popularity - a.popularity)
            default:
                return gadgets
        }
    }


    // Get current gadgets for pagination
    const getCurrentGadgets = () => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

        return {
            currentGadgets: filteredGadgets.slice(indexOfFirstItem, indexOfLastItem),
            totalGadgets: filteredGadgets.length,
        }
    }


    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        // Scroll to top when changing page
        window.scrollTo({ top: 0, behavior: "smooth" })
    }


    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
    }


    // Handle sort change
    const handleSortChange = (option) => {
        setSortOption(option)
    }


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }


    // Handle gadget card click
    const handleGadgetClick = (id) => {
        navigate(`/all-gadgets/gadget-details/${id}`)
    }


    // Toggle filter menu for mobile
    const toggleFilterMenu = () => {
        setIsFilterMenuOpen(!isFilterMenuOpen)
    }


    // Toggle view mode (grid/list)
    const toggleViewMode = () => {
        setViewMode(viewMode === "grid" ? "list" : "grid")
    }


    // Generate pagination numbers
    const getPaginationNumbers = () => {
        const { totalGadgets } = getCurrentGadgets()
        const totalPages = Math.ceil(totalGadgets / itemsPerPage)
        const pageNumbers = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages are less than max pages to show
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // Always show first page
            pageNumbers.push(1)

            // Calculate start and end of middle pages
            let startPage = Math.max(2, currentPage - 1)
            let endPage = Math.min(totalPages - 1, currentPage + 1)

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                endPage = Math.min(totalPages - 1, 4)
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = Math.max(2, totalPages - 3)
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push("...")
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i)
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push("...")
            }

            // Always show last page if there are pages
            if (totalPages > 1) {
                pageNumbers.push(totalPages)
            }
        }

        return { pageNumbers, totalPages }
    }


    // Render skeleton loader for cards
    const renderSkeletonCards = () => {
        return Array(itemsPerPage)
            .fill()
            .map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    className={`rounded-xl overflow-hidden animate-pulse ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                    <div className="h-48 w-full bg-gray-700"></div>
                    <div className="p-4 space-y-3">
                        <div className={`h-5 w-3/4 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                        <div className={`h-4 w-full rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                        <div className={`h-4 w-2/3 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                        <div className="flex justify-between pt-2">
                            <div className={`h-4 w-16 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                            <div className={`h-4 w-20 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                        </div>
                    </div>
                </div>
            ))
    }


    // Render skeleton loader for list view
    const renderSkeletonList = () => {
        return Array(itemsPerPage)
            .fill()
            .map((_, index) => (
                <div
                    key={`skeleton-list-${index}`}
                    className={`rounded-xl overflow-hidden animate-pulse ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 h-48 sm:h-auto bg-gray-700"></div>
                        <div className="sm:w-3/4 p-4 sm:p-6 space-y-3">
                            <div className={`h-5 w-3/4 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                            <div className={`h-4 w-full rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                            <div className={`h-4 w-2/3 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                            <div className="flex justify-between pt-2">
                                <div className={`h-4 w-16 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                                <div className={`h-4 w-20 rounded ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
    }


    const { currentGadgets, totalGadgets } = getCurrentGadgets()
    const { pageNumbers, totalPages } = getPaginationNumbers()


    return (
        <div
            className={`min-h-screen py-8 pt-32 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
        >
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                        darkMode
                            ? 'bg-gray-800/70 text-blue-400 border border-gray-700/50'
                            : 'bg-white/80 text-blue-600 border border-blue-100/50 shadow-sm'
                    } backdrop-blur-md`}>
                        <FiSearch className="mr-2" />
                        <span>Find what you feel</span>
                    </div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Explore Gadgets
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Discover the latest tech available for rent from the best gadget brands.
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div
                    className={`mb-8 p-4 rounded-xl transition-all duration-300 ${darkMode ? "bg-gray-800 shadow-lg shadow-gray-900/20" : "bg-white shadow-md shadow-gray-200/50"}`}
                >
                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* Search Input */}
                        <div className="flex-grow">
                            <div
                                className={`relative rounded-lg overflow-hidden transition-colors ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                            >
                                <input
                                    type="text"
                                    placeholder="Search gadgets..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className={`w-full py-3 px-4 pr-12 focus:outline-none transition-colors ${
                                        darkMode
                                            ? "bg-gray-700 text-white placeholder-gray-400"
                                            : "bg-gray-100 text-gray-900 placeholder-gray-500"
                                    }`}
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <FiSearch className={`transition-colors ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Sort Dropdown - Desktop */}
                        <div className="hidden lg:block min-w-[200px]">
                            <div className={`relative rounded-lg transition-colors ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                <select
                                    value={sortOption}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className={`appearance-none w-full py-3 px-4 pr-10 rounded-lg focus:outline-none transition-colors ${
                                        darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                                    }`}
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <FiChevronDown
                                        className={`transition-colors ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                        size={20}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* View Toggle and Filter Button - Mobile */}
                        <div className="flex lg:hidden gap-2">
                            <button
                                onClick={toggleViewMode}
                                className={`p-3 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                aria-label={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
                            >
                                {viewMode === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
                            </button>

                            <button
                                onClick={toggleFilterMenu}
                                className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                <FiSliders size={20} />
                                <span>Filter & Sort</span>
                            </button>
                        </div>

                        {/* View Toggle - Desktop */}
                        <div className="hidden lg:block">
                            <button
                                onClick={toggleViewMode}
                                className={`p-3 rounded-lg transition-colors ${
                                    darkMode
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                aria-label={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
                            >
                                {viewMode === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Filter Menu */}
                    {isFilterMenuOpen && (
                        <div
                            className={`mt-4 p-4 rounded-lg lg:hidden transition-colors ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium">Filters & Sorting</h3>
                                <button onClick={toggleFilterMenu} className="transition-transform hover:rotate-90">
                                    <FiX size={20} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label
                                    className={`block mb-2 text-sm font-medium transition-colors ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                    Sort By
                                </label>
                                <select
                                    value={sortOption}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className={`w-full p-2 rounded-lg transition-colors ${
                                        darkMode
                                            ? "bg-gray-800 text-white border border-gray-700"
                                            : "bg-white text-gray-900 border border-gray-300"
                                    }`}
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    className={`block mb-2 text-sm font-medium transition-colors ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                    Categories
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.slice(0, 5).map((category) => (
                                        <button
                                            key={category.name}
                                            onClick={() => handleCategoryChange(category.name)}
                                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                                                selectedCategory === category.name
                                                    ? darkMode
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-blue-600 text-white"
                                                    : darkMode
                                                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                        : "bg-white text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                        <span className="flex items-center">
                                            {category.icon}
                                            {category.name}
                                        </span>
                                        </button>
                                    ))}
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className={`w-full p-2 mt-2 rounded-lg transition-colors ${
                                            darkMode
                                                ? "bg-gray-800 text-white border border-gray-700"
                                                : "bg-white text-gray-900 border border-gray-300"
                                        }`}
                                    >
                                        <option value="All">All Categories</option>
                                        {categories.slice(1).map((category) => (
                                            <option key={category.name} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Category Pills - Desktop */}
                <div className="hidden lg:flex mb-8 overflow-x-auto pb-2">
                    <div className="w-9/12 mx-auto flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => handleCategoryChange(category.name)}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                    selectedCategory === category.name
                                        ? darkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                            : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                                }`}
                            >
                                <span className="flex items-center">
                                    {category.icon}
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count and Sort - Desktop */}
                <div className="mb-6 flex justify-between items-center">
                    <p className={`transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {isLoading
                            ? "Loading gadgets..."
                            : isFiltering
                                ? "Filtering gadgets..."
                                : `Showing ${currentGadgets.length} of ${totalGadgets} gadgets`}
                    </p>

                    {/* Sort Dropdown - Desktop */}
                    {/*<div className="hidden lg:flex items-center gap-2">
                        <span className={`transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Sort by:</span>
                        <div className="relative z-10">
                            <select
                                value={sortOption}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className={`appearance-none py-2 px-4 pr-8 rounded-lg focus:outline-none transition-colors ${
                                    darkMode
                                        ? "bg-gray-800 text-white border border-gray-700"
                                        : "bg-white text-gray-900 border border-gray-200 shadow-sm"
                                }`}
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <FiChevronDown
                                    className={`transition-colors ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                    size={16}
                                />
                            </div>
                        </div>
                    </div>*/}
                </div>

                {/* No Results Message */}
                {!isLoading && !isFiltering && currentGadgets.length === 0 && (
                    <div className={`text-center py-16 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <FiSearch className="mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-medium mb-2">No gadgets found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}

                {/* Gadgets Grid with Animation */}
                {viewMode === "grid" && (
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 ${isFiltering ? "opacity-60" : "opacity-100"} transition-opacity duration-300`}
                    >
                        {isLoading
                            ? renderSkeletonCards()
                            : currentGadgets.map((gadget) => (
                                <div
                                    key={gadget.id}
                                    onClick={() => handleGadgetClick(gadget.id)}
                                    className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                                        darkMode ? "bg-gray-800 hover:bg-gray-750 shadow-lg" : "bg-white hover:bg-gray-50 shadow-md"
                                    }`}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={gadget.image || "/placeholder.svg"}
                                            alt={gadget.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                                                darkMode ? "bg-gray-900/80 text-white" : "bg-white/80 text-gray-900"
                                            }`}
                                        >
                                            {gadget.category}
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col h-44">
                                        <h3 className={`text-lg font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                            {gadget.name}
                                        </h3>
                                        <p className={`grow text-sm mb-3 line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                            {gadget.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <FiStar className="text-yellow-500 mr-1" size={16}/>
                                                <span
                                                    className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                                {gadget.rating.toFixed(1)}
                                            </span>
                                            </div>
                                            <div
                                                className={`text-lg font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                                ${gadget.pricePerDay.toFixed(2)}
                                                <span className="text-xs font-normal">/day</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* Gadgets List with Animation */}
                {viewMode === "list" && (
                    <div
                        className={`flex flex-col gap-4 mb-8 ${isFiltering ? "opacity-60" : "opacity-100"} transition-opacity duration-300`}
                    >
                        {isLoading
                            ? renderSkeletonList()
                            : currentGadgets.map((gadget) => (
                                <div
                                    key={gadget.id}
                                    onClick={() => handleGadgetClick(gadget.id)}
                                    className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${
                                        darkMode ? "bg-gray-800 hover:bg-gray-750 shadow-lg" : "bg-white hover:bg-gray-50 shadow-md"
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-1/4 h-48 sm:h-auto relative">
                                            <img
                                                src={gadget.image || "/placeholder.svg"}
                                                alt={gadget.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                                                    darkMode ? "bg-gray-900/80 text-white" : "bg-white/80 text-gray-900"
                                                }`}
                                            >
                                                {gadget.category}
                                            </div>
                                        </div>
                                        <div className="sm:w-3/4 p-4 sm:p-6 flex flex-col justify-around">
                                            <div>
                                                <h3
                                                    className={`text-xl font-medium mb-2 line-clamp-2 transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}
                                                >
                                                    {gadget.name}
                                                </h3>
                                                <p
                                                    className={`text-sm mb-4 line-clamp-3 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                                                >
                                                    {gadget.description}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <FiStar className="text-yellow-500 mr-1" size={16} />
                                                    <span
                                                        className={`text-sm font-medium transition-colors ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                                                    >
                                                        {gadget.rating.toFixed(1)}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`text-xl font-bold transition-colors ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                                                >
                                                    ${gadget.pricePerDay.toFixed(2)}
                                                    <span className="text-sm font-normal">/day</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <nav className="flex items-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg mr-2 transition-colors ${
                                    currentPage === 1
                                        ? darkMode
                                            ? "text-gray-600 cursor-not-allowed"
                                            : "text-gray-400 cursor-not-allowed"
                                        : darkMode
                                            ? "text-gray-300 hover:bg-gray-800"
                                            : "text-gray-700 hover:bg-gray-100"
                                }`}
                                aria-label="Previous page"
                            >
                                <FiChevronLeft size={20} />
                            </button>

                            <div className="flex space-x-1">
                                {pageNumbers.map((page, index) =>
                                    page === "..." ? (
                                        <span
                                            key={`ellipsis-${index}`}
                                            className={`px-2 py-1 transition-colors ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                                                currentPage === page
                                                    ? darkMode
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-blue-600 text-white"
                                                    : darkMode
                                                        ? "text-gray-300 hover:bg-gray-800"
                                                        : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ),
                                )}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg ml-2 transition-colors ${
                                    currentPage === totalPages
                                        ? darkMode
                                            ? "text-gray-600 cursor-not-allowed"
                                            : "text-gray-400 cursor-not-allowed"
                                        : darkMode
                                            ? "text-gray-300 hover:bg-gray-800"
                                            : "text-gray-700 hover:bg-gray-100"
                                }`}
                                aria-label="Next page"
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllGadgetsComponent;
