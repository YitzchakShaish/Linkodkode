import { useContext } from "react";
import loginrequired from "../assets/loginrequired.png"
import ContentPosts from "./application-layout/ContentPosts";
import { UserContext } from "../AppRoutes";


export default function LoginScreen() {
      const UserC = useContext(UserContext);

    return (
        <>{
            !UserC.token? <><p>Welcome!!  This site is very secure, to view posts and/or upload posts you must register and log in to the site. Good luck!.</p>
            <img width={400} src={loginrequired} alt="login required" /></>:
            <ContentPosts /> 
        }
           
        </>
    )
}
