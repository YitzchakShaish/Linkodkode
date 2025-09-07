import type { TipePost } from "../types"
import "./Post.css"
export default function Post(post: TipePost) {
    return (
        <>
            <div className="post-card">
                <p className="posters-name">{post.postersName}</p>
                <img className="img" src="https://masseduequity.org/wp-content/uploads/2021/07/Meeting-Students-Where-they-are-0.jpg" alt="student" />
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
