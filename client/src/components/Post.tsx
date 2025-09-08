import type { TipePost } from "../types"
import "./Post.css"
export default function Post(post: TipePost) {
    return (
        <>
            <div className="post-card">
                <p className="posters-name">{post.postersName}</p>
                <img className="img" src={`http://localhost:3000/${post.urlToImg}.png`} alt="student" />
             <div  className="description">
                 <h4>Description:</h4>
                 <p>{post.description}</p>
                </div>  
                <span className="likes">Likes: {post.likes}</span>
                <p className="time-posting">Published in: {post.timePosting}</p>
            </div>
        </>
    )
}
