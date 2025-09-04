import React from "react";

function Landing() {
    return (
        <div>
            <h1 className="text-2xl text-amber-400">ChatGPT</h1>

            <a
                href={`${import.meta.env.VITE_BASE_URL}/api/v1/auth/google`}
                className="px-4 py-2 bg-blue-400 text-white rounded-md mt-4"
            >
                Continue with Google
            </a>
        </div>
    );
}

export default Landing;
