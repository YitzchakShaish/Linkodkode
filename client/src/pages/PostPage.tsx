import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { TypePost } from '../types';
import Post from '../components/Post';
import { getPostById } from '../api/postsApi';
import "./PostPage.css"
import Loading from "../assets/Loading.mp4"


export default function PostPage() {
    // useParams() returns an object with key-value pairs for the URL parameters.
    const { id } = useParams();



    const [postFDB, setPostFDB] = useState<TypePost>({ _id: '', urlToImg: '', description: '', likes: '', postersName: '', timePosting: '', ownerID: 0 });
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('Loading post... Please wait patiently...');

    async function LoadPost() {
        try {
            const response = await getPostById(id!);
            if (response.status === 404) {
                setErrorMessage("Post not found")

                //Error/success messages will be displayed for 2 seconds in the center of the screen.
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
            if (response.status === 500) {
                setErrorMessage("Error: Server error. Post not loaded :(")
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
            const post = await response.json();
            console.log(response)
            setPostFDB(post);
            setLoadingMessage("");
        } catch (error) {
            console.log(error)
            setErrorMessage("Error: Server error. Post not loaded :(")
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }
    }
    useEffect(() => {
        LoadPost()
    }, [])


    return (
        <>
            <div className="post-page">
                {/* //Error/success messages will be displayed for 2 seconds in the center of the screen. */}
                {(!id || id.length < 24) && <p className="message id-error-message">The ID is not found or is invalid. (id must be 24 characters).</p>}

                {errorMessage && <p className="message server-error-message">{errorMessage}</p>}

                {loadingMessage && <p className="message post-loading-notification">{loadingMessage}</p> && <video className="massage" src={Loading} width={200}></video>}
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






