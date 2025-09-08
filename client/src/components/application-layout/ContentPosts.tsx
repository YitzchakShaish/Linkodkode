import Post from "../Post"
import type { TipePost } from "../../types"
import "./ContentPosts.css"

export default function ContentPosts() {
    const posts: TipePost[] = [{ id: 4, urlToImg: '4', description: 'student', likes: '100', postersName: 'yitzchak', timePosting: '7/9' },
    { id: 1, urlToImg: '1', description: 'student', likes: '130', postersName: 'moti', timePosting: '7/9' },
    { id: 2, urlToImg: '2', description: 'student', likes: '100', postersName: 'yitzchak', timePosting: '7/9' },
    { id: 3, urlToImg: '3', description: 'student', likes: '200', postersName: 'moshe', timePosting: '7/9' }]


    return (
        <>
            <div className="home-posts">
                <div className="posts-container">
                    {posts.map(p => (
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

