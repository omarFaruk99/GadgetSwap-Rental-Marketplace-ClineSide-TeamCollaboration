import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiFilter, FiChevronDown, FiChevronUp, FiX, FiCheck, FiStar, FiDownload, FiCalendar, FiDollarSign, FiCreditCard } from 'react-icons/fi';
import { BiSort, BiSortAlt2 } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { BsBoxSeam, BsStarFill, BsStarHalf } from 'react-icons/bs';
import {useSelector} from "react-redux";

const AdminAllRentalsComponent = () => {
    // Mock data for rental orders
    const initialRentals = [
        {
            id: "ORD-2023-001",
            gadgetName: "iPhone 15 Pro Max",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Smartphones",
            startDate: "2023-11-10",
            endDate: "2023-11-17",
            status: "active",
            amount: 175.5,
            discount: 10,
            membershipTier: "Silver",
            pointsEarned: 150,
            paymentMethod: "Credit Card (**** 4582)",
            hasInvoice: true,
            isReviewed: false,
            rating: 0,
            userName: "John Doe",
            userEmail: "john.doe@example.com",
            userPhone: "+1 (555) 123-4567",
            shippingAddress: "123 Main St, New York, NY 10001",
        },
        {
            id: "ORD-2023-002",
            gadgetName: "MacBook Pro 16",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Laptops",
            startDate: "2023-11-05",
            endDate: "2023-11-20",
            status: "completed",
            amount: 320.75,
            discount: 15,
            membershipTier: "Gold",
            pointsEarned: 300,
            paymentMethod: "PayPal",
            hasInvoice: true,
            isReviewed: true,
            rating: 4.5,
            userName: "Jane Smith",
            userEmail: "jane.smith@example.com",
            userPhone: "+1 (555) 987-6543",
            shippingAddress: "456 Park Ave, Boston, MA 02108",
        },
        {
            id: "ORD-2023-003",
            gadgetName: "Sony A7 IV Camera",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Cameras",
            startDate: "2023-11-15",
            endDate: "2023-11-25",
            status: "pending",
            amount: 210.25,
            discount: 0,
            membershipTier: "Bronze",
            pointsEarned: 100,
            paymentMethod: "Credit Card (**** 7890)",
            hasInvoice: false,
            isReviewed: false,
            rating: 0,
            userName: "Robert Johnson",
            userEmail: "robert.j@example.com",
            userPhone: "+1 (555) 456-7890",
            shippingAddress: "789 Oak St, Chicago, IL 60007",
        },
        {
            id: "ORD-2023-004",
            gadgetName: "DJI Mavic 3 Pro",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Drones",
            startDate: "2023-11-01",
            endDate: "2023-11-08",
            status: "cancelled",
            amount: 150.00,
            discount: 5,
            membershipTier: "Silver",
            pointsEarned: 0,
            paymentMethod: "Debit Card (**** 1234)",
            hasInvoice: true,
            isReviewed: false,
            rating: 0,
            userName: "Emily Wilson",
            userEmail: "emily.w@example.com",
            userPhone: "+1 (555) 234-5678",
            shippingAddress: "321 Pine St, Seattle, WA 98101",
        },
        {
            id: "ORD-2023-005",
            gadgetName: "Samsung Galaxy S23 Ultra",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Smartphones",
            startDate: "2023-11-12",
            endDate: "2023-11-22",
            status: "active",
            amount: 165.30,
            discount: 10,
            membershipTier: "Gold",
            pointsEarned: 150,
            paymentMethod: "Credit Card (**** 6543)",
            hasInvoice: true,
            isReviewed: false,
            rating: 0,
            userName: "Michael Brown",
            userEmail: "michael.b@example.com",
            userPhone: "+1 (555) 876-5432",
            shippingAddress: "654 Maple Ave, Austin, TX 78701",
        },
        {
            id: "ORD-2023-006",
            gadgetName: "iPad Pro 12.9",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Tablets",
            startDate: "2023-10-25",
            endDate: "2023-11-15",
            status: "completed",
            amount: 190.50,
            discount: 0,
            membershipTier: "Bronze",
            pointsEarned: 180,
            paymentMethod: "PayPal",
            hasInvoice: true,
            isReviewed: true,
            rating: 5,
            userName: "Sarah Davis",
            userEmail: "sarah.d@example.com",
            userPhone: "+1 (555) 345-6789",
            shippingAddress: "987 Cedar St, San Francisco, CA 94107",
        },
        {
            id: "ORD-2023-007",
            gadgetName: "iPad Pro 12.9",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Tablets",
            startDate: "2023-10-25",
            endDate: "2023-11-15",
            status: "completed",
            amount: 190.50,
            discount: 0,
            membershipTier: "Bronze",
            pointsEarned: 180,
            paymentMethod: "PayPal",
            hasInvoice: true,
            isReviewed: true,
            rating: 5,
            userName: "Sarah Davis",
            userEmail: "sarah.d@example.com",
            userPhone: "+1 (555) 345-6789",
            shippingAddress: "987 Cedar St, San Francisco, CA 94107",
        },
        {
            id: "ORD-2023-008",
            gadgetName: "iPad Pro 12.9",
            gadgetImage: "https://res.cloudinary.com/dxh2iyxjs/image/upload/v1742167881/use_rryd6c.jpg",
            category: "Tablets",
            startDate: "2023-10-25",
            endDate: "2023-11-15",
            status: "completed",
            amount: 190.50,
            discount: 0,
            membershipTier: "Bronze",
            pointsEarned: 180,
            paymentMethod: "PayPal",
            hasInvoice: true,
            isReviewed: true,
            rating: 5,
            userName: "Sarah Davis",
            userEmail: "sarah.d@example.com",
            userPhone: "+1 (555) 345-6789",
            shippingAddress: "987 Cedar St, San Francisco, CA 94107",
        },
    ];

    // State variables
    const darkMode = useSelector((state) => state.darkMode.isDark)
    const [rentals, setRentals] = useState(initialRentals);
    const [filteredRentals, setFilteredRentals] = useState(initialRentals);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('startDate');
    const [sortDirection, setSortDirection] = useState('desc');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRental, setSelectedRental] = useState(null);
    const [editedRental, setEditedRental] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [detailsRental, setDetailsRental] = useState(null);

    // Status options for filtering and editing
    const statusOptions = ['active', 'pending', 'completed', 'cancelled'];

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter rentals based on search query and status filter
    useEffect(() => {
        let result = rentals;

        // Filter by status
        if (statusFilter !== 'all') {
            result = result.filter(rental => rental.status === statusFilter);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(rental =>
                rental.id.toLowerCase().includes(query) ||
                rental.gadgetName.toLowerCase().includes(query) ||
                rental.userName.toLowerCase().includes(query) ||
                rental.userEmail.toLowerCase().includes(query) ||
                rental.category.toLowerCase().includes(query)
            );
        }

        // Sort results
        result = [...result].sort((a, b) => {
            let comparison = 0;

            if (sortField === 'amount') {
                comparison = a.amount - b.amount;
            } else if (sortField === 'startDate') {
                comparison = new Date(a.startDate) - new Date(b.startDate);
            } else if (sortField === 'endDate') {
                comparison = new Date(a.endDate) - new Date(b.endDate);
            } else if (sortField === 'gadgetName') {
                comparison = a.gadgetName.localeCompare(b.gadgetName);
            } else if (sortField === 'userName') {
                comparison = a.userName.localeCompare(b.userName);
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });

        setFilteredRentals(result);
    }, [rentals, searchQuery, statusFilter, sortField, sortDirection]);

    // Handle sort change
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Open edit modal with selected rental
    const handleEditRental = (rental) => {
        setSelectedRental(rental);
        setEditedRental({...rental});
        setIsEditModalOpen(true);
    };

    // Open details modal with selected rental
    const handleViewDetails = (rental) => {
        setDetailsRental(rental);
        setIsDetailsModalOpen(true);
    };

    // Handle changes in edit form
    const handleEditChange = (field, value) => {
        setEditedRental(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Save edited rental
    const handleSaveEdit = () => {
        setRentals(prev =>
            prev.map(rental =>
                rental.id === editedRental.id ? editedRental : rental
            )
        );
        setIsEditModalOpen(false);
    };

    // Cancel rental order
    const handleCancelRental = (rentalId) => {
        setRentals(prev =>
            prev.map(rental =>
                rental.id === rentalId
                    ? {...rental, status: 'cancelled'}
                    : rental
            )
        );
    };

    // Format date for display
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    // Get status color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    // Render star rating
    const renderRating = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<BsStarFill key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<BsStarHalf key="half" className="text-yellow-400" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<BsStarFill key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />);
        }

        return (
            <div className="flex items-center">
                {stars}
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className={`w-full mx-auto rounded-xl ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by order ID, gadget, user..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                            darkMode
                                ? 'bg-gray-800 border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center px-4 py-2 rounded-lg border ${
                                darkMode
                                    ? 'bg-gray-800 border-gray-700 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            } cursor-pointer`}
                        >
                            <FiFilter className="mr-2" />
                            Filter
                            <FiChevronDown className="ml-2" />
                        </button>

                        {isFilterOpen && (
                            <div className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg ${
                                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                            }`}>
                                <div className="py-1">
                                    <div className="px-4 py-2 text-sm font-medium border-b border-gray-200 dark:border-gray-700">
                                        Status
                                    </div>
                                    <div className="p-2">
                                        <button
                                            onClick={() => setStatusFilter('all')}
                                            className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                                                statusFilter === 'all'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } cursor-pointer`}
                                        >
                                            All
                                        </button>
                                        {statusOptions.map(status => (
                                            <button
                                                key={status}
                                                onClick={() => setStatusFilter(status)}
                                                className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                                                    statusFilter === status
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                } cursor-pointer`}
                                            >
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => handleSort('startDate')}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                            darkMode
                                ? 'bg-gray-800 border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        } cursor-pointer`}
                    >
                        <BiSort className="mr-2" />
                        {sortField === 'startDate' ? (
                            <>
                                Date {sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                            </>
                        ) : 'Date'}
                    </button>

                    <button
                        onClick={() => handleSort('amount')}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                            darkMode
                                ? 'bg-gray-800 border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        } cursor-pointer`}
                    >
                        <FiDollarSign className="mr-2" />
                        {sortField === 'amount' ? (
                            <>
                                Amount {sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                            </>
                        ) : 'Amount'}
                    </button>

                    <button
                        onClick={() => handleSort('gadgetName')}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                            darkMode
                                ? 'bg-gray-800 border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        } cursor-pointer`}
                    >
                        <BsBoxSeam className="mr-2" />
                        {sortField === 'gadgetName' ? (
                            <>
                                Gadget {sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                            </>
                        ) : 'Gadget'}
                    </button>
                </div>
            </div>

            {/* Rental Orders List */}
            <div className="space-y-4">
                {filteredRentals.length === 0 ? (
                    <div className={`p-8 text-center rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                        <p className="text-gray-500 dark:text-gray-400">No rental orders found</p>
                    </div>
                ) : (
                    filteredRentals.map(rental => (
                        <div
                            key={rental.id}
                            className={`p-4 rounded-lg border shadow-sm ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            } hover:shadow-md transition-shadow duration-200`}
                        >
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Gadget Image */}
                                <div className="w-full md:w-1/6">
                                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={rental.gadgetImage || "/placeholder.svg"}
                                            alt={rental.gadgetName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Rental Details */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-semibold">{rental.gadgetName}</h3>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <span className="mr-2">{rental.id}</span>
                                                <span className="mr-2">•</span>
                                                <span>{rental.category}</span>
                                            </div>
                                        </div>
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 md:mt-0 ${getStatusColor(rental.status)}`}>
                                            {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                                            <p className="font-medium">{rental.userName}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{rental.userEmail}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Rental Period</p>
                                            <p className="font-medium">
                                                {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Payment</p>
                                            <p className="font-medium">${rental.amount.toFixed(2)}</p>
                                            {rental.discount > 0 && (
                                                <p className="text-sm text-green-600 dark:text-green-400">
                                                    {rental.discount}% discount applied
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <button
                                            onClick={() => handleViewDetails(rental)}
                                            className="text-sm px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                                        >
                                            View Details
                                        </button>

                                        <button
                                            onClick={() => handleEditRental(rental)}
                                            className="text-sm px-3 py-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 cursor-pointer"
                                        >
                                            <FiEdit className="inline mr-1" /> Edit
                                        </button>

                                        {rental.status !== 'cancelled' && (
                                            <button
                                                onClick={() => handleCancelRental(rental.id)}
                                                className="text-sm px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 cursor-pointer"
                                            >
                                                <MdOutlineCancel className="inline mr-1" /> Cancel Order
                                            </button>
                                        )}

                                        {rental.hasInvoice && (
                                            <button className="text-sm px-3 py-1.5 rounded-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 cursor-pointer">
                                                <FiDownload className="inline mr-1" /> Invoice
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editedRental && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
                            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                        }`}>
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium">
                                            Edit Rental Order
                                        </h3>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Order ID
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editedRental.id}
                                                    disabled
                                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                                        darkMode
                                                            ? 'bg-gray-700 border-gray-600 text-white'
                                                            : 'bg-gray-100 border-gray-300 text-gray-500'
                                                    } px-3 py-2`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Status
                                                </label>
                                                <select
                                                    value={editedRental.status}
                                                    onChange={(e) => handleEditChange('status', e.target.value)}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                                        darkMode
                                                            ? 'bg-gray-700 border-gray-600 text-white'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } px-3 py-2 cursor-pointer`}
                                                >
                                                    {statusOptions.map(status => (
                                                        <option key={status} value={status}>
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Start Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={editedRental.startDate}
                                                        onChange={(e) => handleEditChange('startDate', e.target.value)}
                                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                                            darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                        } px-3 py-2 cursor-pointer`}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        End Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={editedRental.endDate}
                                                        onChange={(e) => handleEditChange('endDate', e.target.value)}
                                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                                            darkMode
                                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                                : 'bg-white border-gray-300 text-gray-900'
                                                        } px-3 py-2 cursor-pointer`}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Amount ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={editedRental.amount}
                                                    onChange={(e) => handleEditChange('amount', parseFloat(e.target.value))}
                                                    step="0.01"
                                                    min="0"
                                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                                        darkMode
                                                            ? 'bg-gray-700 border-gray-600 text-white'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } px-3 py-2`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Discount (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={editedRental.discount}
                                                    onChange={(e) => handleEditChange('discount', parseInt(e.target.value))}
                                                    min="0"
                                                    max="100"
                                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                                        darkMode
                                                            ? 'bg-gray-700 border-gray-600 text-white'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } px-3 py-2`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleSaveEdit}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer ${
                                        darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {isDetailsModalOpen && detailsRental && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full ${
                            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                        }`}>
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    onClick={() => setIsDetailsModalOpen(false)}
                                    className="bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                                >
                                    <FiX className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="px-4 pt-5 pb-4 sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium mb-4">
                                            Rental Order Details
                                        </h3>

                                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                                            <div className="w-full md:w-1/3">
                                                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                                    <img
                                                        src={detailsRental.gadgetImage || "/placeholder.svg"}
                                                        alt={detailsRental.gadgetName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="text-xl font-semibold">{detailsRental.gadgetName}</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{detailsRental.category}</p>

                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-4 ${getStatusColor(detailsRental.status)}`}>
                                                    {detailsRental.status.charAt(0).toUpperCase() + detailsRental.status.slice(1)}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                                                        <p className="font-medium">{detailsRental.id}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Membership Tier</p>
                                                        <p className="font-medium">{detailsRental.membershipTier}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Points Earned</p>
                                                        <p className="font-medium">{detailsRental.pointsEarned}</p>
                                                    </div>

                                                    {detailsRental.isReviewed && (
                                                        <div>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                                                            {renderRating(detailsRental.rating)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-md font-semibold mb-2">Customer Information</h4>
                                                <div className="space-y-2">
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                                        <p className="font-medium">{detailsRental.userName}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                                        <p className="font-medium">{detailsRental.userEmail}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                                        <p className="font-medium">{detailsRental.userPhone}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Shipping Address</p>
                                                        <p className="font-medium">{detailsRental.shippingAddress}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-md font-semibold mb-2">Rental Details</h4>
                                                <div className="space-y-2">
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Rental Period</p>
                                                        <p className="font-medium">
                                                            {formatDate(detailsRental.startDate)} - {formatDate(detailsRental.endDate)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                                                        <p className="font-medium">${detailsRental.amount.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Discount</p>
                                                        <p className="font-medium">{detailsRental.discount}%</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Payment Method</p>
                                                        <p className="font-medium">{detailsRental.paymentMethod}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => handleEditRental(detailsRental)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                >
                                    <FiEdit className="mr-2" /> Edit Order
                                </button>
                                {detailsRental.hasInvoice && (
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                    >
                                        <FiDownload className="mr-2" /> Download Invoice
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setIsDetailsModalOpen(false)}
                                    className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer ${
                                        darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllRentalsComponent;
