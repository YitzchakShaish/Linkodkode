import ContentPosts from "./ContentPosts";
import imgNewPost from "../../assets/createNewPost.png"
import Logo from "./Logo";
import Slogan from "./Slogan";
import "./Home.css"
import { useNavigate } from "react-router";

export default function Home() {
        const navigate = useNavigate();

    return (
        <>
            <div className="header">
                <Logo></Logo>
                <button className="create-new-post" onClick={() => {navigate("/posts/newpost")}}><img src={imgNewPost} alt="Create a new post" /></button>
                <Slogan></Slogan>
            </div>
            <div className="contente">
                <ContentPosts />
            </div>
        </>

    )
}
