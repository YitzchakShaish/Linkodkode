

// This function fetches all posts from the server

import type { TypeCreatePost } from "../types";
import { authFetch } from "./authApi";

// It returns a promise that resolves to an array of post objects
export async function getAllPosts() {
  const response = await authFetch("http://localhost:3000/posts");
  
  return response;

}


// This function fetches a post by its ID from the server
// It returns a promise that resolves to a post object
export async function getPostById(id: string) {
  const response = await authFetch(`http://localhost:3000/posts/${id}`);

  return response;

}


// This function creates a new post on the server
// It takes the post name, task description, and correct answer as parameters
export async function createPost(newPost: TypeCreatePost) {

  const res = await authFetch("http://localhost:3000/posts", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost)

  });
  console.log("JSON.stringify: " + JSON.stringify(newPost));
  return res;
}