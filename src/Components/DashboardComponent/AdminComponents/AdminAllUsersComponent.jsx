import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    FiSearch, FiEdit2, FiTrash2,
    FiUserCheck, FiUserX, FiChevronDown, FiChevronUp, FiMoreHorizontal,
    FiUser, FiUsers, FiUserPlus as FiNewUsers, FiClock, FiCalendar,
    FiMail, FiPhone, FiMapPin, FiShield
} from 'react-icons/fi';


const AdminAllUsersComponent = () => {

    // States
    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterRole, setFilterRole] = useState('all');
    const [expandedUser, setExpandedUser] = useState(null);
    const [isActionMenuOpen, setIsActionMenuOpen] = useState({});


    // Fake data
    const fakeUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastLogin: '2023-08-15T10:30:00', registeredDate: '2022-01-10', phone: '+1 234 567 8901', location: 'New York, USA', rentals: 12, avatar: '/placeholder.svg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastLogin: '2023-08-14T14:45:00', registeredDate: '2022-02-15', phone: '+1 234 567 8902', location: 'Los Angeles, USA', rentals: 8, avatar: '/placeholder.svg' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'user', status: 'inactive', lastLogin: '2023-07-20T09:15:00', registeredDate: '2022-03-20', phone: '+1 234 567 8903', location: 'Chicago, USA', rentals: 5, avatar: '/placeholder.svg' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'admin', status: 'active', lastLogin: '2023-08-13T16:20:00', registeredDate: '2022-04-05', phone: '+1 234 567 8904', location: 'Houston, USA', rentals: 15, avatar: '/placeholder.svg' },
        { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'user', status: 'suspended', lastLogin: '2023-06-30T11:10:00', registeredDate: '2022-05-12', phone: '+1 234 567 8905', location: 'Phoenix, USA', rentals: 3, avatar: '/placeholder.svg' },
        { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'user', status: 'active', lastLogin: '2023-08-12T13:40:00', registeredDate: '2022-06-18', phone: '+1 234 567 8906', location: 'Philadelphia, USA', rentals: 7, avatar: '/placeholder.svg' },
        { id: 7, name: 'David Miller', email: 'david@example.com', role: 'user', status: 'active', lastLogin: '2023-08-11T15:55:00', registeredDate: '2022-07-22', phone: '+1 234 567 8907', location: 'San Antonio, USA', rentals: 9, avatar: '/placeholder.svg' },
        { id: 8, name: 'Jennifer Taylor', email: 'jennifer@example.com', role: 'admin', status: 'inactive', lastLogin: '2023-07-15T10:25:00', registeredDate: '2022-08-30', phone: '+1 234 567 8908', location: 'San Diego, USA', rentals: 6, avatar: '/placeholder.svg' },
        { id: 9, name: 'James Anderson', email: 'james@example.com', role: 'user', status: 'active', lastLogin: '2023-08-10T09:05:00', registeredDate: '2022-09-14', phone: '+1 234 567 8909', location: 'Dallas, USA', rentals: 11, avatar: '/placeholder.svg' },
        { id: 10, name: 'Lisa Thomas', email: 'lisa@example.com', role: 'user', status: 'suspended', lastLogin: '2023-05-20T14:30:00', registeredDate: '2022-10-25', phone: '+1 234 567 8910', location: 'San Jose, USA', rentals: 2, avatar: '/placeholder.svg' },
        { id: 11, name: 'Daniel Jackson', email: 'daniel@example.com', role: 'admin', status: 'active', lastLogin: '2023-08-09T11:45:00', registeredDate: '2022-11-05', phone: '+1 234 567 8911', location: 'Austin, USA', rentals: 14, avatar: '/placeholder.svg' },
        { id: 12, name: 'Patricia White', email: 'patricia@example.com', role: 'user', status: 'active', lastLogin: '2023-08-08T16:15:00', registeredDate: '2022-12-12', phone: '+1 234 567 8912', location: 'Jacksonville, USA', rentals: 5, avatar: '/placeholder.svg' },
        { id: 13, name: 'Matthew Harris', email: 'matthew@example.com', role: 'user', status: 'inactive', lastLogin: '2023-07-10T13:20:00', registeredDate: '2023-01-18', phone: '+1 234 567 8913', location: 'Fort Worth, USA', rentals: 8, avatar: '/placeholder.svg' },
        { id: 14, name: 'Elizabeth Martin', email: 'elizabeth@example.com', role: 'admin', status: 'active', lastLogin: '2023-08-07T10:10:00', registeredDate: '2023-02-22', phone: '+1 234 567 8914', location: 'Columbus, USA', rentals: 10, avatar: '/placeholder.svg' },
        { id: 15, name: 'Christopher Thompson', email: 'christopher@example.com', role: 'user', status: 'active', lastLogin: '2023-08-06T15:30:00', registeredDate: '2023-03-30', phone: '+1 234 567 8915', location: 'Charlotte, USA', rentals: 6, avatar: '/placeholder.svg' },
    ];


    // User statistics
    const userStats = {
        totalUsers: fakeUsers.length,
        activeUsers: fakeUsers.filter(user => user.status === 'active').length,
        inactiveUsers: fakeUsers.filter(user => user.status === 'inactive').length,
        suspendedUsers: fakeUsers.filter(user => user.status === 'suspended').length,
        admins: fakeUsers.filter(user => user.role === 'admin').length,
        regularUsers: fakeUsers.filter(user => user.role === 'user').length,
        newUsersThisMonth: 3,
    };


    // Functions
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };


    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return darkMode ? 'text-green-400' : 'text-green-600';
            case 'inactive':
                return darkMode ? 'text-yellow-400' : 'text-yellow-600';
            case 'suspended':
                return darkMode ? 'text-red-400' : 'text-red-600';
            default:
                return '';
        }
    };


    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return darkMode ? 'text-purple-400' : 'text-purple-600';
            case 'user':
                return darkMode ? 'text-gray-400' : 'text-gray-600';
            default:
                return '';
        }
    };


    const toggleActionMenu = (userId) => {
        setIsActionMenuOpen(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };


    const toggleUserExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };


    const handleUserAction = (userId, action) => {
        console.log(`Action: ${action} for user ID: ${userId}`);
        // In a real app, you would call an API here
        setIsActionMenuOpen(prev => ({
            ...prev,
            [userId]: false
        }));
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };


    const handleFilterChange = (type, value) => {
        if (type === 'status') {
            setFilterStatus(value);
        } else if (type === 'role') {
            setFilterRole(value);
        }
        setCurrentPage(1);
    };


    // Filter and sort users
    const filteredUsers = fakeUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        const matchesRole = filterRole === 'all' || user.role === filterRole;

        return matchesSearch && matchesStatus && matchesRole;
    });


    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });


    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Effect to reset action menu when users change
    useEffect(() => {
        setIsActionMenuOpen({});
    }, [currentPage, filterStatus, filterRole, searchTerm, sortConfig]);


    return (
        <div className={`w-full max-w-7xl mx-auto pb-8 rounded-xl ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'border border-gray-200 bg-gray-50'} shadow-sm`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mr-4`}>
                            <FiUsers className="text-blue-500" size={24} />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Users</p>
                            <p className="text-2xl font-semibold">{userStats.totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'border border-gray-200 bg-gray-50'} shadow-sm`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'} mr-4`}>
                            <FiUserCheck className="text-green-500" size={24} />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Users</p>
                            <p className="text-2xl font-semibold">{userStats.activeUsers}</p>
                        </div>
                    </div>
                </div>
                <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'border border-gray-200 bg-gray-50'} shadow-sm`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mr-4`}>
                            <FiShield className="text-purple-500" size={24} />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admins</p>
                            <p className="text-2xl font-semibold">{userStats.admins}</p>
                        </div>
                    </div>
                </div>
                <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'border border-gray-200 bg-gray-50'} shadow-sm`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-900' : 'bg-teal-100'} mr-4`}>
                            <FiNewUsers className="text-teal-500" size={24} />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>New This Month</p>
                            <p className="text-2xl font-semibold">{userStats.newUsersThisMonth}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                            darkMode
                                ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500'
                                : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                    <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <div className="relative">
                        <select
                            value={filterStatus}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className={`appearance-none pl-4 pr-10 py-2 rounded-lg border cursor-pointer ${
                                darkMode
                                    ? 'bg-gray-800 border-gray-700 text-gray-100'
                                    : 'bg-white border-gray-300 text-gray-800'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                        </select>
                        <FiChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                    </div>

                    <div className="relative">
                        <select
                            value={filterRole}
                            onChange={(e) => handleFilterChange('role', e.target.value)}
                            className={`appearance-none pl-4 pr-10 py-2 rounded-lg border cursor-pointer ${
                                darkMode
                                    ? 'bg-gray-800 border-gray-700 text-gray-100'
                                    : 'bg-white border-gray-300 text-gray-800'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <FiChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className={`overflow-x-auto rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm mb-6`}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            <button
                                onClick={() => requestSort('name')}
                                className="flex items-center"
                            >
                                <span>User</span>
                                {sortConfig.key === 'name' && (
                                    sortConfig.direction === 'ascending' ?
                                        <FiChevronUp className="ml-1" size={16} /> :
                                        <FiChevronDown className="ml-1" size={16} />
                                )}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            <button
                                onClick={() => requestSort('role')}
                                className="flex items-center"
                            >
                                <span>Role</span>
                                {sortConfig.key === 'role' && (
                                    sortConfig.direction === 'ascending' ?
                                        <FiChevronUp className="ml-1" size={16} /> :
                                        <FiChevronDown className="ml-1" size={16} />
                                )}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            <button
                                onClick={() => requestSort('status')}
                                className="flex items-center"
                            >
                                <span>Status</span>
                                {sortConfig.key === 'status' && (
                                    sortConfig.direction === 'ascending' ?
                                        <FiChevronUp className="ml-1" size={16} /> :
                                        <FiChevronDown className="ml-1" size={16} />
                                )}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">
                            <button
                                onClick={() => requestSort('lastLogin')}
                                className="flex items-center"
                            >
                                <span>Last Login</span>
                                {sortConfig.key === 'lastLogin' && (
                                    sortConfig.direction === 'ascending' ?
                                        <FiChevronUp className="ml-1" size={16} /> :
                                        <FiChevronDown className="ml-1" size={16} />
                                )}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell">
                            <button
                                onClick={() => requestSort('rentals')}
                                className="flex items-center"
                            >
                                <span>Rentals</span>
                                {sortConfig.key === 'rentals' && (
                                    sortConfig.direction === 'ascending' ?
                                        <FiChevronUp className="ml-1" size={16} /> :
                                        <FiChevronDown className="ml-1" size={16} />
                                )}
                            </button>
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
                    {currentUsers.length > 0 ? (
                        currentUsers.map(user => (
                            <React.Fragment key={user.id}>
                                <tr className={`${expandedUser === user.id ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') : ''} hover:${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium">{user.name}</div>
                                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)} ${darkMode ? 'bg-opacity-20 bg-gray-700' : 'bg-opacity-20 bg-gray-200'}`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)} ${darkMode ? 'bg-opacity-20 bg-gray-700' : 'bg-opacity-20 bg-gray-200'}`}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                        <div className="text-sm">
                                            {formatDate(user.lastLogin)}
                                        </div>
                                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {formatTime(user.lastLogin)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                        <div className="text-sm">{user.rentals}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end items-center space-x-2">
                                            <button
                                                onClick={() => toggleUserExpand(user.id)}
                                                className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                            >
                                                {expandedUser === user.id ?
                                                    <FiChevronUp size={18} /> :
                                                    <FiChevronDown size={18} />
                                                }
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleActionMenu(user.id)}
                                                    className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                                >
                                                    <FiMoreHorizontal size={18} />
                                                </button>
                                                {isActionMenuOpen[user.id] && (
                                                    <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-10`}>
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => handleUserAction(user.id, 'edit')}
                                                                className={`flex items-center w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                                            >
                                                                <FiEdit2 className="mr-2" size={16} />
                                                                Edit User
                                                            </button>
                                                            {user.status === 'active' ? (
                                                                <button
                                                                    onClick={() => handleUserAction(user.id, 'deactivate')}
                                                                    className={`flex items-center w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                                                >
                                                                    <FiUserX className="mr-2" size={16} />
                                                                    Deactivate
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleUserAction(user.id, 'activate')}
                                                                    className={`flex items-center w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                                                >
                                                                    <FiUserCheck className="mr-2" size={16} />
                                                                    Activate
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleUserAction(user.id, 'delete')}
                                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700"
                                                            >
                                                                <FiTrash2 className="mr-2" size={16} />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {expandedUser === user.id && (
                                    <tr className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                                        <td colSpan={7} className="px-6 py-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} space-y-2`}>
                                                        <div className="flex items-center">
                                                            <FiMail className="mr-2" size={16} />
                                                            <span>{user.email}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FiPhone className="mr-2" size={16} />
                                                            <span>{user.phone}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FiMapPin className="mr-2" size={16} />
                                                            <span>{user.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Account Information</h4>
                                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} space-y-2`}>
                                                        <div className="flex items-center">
                                                            <FiCalendar className="mr-2" size={16} />
                                                            <span>Registered: {formatDate(user.registeredDate)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FiClock className="mr-2" size={16} />
                                                            <span>Last Login: {formatDate(user.lastLogin)} at {formatTime(user.lastLogin)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FiShield className="mr-2" size={16} />
                                                            <span>Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Activity</h4>
                                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} space-y-2`}>
                                                        <div>Total Rentals: {user.rentals}</div>
                                                        <div>Status: {user.status.charAt(0).toUpperCase() + user.status.slice(1)}</div>
                                                        <div className="flex mt-2 space-x-2">
                                                            <button
                                                                onClick={() => handleUserAction(user.id, 'edit')}
                                                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                                            >
                                                                Edit User
                                                            </button>
                                                            <button
                                                                onClick={() => handleUserAction(user.id, 'view-rentals')}
                                                                className={`px-3 py-1 text-xs rounded ${
                                                                    darkMode
                                                                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                                }`}
                                                            >
                                                                View Rentals
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center">
                                <div className="flex flex-col items-center justify-center py-6">
                                    <FiUser className={`${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-2`} size={48} />
                                    <p className="text-lg font-medium">No users found</p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Try adjusting your search or filter to find what you're looking for.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, sortedUsers.length)} of {sortedUsers.length} users
                    </div>
                    <div className="flex space-x-1">
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${
                                currentPage === 1
                                    ? `${darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                    : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                            }`}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === number
                                        ? 'bg-blue-600 text-white'
                                        : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                                }`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded ${
                                currentPage === totalPages
                                    ? `${darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                    : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllUsersComponent;
