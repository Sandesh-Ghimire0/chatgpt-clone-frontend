import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../services/authService";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../stores/authSlice";
import {
    getHistory,
    getRecentChat,
    getResponse,
} from "../services/chatService";
import { addChat } from "../stores/chatSlice";
import { addHistory } from "../stores/chatSlice";
import RecentChat from "../components/RecentChat";
import NewChat from "../components/NewChat";
import ExistingChat from "../components/ExistingChat";
import { addRecentChat } from "../stores/recentChat";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
    const [userQuestion, setUserQuestion] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const { chats } = useSelector((state) => state.chat);
    const { recent_chats } = useSelector((state) => state.recentChat);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { thread_id } = useParams();

    async function handleLogout() {
        const res = await logoutUser();

        if (res.status === 200) {
            dispatch(logout());
            navigate("/");
        }
    }

    async function fetchHistory(thread_id) {
        try {
            const res = await getHistory(thread_id);

            if (res.status === 200) {
                console.log(res.data)
                dispatch(addHistory(res.data));
            }
        } catch (error) {
            console.log("Failed to get history :: ", error);
        }
    }

    async function fetchRecentChat() {
        try {
            const res = await getRecentChat();

            if (res.status === 200) {
                dispatch(addRecentChat(res.data));
            }
        } catch (error) {
            console.log("Failed to fetch recent chat :: ", error);
        }
    }

    async function handleQuestionSend() {
        try {
            const res = await getResponse(userQuestion, thread_id);

            if (res.status === 200) {
                console.log(res);
                dispatch(
                    addChat({
                        question: userQuestion,
                        answer: res.data.answer,
                    })
                );
                navigate(`/home/${res.data.thread_id}`);
            }

            setUserQuestion("");
        } catch (error) {
            console.log("Failed to handle question", error);
        }
    }

    useEffect(() => {
        fetchHistory(thread_id);
    }, [thread_id]);

    useEffect(() => {
        fetchRecentChat();
    },[thread_id]);

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
                        <Link to={'/home'} className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-200">
                            + New chat
                        </Link>

                        <div className="mt-4">
                            <h2 className="px-4 text-sm font-semibold text-gray-500">
                                Recent
                            </h2>
                            <ul>
                                {recent_chats?.map((item) => (
                                    <RecentChat
                                        key={item.thread_id}
                                        item={item}
                                    />
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
