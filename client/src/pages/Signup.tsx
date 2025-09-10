import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { signupTS } from "../api/authApi";


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
        <div className="signup-page">
            <form className="form sginup-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    sign();
                }}
            >
                <div className="fild">
                    <strong>user name: </strong>
                    <input
                        type="text"
                        onChange={(e) => (userRef.current.name = e.target.value)}
                        placeholder="enter your name: "
                        required
                        minLength={4}
                    />
                </div>

                <div className="fild">
                    <strong>password: </strong>
                    <input
                        type="password"
                        onChange={(e) => (userRef.current.password = e.target.value)}
                        placeholder="enter your password: "
                        required
                        minLength={4}
                    />
                </div>

                <div className="signup-buttons">
                    <button type="submit" className="button">
                        Signup
                    </button>

                </div>
            </form>
            <Link to="/" className="button-home button">
                Back to Home
            </Link>
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
