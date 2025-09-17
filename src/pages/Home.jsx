import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiPlus, FiMic } from "react-icons/fi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { logoutUser } from "../services/authService";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../stores/authSlice";
import { IoSend } from "react-icons/io5";
import { getHistory, getResponse } from "../services/chatService";
import { addChat } from "../stores/chatSlice";
import ReactMarkdown from "react-markdown";
import { addHistory } from "../stores/chatSlice";
function Home() {
    const [userQuestion, setUserQuestion] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const { chats } = useSelector((state) => state.chat);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogout() {
        const res = await logoutUser();

        if (res.status === 200) {
            dispatch(logout());
            navigate("/");
        }
    }

    async function fetchHistory() {
        try {
            const res = await getHistory();

            if (res.status === 200) {
                console.log(res);
                dispatch(addHistory(res.data));
            }
        } catch (error) {
            console.log("Failed to get history :: ", error);
        }
    }

    async function handleQuestionSend() {
        try {
            const res = await getResponse(userQuestion);

            if (res.status === 200) {
                console.log(res);
                dispatch(
                    addChat({
                        question: userQuestion,
                        answer: res.data.answer,
                    })
                );
            }

            setUserQuestion("");
        } catch (error) {
            console.log("Failed to handle question", error);
        }
    }

    useEffect(() => {
        console.log("fetch history");
        fetchHistory();
    }, []);

    const [recent] = useState([
        "OAuth JavaScript Origins C...",
        "Google OAuth Access Token...",
        "LangChain Chain Input Flow...",
        "DFD Level 0 Diagram Image",
        "React Query String Fetching...",
        "React Services Folder Explai...",
        "React Landing Page Compo...",
        "HTML to React JSX Conversi...",
        "Tailwind Card UI for Task Date",
    ]);
    return (
        <>
            <div className="flex h-screen bg-white text-gray-900">
                {/* Sidebar */}
                <aside className="w-64 border-r bg-gray-50 flex flex-col fixed h-screen">
                    <div className="flex items-center justify-between px-4 py-4 border-b">
                        <h1 className="text-lg font-semibold">Gemini</h1>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                            2.5 Flash
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <button className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-200">
                            + New chat
                        </button>

                        <div className="mt-4">
                            <h2 className="px-4 text-sm font-semibold text-gray-500">
                                Gems
                            </h2>
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-200">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Storybook
                            </button>
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-200">
                                <FaRegCircleQuestion />
                                Explore Gems
                            </button>
                        </div>

                        <div className="mt-4">
                            <h2 className="px-4 text-sm font-semibold text-gray-500">
                                Recent
                            </h2>
                            <ul>
                                {recent.map((item, i) => (
                                    <li
                                        key={i}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="px-4 py-3 border-t flex flex-col items-start gap-2">
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                            {userInfo.username}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col mx-auto">
                    {chats?.length === 0 ? (
                        // No chats → Input stays in the middle
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <h1 className="text-3xl font-semibold text-blue-600 mb-6">
                                Hello, {userInfo.username.split(" ")[0]}
                            </h1>

                            <div className="w-full max-w-xl">
                                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 shadow-sm">
                                    <FiPlus className="mr-3 text-gray-600" />
                                    <input
                                        type="text"
                                        placeholder="Ask Gemini"
                                        value={userQuestion}
                                        onChange={(e) =>
                                            setUserQuestion(e.target.value)
                                        }
                                        className="flex-1 bg-transparent outline-none text-gray-800"
                                    />
                                    <div onClick={handleQuestionSend}>
                                        <IoSend className="ml-3 text-gray-600 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Chats exist → Chat history + sticky input
                        <div className="flex flex-1 flex-col">
                            {/* Chat History */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 w-full max-w-4xl mx-auto">
                                {chats?.map((chat, idx) => (
                                    <div key={idx} className="mb-6">
                                        {/* User Question */}
                                        <div className="flex justify-end">
                                            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs shadow">
                                                {chat.question}
                                            </div>
                                        </div>

                                        {/* AI Answer - full width */}
                                        <div className="mt-3 w-full">
                                            <div className="bg-white text-gray-700 px-6 py-4 rounded-lg shadow w-full">
                                                <div className="prose max-w-none">
                                                    <ReactMarkdown>
                                                        {chat.answer}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sticky Input Bar */}
                            <div className="sticky bottom-0 bg-white w-full max-w-3xl mx-auto px-4 py-4 border-t">
                                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 shadow-sm">
                                    <FiPlus className="mr-3 text-gray-600" />
                                    <input
                                        type="text"
                                        placeholder="Ask Gemini"
                                        value={userQuestion}
                                        onChange={(e) =>
                                            setUserQuestion(e.target.value)
                                        }
                                        className="flex-1 bg-transparent outline-none text-gray-800"
                                    />
                                    <div onClick={handleQuestionSend}>
                                        <IoSend className="ml-3 text-gray-600 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Profile + Upgrade */}
                <div className="absolute top-4 right-4 flex items-center gap-3">
                    <button className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium">
                        Upgrade
                    </button>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-teal-400"></div>
                </div>
            </div>
        </>
    );
}

export default Home;
