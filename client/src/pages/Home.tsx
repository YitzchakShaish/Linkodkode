import Post from "../components/Post"
import type { PostTipe } from "../types"
import "./Home.css"

export default function Home() {
    const posts: PostTipe[] = [{ id: 4, urlToImg: 'lll', description: 'student', likes: '100', postersName: 'yitzchak', timePosting: '7/9' },
    { id: 1, urlToImg: 'lll', description: 'student', likes: '130', postersName: 'moti', timePosting: '7/9' },
    { id: 2, urlToImg: 'lll', description: 'student', likes: '100', postersName: 'yitzchak', timePosting: '7/9' },
    { id: 3, urlToImg: 'lll', description: 'student', likes: '200', postersName: 'moshe', timePosting: '7/9' }]


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

