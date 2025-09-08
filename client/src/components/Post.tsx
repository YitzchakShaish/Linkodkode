import { useNavigate } from "react-router";
import type { TipePost } from "../types"
import "./Post.css"
export default function Post(post: TipePost) {
    const navigate = useNavigate();

    return (
        <>
            <div className="post-card" onClick={() => navigate(`/posts/${post._id}`)}>
                <p className="posters-name">{post.postersName}</p>
                <img className="img" src={`http://localhost:3000/${post.urlToImg}.png`} alt="student" />
                <div className="description">
                    <h4>Description:</h4>
                    <p>{post.description}</p>
                </div>
                <span className="likes">Likes: {post.likes}</span>
                <p className="time-posting">Published in: {post.timePosting}</p>
            </div>
        </>
    )
}
