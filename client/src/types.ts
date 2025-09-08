export type TipePost = {
    ownerID: number,
    urlToImg: string,
    description: string,
    likes: string,
    postersName: string,
    timePosting: string,
    _id: string
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

