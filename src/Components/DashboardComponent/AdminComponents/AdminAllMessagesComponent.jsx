import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
    FiSearch,
    FiFilter,
    FiSend,
    FiMessageCircle,
    FiUser,
    FiUsers,
    FiCheck,
    FiClock,
    FiMessageSquare,
    FiPaperclip,
    FiImage,
    FiFile,
    FiX,
    FiArrowLeft
} from 'react-icons/fi';


const AdminAllMessagesComponent = () => {

    // States
    const darkMode = useSelector((state) => state.darkMode.isDark);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterUnread, setFilterUnread] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState({});
    const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showUserList, setShowUserList] = useState(true);

    const messageEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);


    // Fake data
    const fakeUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-15T10:30:00', unreadCount: 3 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-14T14:45:00', unreadCount: 0 },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-13T09:15:00', unreadCount: 5 },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-12T16:20:00', unreadCount: 1 },
        { id: 5, name: 'Michael Wilson', email: 'michael@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-11T11:10:00', unreadCount: 0 },
        { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-10T13:40:00', unreadCount: 2 },
        { id: 7, name: 'David Miller', email: 'david@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-09T15:55:00', unreadCount: 0 },
        { id: 8, name: 'Jennifer Taylor', email: 'jennifer@example.com', avatar: '/placeholder.svg', lastActive: '2023-11-08T10:25:00', unreadCount: 0 },
    ];


    const fakeMessages = {
        1: [
            { id: 1, sender: 'user', text: 'Hello, I have a question about renting the MacBook Pro', timestamp: '2023-11-15T09:30:00', read: true },
            { id: 2, sender: 'admin', text: 'Hi John, how can I help you with the MacBook Pro rental?', timestamp: '2023-11-15T09:35:00', read: true },
            { id: 3, sender: 'user', text: 'Is it available next week?', timestamp: '2023-11-15T09:40:00', read: true },
            { id: 4, sender: 'admin', text: 'Let me check our inventory. Yes, it is available from Monday to Friday next week.', timestamp: '2023-11-15T09:45:00', read: true },
            { id: 5, sender: 'user', text: 'Great! How much would it cost for the entire week?', timestamp: '2023-11-15T10:00:00', read: false },
            { id: 6, sender: 'user', text: 'Also, does it come with any accessories?', timestamp: '2023-11-15T10:05:00', read: false },
            { id: 7, sender: 'user', text: 'And what is the pickup procedure?', timestamp: '2023-11-15T10:10:00', read: false },
        ],
        2: [
            { id: 1, sender: 'user', text: 'Hi, I would like to rent a camera for my vacation', timestamp: '2023-11-14T14:30:00', read: true },
            { id: 2, sender: 'admin', text: 'Hello Jane, we have several camera models available. What type of photography are you planning?', timestamp: '2023-11-14T14:35:00', read: true },
            { id: 3, sender: 'user', text: 'Mostly landscape and some portraits', timestamp: '2023-11-14T14:40:00', read: true },
            { id: 4, sender: 'admin', text: 'I would recommend the Sony A7 IV or Canon EOS R5 for your needs. Both are excellent for landscapes and portraits.', timestamp: '2023-11-14T14:45:00', read: true },
        ],
        3: [
            { id: 1, sender: 'user', text: 'I need to cancel my drone rental', timestamp: '2023-11-13T08:30:00', read: true },
            { id: 2, sender: 'admin', text: 'I\'m sorry to hear that, Robert. May I ask why you need to cancel?', timestamp: '2023-11-13T08:35:00', read: true },
            { id: 3, sender: 'user', text: 'The weather forecast shows rain for the entire weekend', timestamp: '2023-11-13T08:40:00', read: true },
            { id: 4, sender: 'admin', text: 'I understand. I\'ve processed your cancellation. You won\'t be charged any fees.', timestamp: '2023-11-13T08:45:00', read: true },
            { id: 5, sender: 'user', text: 'Thank you! I appreciate it.', timestamp: '2023-11-13T08:50:00', read: false },
            { id: 6, sender: 'user', text: 'When would be a good time to reschedule?', timestamp: '2023-11-13T08:55:00', read: false },
            { id: 7, sender: 'user', text: 'I was thinking maybe next weekend if the weather is better', timestamp: '2023-11-13T09:00:00', read: false },
            { id: 8, sender: 'user', text: 'Also, do you have the DJI Mavic 3 Pro available?', timestamp: '2023-11-13T09:05:00', read: false },
            { id: 9, sender: 'user', text: 'I\'d like to upgrade from the Mavic Air 2 I originally booked', timestamp: '2023-11-13T09:10:00', read: false },
        ],
        4: [
            { id: 1, sender: 'user', text: 'Hello, is the VR headset still available?', timestamp: '2023-11-12T16:10:00', read: true },
            { id: 2, sender: 'admin', text: 'Hi Emily, yes the Oculus Quest 3 is available for rent. When would you like to book it?', timestamp: '2023-11-12T16:15:00', read: true },
            { id: 3, sender: 'user', text: 'I\'m thinking this weekend, from Friday to Sunday', timestamp: '2023-11-12T16:20:00', read: false },
        ],
        5: [
            { id: 1, sender: 'admin', text: 'Hello Michael, we noticed you browsed our gaming consoles. Would you be interested in renting one?', timestamp: '2023-11-11T11:00:00', read: true },
            { id: 2, sender: 'user', text: 'Yes, I was looking at the PS5. What\'s the daily rate?', timestamp: '2023-11-11T11:05:00', read: true },
            { id: 3, sender: 'admin', text: 'The PS5 is $25 per day, with a discount for weekly rentals. Would you like me to check availability?', timestamp: '2023-11-11T11:10:00', read: true },
        ],
        6: [
            { id: 1, sender: 'user', text: 'I think there\'s an issue with my billing', timestamp: '2023-11-10T13:30:00', read: true },
            { id: 2, sender: 'admin', text: 'I\'m sorry to hear that, Sarah. Could you provide more details about the issue?', timestamp: '2023-11-10T13:35:00', read: true },
            { id: 3, sender: 'user', text: 'I was charged twice for my last rental', timestamp: '2023-11-10T13:40:00', read: false },
            { id: 4, sender: 'user', text: 'I have the transaction IDs if you need them', timestamp: '2023-11-10T13:45:00', read: false },
        ],
        7: [
            { id: 1, sender: 'user', text: 'Do you rent out projectors?', timestamp: '2023-11-09T15:45:00', read: true },
            { id: 2, sender: 'admin', text: 'Yes, we do! We have several models available, from portable mini projectors to high-end 4K projectors. What kind are you looking for?', timestamp: '2023-11-09T15:50:00', read: true },
            { id: 3, sender: 'user', text: 'I need one for a backyard movie night', timestamp: '2023-11-09T15:55:00', read: true },
        ],
        8: [
            { id: 1, sender: 'admin', text: 'Hello Jennifer, welcome to GadgetSwap! Let us know if you have any questions about our rental services.', timestamp: '2023-11-08T10:20:00', read: true },
            { id: 2, sender: 'user', text: 'Thanks! I\'ll definitely check out your catalog', timestamp: '2023-11-08T10:25:00', read: true },
        ],
    };


    // Initialize data
    useEffect(() => {
        setUsers(fakeUsers);
        setMessages(fakeMessages);

        // Check if mobile view
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // Scroll to bottom of messages when selected user changes or new message is added
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedUser, messages]);


    // Filter users based on search term and unread filter
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUnread = filterUnread ? user.unreadCount > 0 : true;

        return matchesSearch && matchesUnread;
    });


    // Format timestamp to readable time
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };


    // Check if date should be displayed (first message of the day)
    const shouldDisplayDate = (message, index, messageList) => {
        if (index === 0) return true;

        const prevMessage = messageList[index - 1];
        const prevDate = new Date(prevMessage.timestamp).toDateString();
        const currentDate = new Date(message.timestamp).toDateString();

        return prevDate !== currentDate;
    };


    // Handle sending a new message
    const handleSendMessage = () => {
        if (!messageText.trim() || !selectedUser) return;

        const newMessage = {
            id: messages[selectedUser]?.length + 1 || 1,
            sender: 'admin',
            text: messageText,
            timestamp: new Date().toISOString(),
            read: true,
        };

        setMessages(prev => ({
            ...prev,
            [selectedUser]: [...(prev[selectedUser] || []), newMessage],
        }));

        setMessageText('');
    };


    // Handle selecting a user
    const handleSelectUser = (userId) => {
        setSelectedUser(userId);

        // Mark all messages as read
        if (messages[userId]) {
            const updatedMessages = messages[userId].map(msg => ({
                ...msg,
                read: true,
            }));

            setMessages(prev => ({
                ...prev,
                [userId]: updatedMessages,
            }));

            // Update unread count
            setUsers(prev =>
                prev.map(user =>
                    user.id === userId ? { ...user, unreadCount: 0 } : user
                )
            );
        }

        // On mobile, hide user list when a user is selected
        if (isMobileView) {
            setShowUserList(false);
        }
    };


    // Handle file attachment
    const handleFileAttachment = () => {
        fileInputRef.current?.click();
        setShowAttachmentOptions(false);
    };


    // Handle image attachment
    const handleImageAttachment = () => {
        imageInputRef.current?.click();
        setShowAttachmentOptions(false);
    };


    // Handle file selection
    const handleFileSelected = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMessageText(`[File: ${file.name}] `);
        }
    };


    // Handle image selection
    const handleImageSelected = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMessageText(`[Image: ${file.name}] `);
        }
    };


    // Handle key press in message input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };


    // Get total unread messages
    const getTotalUnreadMessages = () => {
        return users.reduce((total, user) => total + user.unreadCount, 0);
    };


    // Back to user list (mobile only)
    const handleBackToUserList = () => {
        setShowUserList(true);
    };


    return (
        <div className={`w-full mx-auto pb-8 rounded-xl ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-sm`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mr-4`}>
                            <FiUsers className="text-blue-500" size={24} />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Conversations</p>
                            <p className="text-2xl font-semibold">{Object.keys(messages).length}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-sm`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${darkMode ? 'bg-red-900' : 'bg-red-100'} mr-4`}>
                            <FiMessageCircle className="text-red-500" size={24} />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Unread Messages</p>
                            <p className="text-2xl font-semibold">{getTotalUnreadMessages()}</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-sm`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'} mr-4`}>
                            <FiClock className="text-green-500" size={24} />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Response Rate</p>
                            <p className="text-2xl font-semibold">98%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* User List */}
                {(showUserList || !isMobileView) && (
                    <div className={`w-full lg:w-1/3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
                        {/* Search and Filter */}
                        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                        darkMode
                                            ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500'
                                            : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                                />
                                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                            </div>

                            <div className="flex items-center">
                                <button
                                    onClick={() => setFilterUnread(!filterUnread)}
                                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                                        filterUnread
                                            ? 'bg-blue-600 text-white'
                                            : darkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } cursor-pointer`}
                                >
                                    <FiFilter className="mr-2" size={14} />
                                    {filterUnread ? 'Show All' : 'Show Unread'}
                                </button>

                                <div className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
                                </div>
                            </div>
                        </div>

                        {/* User List */}
                        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                            {filteredUsers.length > 0 ? (
                                <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                    {filteredUsers.map(user => (
                                        <li
                                            key={user.id}
                                            onClick={() => handleSelectUser(user.id)}
                                            className={`p-4 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} cursor-pointer ${
                                                selectedUser === user.id ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <img
                                                        src={user.avatar || "/placeholder.svg"}
                                                        alt={user.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    {user.unreadCount > 0 && (
                                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full p-3 w-5 h-5 flex items-center justify-center">
                                                            {user.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium truncate">{user.name}</p>
                                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                            {formatDate(user.lastActive)}
                                                        </p>
                                                    </div>
                                                    <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-8 text-center">
                                    <FiUser className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} size={48} />
                                    <p className="text-lg font-medium">No users found</p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Try adjusting your search or filter
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Message Thread */}
                {(!showUserList || !isMobileView) && (
                    <div className={`w-full lg:w-2/3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden flex flex-col`}>
                        {selectedUser ? (
                            <>
                                {/* Message Header */}
                                <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center`}>
                                    {isMobileView && (
                                        <button
                                            onClick={handleBackToUserList}
                                            className={`mr-2 p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}
                                        >
                                            <FiArrowLeft size={20} />
                                        </button>
                                    )}

                                    <img
                                        src={users.find(u => u.id === selectedUser)?.avatar || "/placeholder.svg"}
                                        alt={users.find(u => u.id === selectedUser)?.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="ml-3">
                                        <p className="font-medium">{users.find(u => u.id === selectedUser)?.name}</p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {users.find(u => u.id === selectedUser)?.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Message Thread */}
                                <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`} style={{ maxHeight: 'calc(100vh - 300px)' }}>
                                    {messages[selectedUser] && messages[selectedUser].length > 0 ? (
                                        <div className="space-y-4">
                                            {messages[selectedUser].map((message, index) => (
                                                <div key={message.id}>
                                                    {shouldDisplayDate(message, index, messages[selectedUser]) && (
                                                        <div className="flex justify-center my-4">
                                                            <div className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                                                                {formatDate(message.timestamp)}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[75%] rounded-lg px-4 py-2 ${
                                                            message.sender === 'admin'
                                                                ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                                                                : darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
                                                        }`}>
                                                            <div className="text-sm">{message.text}</div>
                                                            <div className={`text-xs mt-1 flex items-center justify-end ${
                                                                message.sender === 'admin'
                                                                    ? 'text-blue-100'
                                                                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                                                            }`}>
                                                                {formatTime(message.timestamp)}
                                                                {message.sender === 'admin' && (
                                                                    <FiCheck className="ml-1" size={12} />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={messageEndRef} />
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center">
                                            <FiMessageSquare className={`${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-4`} size={48} />
                                            <p className="text-lg font-medium">No messages yet</p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Send a message to start the conversation
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Message Input */}
                                <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex items-end">
                                        <div className="relative mr-2">
                                            <button
                                                onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
                                                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} cursor-pointer`}
                                            >
                                                <FiPaperclip size={20} />
                                            </button>

                                            {showAttachmentOptions && (
                                                <div className={`absolute bottom-12 left-0 rounded-lg shadow-lg p-2 z-10 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                                                    <button
                                                        onClick={handleImageAttachment}
                                                        className={`flex items-center p-2 rounded-md w-full text-left ${darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} cursor-pointer`}
                                                    >
                                                        <FiImage className="mr-2 text-blue-500" />
                                                        <span>Image</span>
                                                    </button>
                                                    <button
                                                        onClick={handleFileAttachment}
                                                        className={`flex items-center p-2 rounded-md w-full text-left ${darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} cursor-pointer`}
                                                    >
                                                        <FiFile className="mr-2 text-green-500" />
                                                        <span>File</span>
                                                    </button>
                                                    <button
                                                        onClick={() => setShowAttachmentOptions(false)}
                                                        className={`flex items-center p-2 rounded-md w-full text-left ${darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} cursor-pointer`}
                                                    >
                                                        <FiX className="mr-2 text-red-500" />
                                                        <span>Cancel</span>
                                                    </button>
                                                </div>
                                            )}

                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={handleFileSelected}
                                                accept=".pdf,.doc,.docx,.txt"
                                            />
                                            <input
                                                type="file"
                                                ref={imageInputRef}
                                                className="hidden"
                                                onChange={handleImageSelected}
                                                accept="image/*"
                                            />
                                        </div>

                                        <div className="flex-1 relative">
                                            <textarea
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                placeholder="Type your message..."
                                                className={`w-full px-4 py-3 pr-12 rounded-lg resize-none ${
                                                    darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                                                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                                                } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                                rows="1"
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!messageText.trim()}
                                                className={`absolute right-2 bottom-2 p-2 rounded-full ${
                                                    !messageText.trim()
                                                        ? darkMode
                                                            ? 'text-gray-500'
                                                            : 'text-gray-300'
                                                        : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600'
                                                } cursor-pointer`}
                                            >
                                                <FiSend size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-8">
                                <FiMessageCircle className={`${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-4`} size={64} />
                                <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
                                <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Select a user from the list to view and manage your conversation
                                </p>
                                {isMobileView && (
                                    <button
                                        onClick={handleBackToUserList}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                                    >
                                        View User List
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAllMessagesComponent;
