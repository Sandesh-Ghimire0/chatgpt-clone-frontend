import React from "react";
import { FiPlus } from "react-icons/fi";
import { IoSend } from "react-icons/io5";

function InputBar({userQuestion, setUserQuestion, handleQuestionSend}) {
    return (
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 shadow-sm">
            <FiPlus className="mr-3 text-gray-600" />
            <input
                type="text"
                placeholder="Ask Gemini"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
            />
            <div onClick={handleQuestionSend}>
                <IoSend className="ml-3 text-gray-600 cursor-pointer" />
            </div>
        </div>
    );
}

export default InputBar;
