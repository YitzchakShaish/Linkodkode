import ContentPosts from "./ContentPosts";
import Logo from "./Logo";
import Slogan from "./Slogan";
import "./Home.css"

export default function Home() {
    return (
        <>
            <header>
                <Logo></Logo>
                <Slogan></Slogan>
            </header>
            <body>
                <ContentPosts />
            </body>
        </>

    )
}
