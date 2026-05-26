import axios from "axios";

const API_URL = "http://13.206.120.195:8080/api/auth";

export const signup = async (userData) => {

    return axios.post(
        `${API_URL}/signup`,
        userData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
