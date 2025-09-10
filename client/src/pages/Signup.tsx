import { useRef, useState } from "react";
import {  useNavigate } from "react-router";
import { signupTS } from "../api/authApi";
import "./LoginSignup.css"



export default function Signup() {
    const userRef = useRef<{ name: string; password: string; role: string }>({
        name: "",
        password: "",
        role: "user"
    });
    const navigate = useNavigate();
    const [time, setTime] = useState(0);
    const [message, setMessage] = useState("");

    async function sign() {
        const response = await signupTS(userRef.current.name, userRef.current.password, userRef.current.role)
        console.log(response);
        if (response.status === 201) {
            console.log('Signup successful!');
            setMessage('Signup successful!. You are being redirected to login.');
            setTime(setTimeout(() => {
                setMessage('')
                navigate('/login')
            }, 3500))
            return response.json();
        }

        else if (response.status === 409) {
            console.log('User already exists. Redirecting to login...');
            setMessage('User already exists. Redirecting to login...');
            setTime(setTimeout(() => {
                setMessage('')
                navigate('/login')
            }, 3500))
        }

        else {
            console.log('Signup failed:', response.json());
            setMessage('Signup failed:');
            return null;
        }
    }
    return (
        <div className="singup-form-container">
            <form className="add-account-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    sign();
                }}
            >
                <label >
                    <strong>user name: </strong>
                    <br />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => (userRef.current.name = e.target.value)}
                        placeholder="enter your name: "
                        required
                        minLength={4}
                    />
                </label>


                <label >
                    <strong>password: </strong>
                    <br />
                    <br />
                    <input
                        type="password"
                        onChange={(e) => (userRef.current.password = e.target.value)}
                        placeholder="enter your password: "
                        required
                        minLength={4}
                    />
                </label>


                <button type="submit" >
                    Signup
                </button>
            </form>


            <div>{message && <p className="message login-message">{message}</p>}</div>
            <div>{time != 0 && <button className="message" onClick={() => {
                console.log(time)
                clearTimeout(time)
                setMessage('')
                setTime(0);
            }}>No, I want to stay.</button>}</div>
        </div>
    );
}
