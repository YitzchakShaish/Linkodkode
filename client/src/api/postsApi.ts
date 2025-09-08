

// This function fetches all posts from the server
// It returns a promise that resolves to an array of post objects
export async function getAllPosts() {
    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    //console.log("Show all posts:", posts);
   return  posts;
   
}

// This function fetches a post by its ID from the server
// It returns a promise that resolves to a post object
export async function getPostById(id: string) {
    const response = await fetch(`http://localhost:3000/posts/${id}`);
   
   return response;
   
}
