import React from "react";

function RecentChat({item}) {
    return (
        <li
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
        >
            {item}
        </li>
    );
}

export default RecentChat;
