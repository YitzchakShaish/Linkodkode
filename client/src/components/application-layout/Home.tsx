import ContentPosts from "./ContentPosts";
import imgNewPost from "../../assets/createNewPost.png"
import Logo from "./Logo";
import Slogan from "./Slogan";
import "./Home.css"
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../AppRoutes";
import Account from "./Account";
import loginrequired from "../../assets/loginrequired.png"

export default function Home() {
    const navigate = useNavigate();
    const UserC = useContext(UserContext);

    return (
        <>
            <div className="header">
                <Logo></Logo>
                {
                    UserC.token ? <button className="create-new-post" onClick={() => { navigate("/posts/newpost") }}><img src={imgNewPost} alt="Create a new post" /></button>
                        : <></>}
                <Account></Account>
                <Slogan></Slogan>
            </div>

            {
                UserC.token ? <div className="contente">
                    <ContentPosts />
                </div> :
                    <div className="contente"><p>Welcome!!  This site is very secure, to view posts and/or upload posts you must register and log in to the site. Good luck!.</p>
                    <img width={400} src={loginrequired} alt="login required" /></div> }
        </>

    )
}
