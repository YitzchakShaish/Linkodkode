import express from 'express';
import { createNewPost, deletePostById, getAllPosts, getPostById, updatePostById } from '../controllers/postsCtrl.js';
import { validateIdParams, validatePosts } from '../middlewares/posts-validation.js';
import { verifyToken } from '../middlewares/authMiddlewares.js';

const router = express.Router();

//GET  get all posts
router.get('/', verifyToken, getAllPosts);

//GET  get post by id
router.get('/:id', validateIdParams, verifyToken, getPostById);

//POST create a new post
router.post('/', validatePosts, verifyToken, createNewPost)

//PUT update post by id
router.put('/:id', validateIdParams, validatePosts, verifyToken, updatePostById);

//DELETE delete post by id
router.delete('/:id', validateIdParams, verifyToken, deletePostById);


export default router;