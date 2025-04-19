import { useSelector } from "react-redux"
import { FiMail, FiArrowRight, FiAlertCircle, FiCheckCircle } from "react-icons/fi"
import { useState } from "react"



const PasswordResetComponent = () => {

    // States
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const [error, setError] = useState("")


    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className={`max-w-md w-full space-y-6 ${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-md`}>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className={`mt-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Enter your email address and we'll send you a link to reset your password
                    </p>
                </div>

                
                    <div
                        className={`mt-6 p-4 rounded-md ${darkMode ? "bg-green-900/20 border border-green-700" : "bg-green-50 border border-green-200"
                            }`}
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FiCheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-800"}`}>
                                    Password Reset Email Sent
                                </h3>
                                <div className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We've sent a password reset link to <span className="font-medium"></span>. Please check your
                                        inbox and follow the instructions.
                                    </p>
                                    <p className="mt-2">Redirecting you to sign in page...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <form className="mt-8 space-y-6">
                        <div>
                            <label
                                htmlFor="email-address"
                                className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                            >
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} aria-hidden="true" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    
                                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${error
                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                        : darkMode
                                            ? "border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                                            : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                        } rounded-md shadow-sm placeholder-gray-400 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                                        } focus:outline-none focus:ring-2`}
                                    placeholder="you@example.com"
                                />
                            </div>
                           
                                <div className="mt-2 flex items-center text-sm text-red-500">
                                    <FiAlertCircle className="mr-1 h-4 w-4 flex-shrink-0" />
                                    
                                </div>
                            
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700"
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer transition-colors duration-200 "opacity-70 cursor-not-allowed" : ""
                                    `}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FiArrowRight className="h-5 w-5 text-purple-400 group-hover:text-purple-300"
                                        aria-hidden="true" />
                                </span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Remember your password?{" "}
                                <button
                                    type="button"
                                    className={`font-medium ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
                                        } cursor-pointer`}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </form>
                
            </div>
        </div>
    )
}

export default PasswordResetComponent;