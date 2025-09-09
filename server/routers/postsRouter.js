import express from 'express';
import { createNewPost, deletePostById, getAllPosts, getPostById, updatePostById } from '../controllers/postsCtrl.js';
import { validateIdParams, validatePosts } from '../middlewares/posts-validation.js';

const router = express.Router();

//GET  get all posts
router.get('/', getAllPosts);

//GET  get post by id
router.get('/:id', validateIdParams, getPostById);

//POST create a new post
router.post('/', validatePosts, createNewPost)

//PUT update post by id
router.put('/:id', validateIdParams, validatePosts, updatePostById);

//DELETE delete post by id
router.delete('/:id', validateIdParams, deletePostById);


export default router;