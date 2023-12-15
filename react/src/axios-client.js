import axios from "axios";

// const ACCESS_TOKEN = "ACCESS_TOKEN";

axios.interceptors.request.use(
    // (config) => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         config.headers["Authorization"] = `Bearer ${token}`;
    //     }
    //     console.log(`Bearer ${token}`);
    //     return config;
    // },
    // (config) => {
    //     const token = localStorage.getItem("token");
    //     const auth = token ? `Bearer ${token}` : "";
    //     config.headers.common["Authorization"] = auth;
    //     return config;
    // },
    (error) => {
        Promise.reject(error);
    }
);

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URl}/api`,
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            console.log(error, response.status);
            if (response.status === 401) {
                // localStorage.removeItem("token");
            }
            return Promise.reject(error);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
);

export default axiosClient;
