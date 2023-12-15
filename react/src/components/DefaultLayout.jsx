import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const onLogout = (ev) => {
        ev.preventDefault();
        // const config = {
        //     headers: { Authorization: `Bearer ${token}` },
        // };
        axiosClient
            .post("/logout", user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((data) => {
                console.log(data);
                setUser({});
                setToken(null);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        axiosClient
            .get("/user", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(({ data }) => {
                setUser(data);
                // console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout" href="#">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
