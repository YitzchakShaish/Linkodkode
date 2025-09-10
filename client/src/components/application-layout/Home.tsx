import ContentPosts from "./ContentPosts";
import imgNewPost from "../../assets/createNewPost.png"
import Logo from "./Logo";
import Slogan from "./Slogan";
import "./Home.css"
import { Outlet, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../AppRoutes";
import Account from "./Account";

export default function Home() {
    const navigate = useNavigate();
    const UserC = useContext(UserContext);

    return (
        <>
            <header className="header">
                <Logo></Logo>
                {
                    UserC.token ? <button className="create-new-post" onClick={() => { navigate("/posts/newpost") }}><img src={imgNewPost} alt="Create a new post" /></button>
                        : <></>}
                <Slogan></Slogan>
                <Account></Account>
            </header>
            <main className="contente">
                <Outlet /> {/* This is where child routes will render */}
            </main>
        </>

    )
}
