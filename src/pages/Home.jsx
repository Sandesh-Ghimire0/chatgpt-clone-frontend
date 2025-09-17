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
import RecentChat from "../components/RecentChat";
import NewChat from "../components/NewChat";
import ExistingChat from "../components/ExistingChat";
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
                                Recent
                            </h2>
                            <ul>
                                {recent.map((item, i) => (
                                    <RecentChat key={i} item={item} />
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
                        <NewChat
                            userInfo={userInfo}
                            userQuestion={userQuestion}
                            setUserQuestion={setUserQuestion}
                            handleQuestionSend={handleQuestionSend}
                        />
                    ) : (
                        // Chats exist → Chat history + sticky input
                        <ExistingChat
                            chats={chats}
                            userQuestion={userQuestion}
                            setUserQuestion={setUserQuestion}
                            handleQuestionSend={handleQuestionSend}
                        />
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
