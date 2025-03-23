import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { IoWarningOutline } from 'react-icons/io5';
import useTheme from "../../CustomHooks/useTheme.jsx";


const SignInComponent = () => {

    const navigate = useNavigate();


    // const [darkMode, setDarkMode] = useState(true);
    const {darkMode} = useTheme();


    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);


    // Error state
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });


    // Form touched state (to show errors only after field is touched)
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Validate on change
        validateField(name, value);
    };


    const handleBlur = (e) => {
        const { name } = e.target;

        setTouched({
            ...touched,
            [name]: true
        });

        validateField(name, formData[name]);
    };


    const validateField = (name, value) => {
        let errorMessage = '';

        switch (name) {
            case 'email':
                if (!value.trim()) {
                    errorMessage = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'password':
                if (!value) {
                    errorMessage = 'Password is required';
                } else if (value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters';
                }
                break;

            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [name]: errorMessage
        }));

        return !errorMessage;
    };


    const validateForm = () => {
        let isValid = true;

        // Validate all fields
        Object.keys(formData).forEach(key => {
            const fieldIsValid = validateField(key, formData[key]);
            if (!fieldIsValid) isValid = false;

            // Mark all fields as touched
            setTouched(prev => ({
                ...prev,
                [key]: true
            }));
        });

        return isValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear general error
        setErrors(prev => ({
            ...prev,
            general: ''
        }));

        if (validateForm()) {
            // In a real app, you would make an API call to authenticate the user
            // For this example, we'll simulate a successful login

            // Create user object
            const user = {
                email: formData.email,
                password: formData.password
            };

            // Log user info to console
            console.log('User signed in:', user);

            // Redirect to home page
            navigate('/');
        }
    };


    const handleGoogleSignIn = () => {
        // In a real app, this would integrate with Google OAuth
        console.log('Sign in with Google clicked');
        // After successful authentication, redirect to home
        // navigate('/');
    };


    /*useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);*/


    return (
        <div className={`min-h-[calc(100vh-421px)] flex items-center justify-center py-12 pt-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <div className={`max-w-xl w-full space-y-8 relative ${
                darkMode
                    ? 'bg-gray-800/70 border border-purple-900/30'
                    : 'bg-white/80 border border-indigo-200/30'
            } backdrop-blur-md p-8 rounded-2xl shadow-xl transition-all duration-300`}>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl -z-10"></div>

                <div className="text-center">
                    <h2 className={`text-3xl font-extrabold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    } transition-colors duration-300`}>
                        Sign in to your account
                    </h2>
                    <p className={`mt-2 text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    } transition-colors duration-300`}>
                        Access your GadgetSwap profile and start renting
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* General Error Message */}
                    {errors.general && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500 flex items-start">
                            <IoWarningOutline className="mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                            <span>{errors.general}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium ${
                                darkMode ? 'text-gray-200' : 'text-gray-700'
                            } transition-colors duration-300`}>
                                Email Address
                            </label>
                            <div className="mt-1 relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    <FiMail className="h-5 w-5" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                                        errors.email && touched.email
                                            ? 'border-red-500'
                                            : darkMode
                                                ? 'border-gray-600 bg-gray-700/50 text-white'
                                                : 'border-gray-300 bg-white/80 text-gray-900'
                                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                                        darkMode
                                            ? 'focus:ring-purple-500/50 focus:border-purple-500'
                                            : 'focus:ring-indigo-500/50 focus:border-indigo-500'
                                    } transition-colors duration-300`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && touched.email && (
                                <p className="mt-1 text-xs text-red-500 flex items-center">
                                    <IoWarningOutline className="mr-1 text-yellow-500" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className={`block text-sm font-medium ${
                                    darkMode ? 'text-gray-200' : 'text-gray-700'
                                } transition-colors duration-300`}>
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className={`font-medium ${
                                        darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-500'
                                    } transition-colors duration-300`}>
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-1 relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    <FiLock className="h-5 w-5" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`appearance-none block w-full pl-10 pr-10 py-2 border ${
                                        errors.password && touched.password
                                            ? 'border-red-500'
                                            : darkMode
                                                ? 'border-gray-600 bg-gray-700/50 text-white'
                                                : 'border-gray-300 bg-white/80 text-gray-900'
                                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                                        darkMode
                                            ? 'focus:ring-purple-500/50 focus:border-purple-500'
                                            : 'focus:ring-indigo-500/50 focus:border-indigo-500'
                                    } transition-colors duration-300`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                                        darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                                    } transition-colors duration-300`}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5" />
                                    ) : (
                                        <FiEye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                <p className="mt-1 text-xs text-red-500 flex items-center">
                                    <IoWarningOutline className="mr-1 text-yellow-500" />
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white ${
                                darkMode
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                darkMode ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
                            } transition-all duration-300 transform hover:scale-[1.02]`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FiLogIn className="h-5 w-5 text-white" />
                            </span>
                            Sign In
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className={`w-full border-t ${
                                darkMode ? 'border-gray-600' : 'border-gray-300'
                            } transition-colors duration-300`}></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className={`px-2 ${
                              darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'
                            } transition-colors duration-300`}>
                            OR
                            </span>
                        </div>
                    </div>

                    {/* Google Sign In Button */}
                    <div>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className={`group relative w-full flex justify-center py-2 px-4 border ${
                                darkMode
                                    ? 'border-gray-600 bg-gray-700/50 text-white hover:bg-gray-600/50'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            } rounded-lg text-sm font-medium transition-all duration-300`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FcGoogle className="h-5 w-5" />
                            </span>
                            Sign in with Google
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                        } transition-colors duration-300`}>
                            Not yet registered?{' '}
                            <Link
                                to="/sign-up"
                                className={`font-medium ${
                                    darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-500'
                                } transition-colors duration-300`}
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInComponent;
