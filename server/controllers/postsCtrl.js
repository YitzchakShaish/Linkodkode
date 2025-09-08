
import { deletePostFDB, getAllPostsFDB, getPostByIdFDB, insertNewPostTDB, updatePostTDB } from "../DAL/postsDAL.js";



// POST /posts/addpost
// This function adds a new post to the database


export const createNewPost = async (req, res) => {
  const { postersName, description, timePosting, id, urlToImg, likes } = req.body;

  try {
    const created = await insertNewPostTDB({ postersName, description, timePosting, id, urlToImg, likes });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//GET all posts
// This function retrieves all posts from the database
// It returns a JSON array of posts
export const getAllPosts = async (req, res) => {

  try {
    const allPosts = await getAllPostsFDB();
    res.status(200).json(allPosts.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /posts/:id 
// This function retrieves a post by its ID
// It expects the ID to be passed as a URL parameter
export const getPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await getPostByIdFDB(id);
    if (!post) return res.status(404).json({ error: "post not found" });
    res.status(200).json(post.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//PUT posts/:id
// This function updates a post by its ID
// It expects the ID to be passed as a URL parameter and the updated post data in the request body
// It returns the updated post as a JSON object
export const updatePostById = async (req, res) => {
  const idParam = req.params.id;  
  const { postersName, description, timePosting, id, urlToImg, likes } = req.body;


  try {
    const updateed = await updatePostTDB(idParam, { postersName, description, timePosting, id, urlToImg, likes } );
    if (!updateed) return res.status(404).json({ "success": false, error: "post not found" });
    res.status(200).json(updateed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//DELETE posts/id
// This function deletes a post by its ID
// It expects the ID to be passed as a URL parameter
export const deletePostById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await deletePostFDB(id);
    console.log(deleted);
    
    if (!deleted.success) return res.status(404).json({"success": false, error: "post not found" });
    res.status(200).json(deleted.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




