import React from 'react';
import {FiMessageSquare} from "react-icons/fi";
import {useSelector} from "react-redux";


const AdminAllMessagesComponent = () => {

    // State management
    const darkMode = useSelector((state) => state.darkMode.isDark);


    return (
        <div className={`rounded-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-bold">Messages Management</h3>
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Manage all messages of all users of the GadgetSwap platform
                </p>
            </div>
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <FiMessageSquare className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={48} />
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            All messages management interface will be implemented here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAllMessagesComponent;
