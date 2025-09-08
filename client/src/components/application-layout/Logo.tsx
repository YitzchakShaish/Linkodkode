import {  useNavigate } from "react-router"
import logo from "../../assets/logo-Linkodkode.jpg"
import "./Logo.css"


export default function Logo() {
  const navigate = useNavigate();

  
  return (
    <><div className="logo">
        <img className="img-logo" src={logo} alt="logo-linkodkod" onClick={() => navigate("/")} />
    </div>
    </>
  )
}
