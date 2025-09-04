import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    async function handleLogout() {
        const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`,
            {},
            {
                withCredentials: true,
            }
        );

        if (res.status === 200) {
            navigate('/')
        }
    }
    return (
        <>
            <div className="text-xl font-bold">Welcome to ChatGPT</div>
            <button
                className="bg-black text-white px-4 py-2"
                onClick={handleLogout}
            >
                Logout
            </button>
        </>
    );
}

export default Home;
