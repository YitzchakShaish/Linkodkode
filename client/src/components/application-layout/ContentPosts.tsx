import Post from "../Post"
import type { TipePost } from "../../types"
import "./ContentPosts.css"
import { useEffect, useState } from "react"
import { getAllPosts } from "../../api/postsApi"


export default function ContentPosts() {
    const [postsFDB, setPostsFDB] = useState<TipePost[]>([]);
    const [errorMessage, setErrorMessage] =useState('');
    const [loadingMessage, setLoadingMessage] = useState('Loading posts... Please wait patiently...');

    async function LoadAllPosts() {
        try {
            const respos = await getAllPosts();
            console.log(respos)
            setPostsFDB(respos);
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
        return  <p className="message post-loading-notification">{loadingMessage}</p>       
    }


    return (
        <>
            <div className="home-posts">
                <div className="posts-container">
                    {postsFDB.map(p => (
                        < Post key={p.id}
                            id={p.id}
                            postersName={p.postersName}
                            description={p.description}
                            urlToImg={p.urlToImg}
                            likes={p.likes}
                            timePosting={p.timePosting}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

