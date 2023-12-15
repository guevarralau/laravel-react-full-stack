import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        // console.log(payload);
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                console.log(data);
                setUser(data.user);
                setToken(data.token);
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
        <div className="login-signup-form animated fadeInDown ">
            <div className="form rounded">
                <div className="title">Sign up for free</div>
                <div>
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
                        ref={nameRef}
                        placeholder="Full Name"
                        className="rounded"
                    />
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
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                        className="rounded"
                    />
                    <button className="btn btn-block rounded">Signup</button>
                    <p className="message">
                        Already have an account ?
                        <Link to="/login"> Login here!</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
