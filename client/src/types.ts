export type TipePost = {
    id: number,
    urlToImg: string,
    description: string,
    likes: string,
    postersName: string,
    timePosting: string
}

export type CounterLike = {
    Like: number,
    Dislike: number,
    Sad: number,
    Happy: number
}


export type TypeLike = {
    name: "Like" | "Dislike" | "Sad" | "Happy"; emoji: string
};

