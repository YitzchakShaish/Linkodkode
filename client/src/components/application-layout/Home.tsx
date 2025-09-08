import ContentPosts from "./ContentPosts";
import Logo from "./Logo";
import Slogan from "./Slogan";
import "./Home.css"

export default function Home() {
    return (
        <>
            <div className="header">
                <Logo></Logo>
                <Slogan></Slogan>
            </div>
            <div className="contente">
                <ContentPosts />
            </div>
        </>

    )
}
