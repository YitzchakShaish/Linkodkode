import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { TipePost } from '../types';
import Post from '../components/Post';
import { getPostById } from '../api/postsApi';
import "./PostPage.css"

export default function PostPage() {
    // useParams() returns an object with key-value pairs for the URL parameters.
    const { id } = useParams();



    const [postFDB, setPostFDB] = useState<TipePost>({ _id: '', urlToImg: '', description: '', likes: '', postersName: '', timePosting: '', ownerID: 0 });
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('Loading post... Please wait patiently...');

    async function LoadPost() {
        try {
            const response = await getPostById(id!);
            if (response.status === 404) {
                setErrorMessage("Post not found")
            }
            if (response.status === 500) {
                setErrorMessage("Error: Server error. Post not loaded :(")
            }
            const post = await response.json();
            console.log(response)
            setPostFDB(post);
            setLoadingMessage("");
        } catch (error) {
            console.log(error)
            setErrorMessage("Error: Server error. Post not loaded :(")
        }
    }
    useEffect(() => {
        LoadPost()
    }, [])
    if (!id || id.length < 24) {
        return <p className="message id-error-message">The ID is not found or is invalid. (id must be 24 characters).</p>
    }

    if (errorMessage) {
        return <p className="message server-error-message">{errorMessage}</p>
    }

    if (loadingMessage) {
        return <p className="message post-loading-notification">{loadingMessage}</p>
    }


    return (
        <>
            <div className="post">
                <div className="posts-container">
                    <Post _id={postFDB._id}
                        postersName={postFDB.postersName}
                        description={postFDB.description}
                        urlToImg={postFDB.urlToImg}
                        likes={postFDB.likes}
                        timePosting={postFDB.timePosting}
                        ownerID={postFDB.ownerID}></Post>
                </div>
            </div>
        </>
    )
}






