import React from "react";
import { Link } from "react-router-dom";

function RecentChat({item}) {
    return (
        <li
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
        >
            <Link to={`/home/${item.thread_id}`} className="w-full">{item.title}</Link>
            
        </li>
    );
}

export default RecentChat;
