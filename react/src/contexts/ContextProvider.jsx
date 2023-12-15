import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
});
// const ACCESS_TOKEN = "ACCESS_TOKEN";
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState("");
    const [token, _setToken] = useState(localStorage.getItem("token"));
    // const [token, _setToken] = useState(123);
    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
            console.log(token);
        } else {
            localStorage.removeItem("token");
        }
    };
    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
