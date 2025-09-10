import { useState } from "react"
import accounticon from "../../assets/accounticon.png"
import login from "../../assets/login-icon.png"
import signup from "../../assets/signup-icon.png"



import "./Account.css"
import { useNavigate } from "react-router"
export default function Account() {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    function toggolMenu() {
        setMenu((prev) => !prev)
        setTimeout(() => {
            setMenu((prev) => !prev)

        }, 2000);
    }
    return (
        <>
            {!menu && <button className="button-account button" onClick={toggolMenu}>
                <img className="img-account" src={accounticon} alt="account icon" /></button>}
            {menu && <div>
                <p onClick={toggolMenu}>close </p>
                <button className="button-account button" onClick={() => { navigate("/signup") }}><img className="img-signup" src={signup} alt="signup icon" /></button>
                <button className="button-account button" onClick={() => { navigate("/login") }}><img className="img-login" src={login} alt="login icon" /></button>

            </div>}
        </>
    )
}
