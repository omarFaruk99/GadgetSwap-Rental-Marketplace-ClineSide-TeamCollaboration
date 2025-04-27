import { useContext, useEffect, useState } from "react"
import { FiAward, FiStar, FiTrendingUp, FiUserPlus, FiClock, FiDollarSign, FiShoppingBag, FiMessageSquare, FiUsers, FiChevronUp, FiChevronDown, FiGift, FiCreditCard, FiShield, FiTruck, FiHeadphones, FiPercent, FiAlertCircle, FiCheck } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import AuthContext from "../../../Providers/AuthContext.jsx"
import {getUserProfileDetails, updateUserMembershipInfo} from "../../../Features/userProfileDetails/userProfileDetailsSlice.js"
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure.jsx"


const UserLoyaltyAndRewardComponent = () => {

    // State management
      // State management
      const darkMode = useSelector((state) => state?.darkMode?.isDark)
      const { user: registeredUser } = useContext(AuthContext)
      const dispatch = useDispatch()
      const { userProfileDetails } = useSelector((state) => state?.userProfileDetails)
      const axiosSecure = useAxiosSecure()
      const [emailError, setEmailError] = useState("")
      const [animateProgress, setAnimateProgress] = useState(false)
  
      // Format date helper function
      const formatJoinDate = (dateString) => {
          if (!dateString) return "Unknown date"
  
          const date = new Date(dateString)
          const options = { year: "numeric", month: "long" }
          return date.toLocaleDateString("en-US", options)
      }
  


    // Fetch user profile detail on mount
    useEffect(() => {
        if (registeredUser?.email) {
            dispatch(getUserProfileDetails({ userEmail: registeredUser?.email, axiosSecure }))
        }
    }, [axiosSecure, dispatch, registeredUser?.email])


    // Initial real user data from the backend
    const [realUserData, setRealUserData] = useState({
        joinDate: userProfileDetails?.joinDate,
        membershipDetails: {
            membershipTier: userProfileDetails?.membershipDetails?.membershipTier,
            points: userProfileDetails?.membershipDetails?.points,
            rentalStreak: userProfileDetails?.membershipDetails?.rentalStreak,
            referrals: userProfileDetails?.membershipDetails?.referrals,
        },
    })


    // Update realUserData when userProfileDetails changes
    useEffect(() => {
        if (userProfileDetails) {
            setRealUserData({
                joinDate: userProfileDetails?.joinDate,
                membershipDetails: {
                    membershipTier: userProfileDetails?.membershipDetails?.membershipTier,
                    points: userProfileDetails?.membershipDetails?.points,
                    rentalStreak: userProfileDetails?.membershipDetails?.rentalStreak,
                    referrals: userProfileDetails?.membershipDetails?.referrals,
                },
            })
        }
    }, [userProfileDetails])




    // Initial fake user data
    const initialUserData = {
        id: "usr_123456",
        name: "Alex Johnson",
        points: 2750,
        membershipTier: "Silver",
        memberSince: "January 2023",
        referrals: 3,
        rentalStreak: 8,
        activities: [
            {
                id: 1,
                date: "2023-11-15",
                type: "rental",
                description: "Rented iPhone 13 Pro",
                pointsEarned: 150,
                amountSpent: 89.99,
            },
            {
                id: 2,
                date: "2023-11-10",
                type: "review",
                description: "Wrote review for MacBook Pro",
                pointsEarned: 50,
                amountSpent: 0,
            },
            {
                id: 3,
                date: "2023-11-05",
                type: "referral",
                description: "Referred Sarah Williams",
                pointsEarned: 200,
                amountSpent: 0,
            },
            {
                id: 4,
                date: "2023-10-28",
                type: "rental",
                description: "Rented DJI Drone",
                pointsEarned: 120,
                amountSpent: 75.5,
            },
            {
                id: 5,
                date: "2023-10-20",
                type: "benefit",
                description: "Used Free Express Shipping",
                pointsDeducted: 100,
                benefitUsed: "Express Shipping",
            },
            {
                id: 6,
                date: "2023-10-15",
                type: "rental",
                description: "Rented Sony A7 Camera",
                pointsEarned: 180,
                amountSpent: 110.0,
            },
            {
                id: 7,
                date: "2023-10-08",
                type: "benefit",
                description: "Used 10% Discount",
                pointsDeducted: 300,
                benefitUsed: "Discount Coupon",
            },
        ],
    }


    // Membership tiers data
    const membershipTiers = [
        {
            tier: "Bronze",
            pointsRequired: 0,
            benefits: ["5% discount on rentals", "Basic customer support", "Access to standard inventory"],
        },
        {
            tier: "Silver",
            pointsRequired: 2000,
            benefits: [
                "10% discount on rentals",
                "Priority customer support",
                "Access to premium inventory",
                "Free standard shipping",
            ],
        },
        {
            tier: "Gold",
            pointsRequired: 5000,
            benefits: [
                "15% discount on rentals",
                "24/7 VIP customer support",
                "Access to exclusive inventory",
                "Free express shipping",
                "One free rental per month (up to $50)",
            ],
        },
        {
            tier: "Platinum",
            pointsRequired: 10000,
            benefits: [
                "20% discount on rentals",
                "Dedicated account manager",
                "Access to all inventory including pre-release items",
                "Free express shipping",
                "Two free rentals per month (up to $100)",
                "Exclusive events and product previews",
            ],
        },
    ]


    // States
    const [userData, setUserData] = useState(initialUserData)
    const [expandedSections, setExpandedSections] = useState({
        benefits: true,
        upgrade: false,
        referral: false,
        activity: true,
    })


    // Get current membership tier details
    const getCurrentTier = () => {
        return membershipTiers.find((tier) => tier.tier === userData.membershipTier)
    }


    // Get next membership tier details
    const getNextTier = () => {
        const currentTierIndex = membershipTiers.findIndex((tier) => tier.tier === userData.membershipTier)
        if (currentTierIndex < membershipTiers.length - 1) {
            return membershipTiers[currentTierIndex + 1]
        }
        return null
    }


    // Calculate points needed for next tier
    const getPointsNeededForNextTier = () => {
        const nextTier = getNextTier()
        if (nextTier) {
            return Math.max(0, nextTier.pointsRequired - userData.points)
        }
        return 0
    }


    // Toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        })
    }


    // Handle membership upgrade
    const handleUpgrade = () => {
        const nextTier = getNextTier()
        if (nextTier) {
            // In a real app, this would be an API call
            const updatedUserData = {
                ...userData,
                membershipTier: nextTier.tier,
                points: userData.points - getPointsNeededForNextTier(),
                activities: [
                    {
                        id: userData.activities.length + 1,
                        date: new Date().toISOString().split("T")[0],
                        type: "upgrade",
                        description: `Upgraded to ${nextTier.tier} Membership`,
                        pointsDeducted: getPointsNeededForNextTier(),
                        benefitUsed: "Membership Upgrade",
                    },
                    ...userData.activities,
                ],
            }

            setUserData(updatedUserData)
            console.log("Membership Upgraded:", updatedUserData)
        }
    }


    // Handle refer a friend
    const handleReferFriend = (e) => {
        e.preventDefault()
        const referralPoints = 200
        const friendEmail = e.target.email.value

        if (!friendEmail) return

        // In a real app, this would be an API call
        const updatedUserData = {
            ...userData,
            points: userData.points + referralPoints,
            referrals: userData.referrals + 1,
            activities: [
                {
                    id: userData.activities.length + 1,
                    date: new Date().toISOString().split("T")[0],
                    type: "referral",
                    description: `Referred friend: ${friendEmail}`,
                    pointsEarned: referralPoints,
                    amountSpent: 0,
                },
                ...userData.activities,
            ],
        }

        setUserData(updatedUserData)
        console.log("Friend Referred:", updatedUserData)

        // Reset form
        e.target.reset()
    }


    // Get icon for activity type
    const getActivityIcon = (type) => {
        switch (type) {
            case "rental":
                return <FiShoppingBag className="text-blue-500" />
            case "review":
                return <FiMessageSquare className="text-green-500" />
            case "referral":
                return <FiUsers className="text-purple-500" />
            case "benefit":
                return <FiGift className="text-amber-500" />
            case "upgrade":
                return <FiAward className="text-red-500" />
            default:
                return <FiClock className="text-gray-500" />
        }
    }


    // Calculate membership progress percentage
    const calculateProgressPercentage = () => {
        const nextTier = getNextTier()
        if (!nextTier) return 100 // Already at highest tier

        const currentTier = getCurrentTier()
        const totalPointsNeeded = nextTier.pointsRequired - currentTier.pointsRequired
        const pointsAchieved = userData.points - currentTier.pointsRequired

        return Math.min(100, Math.max(0, (pointsAchieved / totalPointsNeeded) * 100))
    }


    // Get tier badge color
    const getTierColor = (tier) => {
        switch (tier) {
            case "Bronze":
                return "bg-amber-700"
            case "Silver":
                return "bg-gray-400"
            case "Gold":
                return "bg-amber-400"
            case "Platinum":
                return "bg-indigo-600"
            default:
                return "bg-gray-500"
        }
    }


    // Get benefit icon
    const getBenefitIcon = (benefit) => {
        if (benefit.includes("discount")) {
            return <FiPercent className="text-green-500" />
        } else if (benefit.includes("shipping")) {
            return <FiTruck className="text-blue-500" />
        } else if (benefit.includes("support")) {
            return <FiHeadphones className="text-purple-500" />
        } else if (benefit.includes("free rental")) {
            return <FiGift className="text-red-500" />
        } else if (benefit.includes("inventory")) {
            return <FiShoppingBag className="text-amber-500" />
        } else if (benefit.includes("account manager") || benefit.includes("events")) {
            return <FiShield className="text-indigo-500" />
        } else {
            return <FiStar className="text-blue-500" />
        }
    }


    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }, []);


    return (
        <div
            className={`w-full mx-auto rounded-xl ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
        >

            {/* Points and Membership Summary */}
            <div
                className={`rounded-xl overflow-hidden shadow-sm mb-6 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <div className="flex items-center">
                                <FiAward
                                    size={24}
                                    className={`mr-2 ${userData.membershipTier === "Bronze" ? "text-amber-700" : userData.membershipTier === "Silver" ? "text-gray-400" : userData.membershipTier === "Gold" ? "text-amber-400" : "text-indigo-600"}`}
                                />
                                <h2 className="text-xl font-semibold">{userData.membershipTier} Member</h2>
                                <span
                                    className={`ml-2 px-2 py-1 text-xs font-medium rounded-full text-white ${getTierColor(userData.membershipTier)}`}
                                >
                                    {userData.membershipTier}
                                </span>
                            </div>
                            <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Member since {userData.memberSince}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <FiStar size={24} className="mr-2 text-amber-400" />
                            <div>
                                <div className="text-2xl font-bold">{userData.points.toLocaleString()}</div>
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Points</div>
                            </div>
                        </div>
                    </div>

                    {getNextTier() && (
                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Progress to {getNextTier().tier}
                                </span>
                                <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {getPointsNeededForNextTier().toLocaleString()} points needed
                                </span>
                            </div>
                            <div className={`h-2 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                <div
                                    className={`h-full rounded-full ${userData.membershipTier === "Bronze" ? "bg-amber-700" : userData.membershipTier === "Silver" ? "bg-gray-400" : userData.membershipTier === "Gold" ? "bg-amber-400" : "bg-indigo-600"}`}
                                    style={{ width: `${calculateProgressPercentage()}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Benefits Section */}
            <div
                className={`rounded-xl overflow-hidden shadow-sm mb-6 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
                <div
                    className={`p-4 flex justify-between items-center cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                    onClick={() => toggleSection("benefits")}
                >
                    <div className="flex items-center">
                        <FiGift size={20} className="mr-2 text-purple-500" />
                        <h3 className="text-lg font-semibold">Your Benefits</h3>
                    </div>
                    {expandedSections.benefits ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.benefits && (
                    <div className="p-4 pt-0">
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getCurrentTier().benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg flex items-start ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                                >
                                    <div className="mr-3 mt-1">{getBenefitIcon(benefit)}</div>
                                    <div>
                                        <p className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{benefit}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Membership Upgrade Section */}
            <div
                className={`rounded-xl overflow-hidden shadow-sm mb-6 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
                <div
                    className={`p-4 flex justify-between items-center cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                    onClick={() => toggleSection("upgrade")}
                >
                    <div className="flex items-center">
                        <FiTrendingUp size={20} className="mr-2 text-green-500" />
                        <h3 className="text-lg font-semibold">Membership Upgrade</h3>
                    </div>
                    {expandedSections.upgrade ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.upgrade && (
                    <div className="p-4 pt-0">
                        {getNextTier() ? (
                            <div className="mt-4">
                                <div
                                    className={`p-5 rounded-lg border-2 border-dashed ${darkMode ? "border-gray-600 bg-gray-700/50" : "border-gray-200 bg-gray-50/50"}`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="mb-4 md:mb-0">
                                            <div className="flex items-center">
                                                <FiAward
                                                    size={20}
                                                    className={`mr-2 ${getNextTier().tier === "Bronze" ? "text-amber-700" : getNextTier().tier === "Silver" ? "text-gray-400" : getNextTier().tier === "Gold" ? "text-amber-400" : "text-indigo-600"}`}
                                                />
                                                <h4 className="text-lg font-semibold">{getNextTier().tier} Membership</h4>
                                            </div>
                                            <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                Unlock premium benefits and exclusive perks
                                            </p>
                                        </div>

                                        <div className="flex items-center">
                                            <FiStar size={20} className="mr-2 text-amber-400" />
                                            <span className="font-medium">{getPointsNeededForNextTier().toLocaleString()} points needed</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h5 className="font-medium mb-2">New Benefits You'll Unlock:</h5>
                                        <ul className="space-y-2">
                                            {getNextTier()
                                                .benefits.filter((benefit) => !getCurrentTier().benefits.includes(benefit))
                                                .map((benefit, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <FiStar className="mr-2 text-amber-400" size={16} />
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleUpgrade}
                                            disabled={userData.points < getNextTier().pointsRequired}
                                            className={`px-4 py-2 rounded-lg font-medium ${
                                                userData.points >= getNextTier().pointsRequired
                                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                                    : `${darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-500"}`
                                            }`}
                                        >
                                            {userData.points >= getNextTier().pointsRequired
                                                ? `Upgrade to ${getNextTier().tier}`
                                                : `Need ${getPointsNeededForNextTier().toLocaleString()} more points`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 p-5 rounded-lg text-center">
                                <FiAward size={48} className="mx-auto mb-3 text-indigo-600" />
                                <h4 className="text-lg font-semibold">Congratulations!</h4>
                                <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    You've reached our highest membership tier. Enjoy all the exclusive benefits!
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Refer a Friend Section */}
            <div
                className={`rounded-xl overflow-hidden shadow-sm mb-6 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
                <div
                    className={`p-4 flex justify-between items-center cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                    onClick={() => toggleSection("referral")}
                >
                    <div className="flex items-center">
                        <FiUserPlus size={20} className="mr-2 text-blue-500" />
                        <h3 className="text-lg font-semibold">Refer a Friend</h3>
                    </div>
                    {expandedSections.referral ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.referral && (
                    <div className="p-4 pt-0">
                        <div className="mt-4">
                            <div className={`p-5 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                <div className="flex items-center mb-4">
                                    <FiStar size={20} className="mr-2 text-amber-400" />
                                    <span className="font-medium">Earn 200 points for each friend who joins</span>
                                </div>

                                <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    Invite your friends to join GadgetSwap and earn rewards when they sign up and make their first rental.
                                </p>

                                <form onSubmit={handleReferFriend} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className={`block mb-1 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            Friend's Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`w-full px-3 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                                                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                                            } focus:outline-none`}
                                            placeholder="Enter your friend's email"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Send Invitation
                                    </button>
                                </form>

                                <div className="mt-4 flex items-center">
                                    <FiUsers size={16} className="mr-2 text-purple-500" />
                                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        You've referred {userData.referrals} {userData.referrals === 1 ? "friend" : "friends"} so far
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Activity History Section */}
            <div
                className={`rounded-xl overflow-hidden shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
                <div
                    className={`p-4 flex justify-between items-center cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                    onClick={() => toggleSection("activity")}
                >
                    <div className="flex items-center">
                        <FiClock size={20} className="mr-2 text-amber-500" />
                        <h3 className="text-lg font-semibold">Activity History</h3>
                    </div>
                    {expandedSections.activity ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.activity && (
                    <div className="p-4 pt-0">
                       <div className="mt-4 overflow-x-auto">
                            <table className={`min-w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-300"}`}>
                                <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Activity
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Points
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell"
                                    >
                                        Details
                                    </th>
                                </tr>
                                </thead>
                                <tbody className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                                {userData.activities.map((activity) => (
                                    <tr key={activity.id} className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            {new Date(activity.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">{getActivityIcon(activity.type)}</div>
                                                <div className="text-sm font-medium">{activity.description}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            {activity.pointsEarned ? (
                                                <span className="text-green-500 font-medium">+{activity.pointsEarned}</span>
                                            ) : activity.pointsDeducted ? (
                                                <span className="text-red-500 font-medium">-{activity.pointsDeducted}</span>
                                            ) : (
                                                <span>—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                                            {activity.amountSpent > 0 && (
                                                <div className="flex items-center">
                                                    <FiDollarSign size={14} className="mr-1 text-gray-500" />
                                                    <span>${activity.amountSpent.toFixed(2)}</span>
                                                </div>
                                            )}
                                            {activity.benefitUsed && (
                                                <div className="flex items-center">
                                                    <FiGift size={14} className="mr-1 text-purple-500" />
                                                    <span>{activity.benefitUsed}</span>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FiTrendingUp size={16} className="mr-2 text-green-500" />
                                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Current Rental Streak: {userData.rentalStreak} {userData.rentalStreak === 1 ? "day" : "days"}
                                </span>
                            </div>

                            <div className="flex items-center">
                                <FiCreditCard size={16} className="mr-2 text-blue-500" />
                                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Total Points Earned:{" "}
                                    {userData.activities.reduce((sum, activity) => sum + (activity.pointsEarned || 0), 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserLoyaltyAndRewardComponent;
