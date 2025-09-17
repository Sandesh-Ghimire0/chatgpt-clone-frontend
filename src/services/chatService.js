import axios from "axios";

export const getResponse = async (question) => {
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/chat/response`,
            { question }
        );

        return res;
    } catch (error) {
        console.log("Failed to get llm response :: ", error);
        return error;
    }
};

export const getHistory = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/history`)

        return res
    } catch (error) {
        console.log("Failed to fetch histroy: ", error)
        return error
    }
}
