import Post from "../Post"
import type { TypePost } from "../../types"
import "./ContentPosts.css"
import { useEffect, useState } from "react"
import { getAllPosts } from "../../api/postsApi"
import Loading from "../../assets/Loading.mp4"


export default function ContentPosts() {
    const [postsFDB, setPostsFDB] = useState<TypePost[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('Loading posts... Please wait patiently...');

    async function LoadAllPosts() {
        try {
            const response = await getAllPosts();
            if (response.status === 404) {
                setErrorMessage("Posts not found")

                //Error/success messages will be displayed for 2 seconds in the center of the screen.
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
            if (response.status === 500) {
                setErrorMessage("Error: Server error. Posts not loaded :(")
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
            const posts = await response.json();
            console.log(response)
            setPostsFDB(posts);
            setLoadingMessage("");
        } catch (error) {
            console.log(error)
            setErrorMessage("Error: Server error. Posts not loaded :(")
        }
    }
    useEffect(() => {
        LoadAllPosts()
    }, [])

    if (errorMessage) {
        return <p className="message server-error-message">{errorMessage}</p>
    }

    if (loadingMessage) {
        return (<>
            <p className="message post-loading-notification">{loadingMessage}</p>
        </>)
    }


    return (
        <>
            <div className="home-posts">
                {errorMessage && <p className="message server-error-message">{errorMessage}</p>}
                {loadingMessage && <p className="message post-loading-notification">{loadingMessage}</p> && <video className="massage" src={Loading} width={200}></video>}
                <div className="posts-container">
                    {postsFDB?.map(p => (
                        < Post key={p._id}
                            _id={p._id}
                            postersName={p.postersName}
                            description={p.description}
                            urlToImg={p.urlToImg}
                            likes={p.likes}
                            timePosting={p.timePosting}
                            ownerID={p.ownerID}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

