import axios from "axios";

export const getResponse = async (question, thread_id) => {
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/chat/response/${thread_id}`,
            { question }
        );

        return res;
    } catch (error) {
        console.log("Failed to get llm response :: ", error);
        return error;
    }
};

export const getHistory = async (thread_id) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/history`,{thread_id})

        return res
    } catch (error) {
        console.log("Failed to fetch histroy: ", error)
        return error
    }
}

export const getRecentChat  = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/recent-chat`)
        return res
    } catch (error) {
        console.log("failed to get recent chat :: ", error)
        return error
    }
}
