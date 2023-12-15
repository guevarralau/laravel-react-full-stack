import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then((response) => {
                console.log(response);
                const data = response.data;
                if (data.message) {
                    console.log(typeof data.message, data.message);
                    setMessage(data.message);
                    setTimeout(() => {
                        setMessage(null);
                    }, 10000);
                } else {
                    setUser(data.user);
                    setToken(data.token);

                    localStorage.setItem("user", JSON.stringify(data.user));
                    // localStorage.setItem("token", data.token);
                }
            })
            .catch((err) => {
                const { response } = err;
                const messages = response.data.errors;
                if (response?.status === 422) {
                    setErrors(messages);
                    setTimeout(() => {
                        setErrors(null);
                    }, 10000);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form rounded">
                <h1 className="title">Login to your Account</h1>
                <div>
                    {message && (
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    )}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => {
                                console.log(key, errors[key][0]);
                                return <p key={key}>{errors[key][0]}</p>;
                            })}
                        </div>
                    )}
                </div>
                <form onSubmit={onSubmit}>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        className="rounded"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="rounded"
                    />
                    <button className="btn btn-block rounded">Login</button>
                    <p className="message">
                        Not Registed ?
                        <Link to="/signup"> Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
