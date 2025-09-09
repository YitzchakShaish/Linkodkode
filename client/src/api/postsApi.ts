

// This function fetches all posts from the server

import type { TypeCreatePost } from "../types";

// It returns a promise that resolves to an array of post objects
export async function getAllPosts() {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();
  //console.log("Show all posts:", posts);
  return posts;

}

// This function fetches a post by its ID from the server
// It returns a promise that resolves to a post object
export async function getPostById(id: string) {
  const response = await fetch(`http://localhost:3000/posts/${id}`);

  return response;

}


// This function creates a new post on the server
// It takes the post name, task description, and correct answer as parameters


export async function creatPost(newPost: TypeCreatePost) {

  const res = await fetch("http://localhost:3000/posts", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost)

  });
  console.log("JSON.stringify: " + JSON.stringify(newPost));
  //   const data = await res.json();
  //   console.log("Saved post:", data);
  return res;
}