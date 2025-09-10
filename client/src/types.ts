export type TypePost = {
    ownerID: number,
    urlToImg: string,
    description: string,
    likes: string,
    postersName: string,
    timePosting: string,
    _id: string
}

export type TypeCreatePost = {
    ownerID: number,
    urlToImg: string,
    description: string,
    postersName: string,
    timePosting: string,
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

export type User = {
  name: string | null;
  id: number | null;
  token: string | null;
};

