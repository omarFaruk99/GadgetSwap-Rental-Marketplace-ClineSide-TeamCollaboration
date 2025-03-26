import {useState, useEffect} from "react"
import {FiX, FiGift, FiCalendar} from "react-icons/fi"
import {FaMosque} from "react-icons/fa"
import {RiStarLine, RiStarFill} from "react-icons/ri"
import {useSelector} from "react-redux";


const EidSpecialFunComponent = () => {

    // States
    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [isClosing, setIsClosing] = useState(false)
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })


    // Close modal function with animation
    const closeModal = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsModalOpen(false)
        }, 500) // Match this with the animation duration
    }


    // Calculate countdown to Eid (March 30, 2025)
    useEffect(() => {
        const eidDate = new Date("March 30, 2025 00:00:00").getTime()

        const updateCountdown = () => {
            const now = new Date().getTime()
            const distance = eidDate - now

            if (distance < 0) {
                // Eid has arrived
                setCountdown({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                })
                return
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            setCountdown({days, hours, minutes, seconds})
        }

        // Update countdown every second
        const timer = setInterval(updateCountdown, 1000)
        updateCountdown() // Initial calculation

        // Cleanup timer on component unmount
        return () => clearInterval(timer)
    }, [])


    // Generate random glitter stars
    const renderGlitters = () => {
        const glitters = []
        const colors = ["text-yellow-400", "text-green-400", "text-blue-400", "text-purple-400", "text-pink-400"]

        for (let i = 0; i < 30; i++) {
            const size = Math.floor(Math.random() * 16) + 8 // 8-24px
            const top = Math.floor(Math.random() * 100)
            const left = Math.floor(Math.random() * 100)
            const delay = Math.random() * 2
            const duration = Math.random() * 2 + 1
            const color = colors[Math.floor(Math.random() * colors.length)]

            glitters.push(
                <div
                    key={i}
                    className={`absolute ${color} opacity-0`}
                    style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        animation: `glitter ${duration}s ease-in-out ${delay}s infinite`,
                        zIndex: 10,
                    }}
                >
                    {Math.random() > 0.5 ? <RiStarFill size={size}/> : <RiStarLine size={size}/>}
                </div>,
            )
        }
        return glitters
    }


    // If modal is closed, don't render anything
    if (!isModalOpen) return null


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop - transparent and blurred */}
            <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm" onClick={closeModal}></div>

            {/* Modal with zoom animation */}
            <div
                className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-xl 
                ${darkMode ? "bg-gray-900/60 text-white" : "bg-white/60 text-gray-900"} 
                backdrop-filter backdrop-blur-md
                transition-all duration-500 transform 
                ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
                style={{animation: isClosing ? "none" : "zoomIn 0.5s ease-out"}}
            >
                {/* Glitters burst animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">{renderGlitters()}</div>

                {/* Close button */}
                <button
                    onClick={closeModal}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-20
                ${darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    aria-label="Close modal"
                >
                    <FiX size={20}/>
                </button>

                <div className="p-8 relative z-10">
                    {/* Header - Eid greeting */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <FaMosque className="text-green-500 animate-pulse" size={48}/>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                            Eid Mubarak!
                        </h2>
                        <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Celebrate Eid-ul-Fitr with special offers on GadgetSwap
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-800/60" : "bg-gray-50/60"}`}>
                        <h3 className="text-center text-lg font-medium mb-4 flex items-center justify-center">
                            <FiCalendar className="mr-2 text-blue-500"/>
                            Countdown to Eid-ul-Fitr
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div
                                className={`text-center p-4 rounded-lg ${darkMode ? "bg-gray-700/60" : "bg-white/60"}`}>
                                <div className="text-3xl font-bold text-green-500">{countdown.days}</div>
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Days</div>
                            </div>
                            <div
                                className={`text-center p-4 rounded-lg ${darkMode ? "bg-gray-700/60" : "bg-white/60"}`}>
                                <div className="text-3xl font-bold text-blue-500">{countdown.hours}</div>
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Hours</div>
                            </div>
                            <div
                                className={`text-center p-4 rounded-lg ${darkMode ? "bg-gray-700/60" : "bg-white/60"}`}>
                                <div className="text-3xl font-bold text-amber-500">{countdown.minutes}</div>
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Minutes</div>
                            </div>
                            <div
                                className={`text-center p-4 rounded-lg ${darkMode ? "bg-gray-700/60" : "bg-white/60"}`}>
                                <div className="text-3xl font-bold text-purple-500">{countdown.seconds}</div>
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Seconds</div>
                            </div>
                        </div>
                    </div>

                    {/* Special Offer */}
                    <div
                        className={`mb-8 p-6 rounded-xl border-2 border-dashed ${
                            darkMode ? "bg-gray-800/60 border-green-500/30" : "bg-white/60 border-green-500/50"
                        }`}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0 md:mr-6">
                                <h3 className="text-xl font-bold mb-2 flex items-center">
                                    <FiGift className="mr-2 text-green-500"/>
                                    Special Eid Offer
                                </h3>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>
                                    Enjoy exclusive discounts on all gadget rentals
                                </p>
                                <div className="flex items-center">
                                    <span className="font-medium">
                                        Use code: <span className="font-bold text-green-500">EID2025</span>
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`text-center p-4 rounded-full ${
                                    darkMode ? "bg-green-900/40" : "bg-green-100/60"
                                } h-24 w-24 flex items-center justify-center`}
                            >
                                <div>
                                    <div className="text-2xl font-bold text-green-500">30%</div>
                                    <div className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>OFF</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                        <button
                            onClick={closeModal}
                            className="px-6 py-3 rounded-lg font-medium transition-colors bg-green-600 hover:bg-green-700 text-white flex items-center justify-center mx-auto"
                        >
                            <FiGift className="mr-2"/>
                            Explore Eid Offers
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS for glitter animation */}
            <style>{`
                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale3d(0.3, 0.3, 0.3);
                    }
                    50% {
                        opacity: 1;
                    }
                }

                @keyframes glitter {
                    0% {
                        opacity: 0;
                        transform: scale(0.3) rotate(0deg);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1) rotate(180deg);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0.3) rotate(360deg);
                    }
                }
            `}</style>
        </div>
    )
}

export default EidSpecialFunComponent;
