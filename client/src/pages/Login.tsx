import { useContext, useRef, useState } from "react";
import { Link } from "react-router";
import { loginTS } from "../api/authApi";
import { UserContext } from "../AppRoutes";
import { useNavigate } from "react-router";
import "./LoginSignup.css"




export default function Login() {
    const UserC = useContext(UserContext);
    const navigate = useNavigate();


    const userRef = useRef<{
        name: string;
        password: string;
        role: string;
        id: number;
        token: string;
    }>({
        name: "",
        password: "",
        role: "user",
        id: 0,
        token: "",
    });

    const [message, setMessage] = useState("");
    let response;



    async function login() {
        response = await loginTS(
            userRef.current.name,
            userRef.current.password,
            userRef.current.role
        );

        if (response.status === 200) {
            UserC.name = userRef.current.name;
            UserC.id = response.data.playerId;
            UserC.token = response.data.token;
            setMessage("Login successful!");
            setTimeout(() => {
                setMessage('')
            }, 2000)
            return true;
        } else if (response.status === 401) {
            setMessage("Invalid credentials");
            setTimeout(() => {
                setMessage('')
            }, 2000)
            return null;
        } else {
            setMessage("Login failed");
            setTimeout(() => {
                setMessage('')
            }, 2000)
            return null;
        }
    }

    return (
        <div className="login-form-container">
            <form className="add-account-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}
            >
                <label >
                    <strong>user name: </strong>
                    <br /><br />
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
                    <br /><br />
                    <input
                        type="password"
                        onChange={(e) => (userRef.current.password = e.target.value)}
                        placeholder="enter your password: "
                        required
                        minLength={4}
                    />
                </label>


                <button type="submit" >
                    Login
                </button>
            </form>


            <div>{message && <p className="message login-message">{message}</p>}</div>
        </div>
    );
}
