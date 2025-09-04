import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function UserProtectionWrapper({ children }) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function getUser() {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/v1/auth/me`,
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                setUser(res.data);
                setIsLoading(false);
            }else{
               setUser()
               setIsLoading(false) 
            }
        } catch (error) {
            console.log("Failed to fetch the user :", error);
            setIsLoading(false);
        }
    }
    console.log(user);

    useEffect(() => {
        getUser();
    }, []);

    if (isLoading) {
        return <div className="font-semibold text-xl p-4">Loading....</div>;
    }

    if(!user){
        return <>
            <h2>Unauthorized Access</h2>
        </>
    }


    return <div>{children}</div>;
}

export default UserProtectionWrapper;
