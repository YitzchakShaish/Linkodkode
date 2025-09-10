import { useState } from "react";
import type { CounterLike, TypeLike } from "../types";

export default function Likes() {
    const [counterLikes, setCounterLikes] = useState<CounterLike>({
        Like: 0,
        Happy: 0,
        Sad: 0,
        Dislike: 0,
    });
    const allLikes: TypeLike[] = [{ name: "Like", emoji: "1" }, { name: "Dislike", emoji: "2" }]

    function AddLike(like: TypeLike) {

        setCounterLikes((prev) => ({
            ...prev,
            [like.name]: prev[like.name as keyof CounterLike] + 1,
        }));
    };

    return (
    <>
            <div>
                <div className="like-buttons">
                    {allLikes.map((l) => (
                        <button key={l.name} onClick={() => AddLike(l)} />
                    ))}

                    <div />
                </div>
            </>
            )
}
