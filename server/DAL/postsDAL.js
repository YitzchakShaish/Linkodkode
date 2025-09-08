import { ObjectId } from "mongodb";
import { connectToDatabase } from "../DB/postsDB.js";


// Connect to the posts collection
// This function returns a promise that resolves to the posts collection
async function connectToPostsCollection() {
    const db = await connectToDatabase();
    return await db.collection('posts');
}


// Function to get a post by its ID
// This function returns a promise that resolves to the post document
export async function getPostByIdFDB(id) {
    try {
        const postsCollection = await connectToPostsCollection();
        const result = await postsCollection.findOne({ "_id": new ObjectId(id) })
        //console.log(result);
        if (!result) {
            return { success: false, data: null, error: 'post not found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }

}

// Function to get all posts
// This function returns a promise that resolves to an array of post documents
export async function getAllPostsFDB() {
    try {
        const postsCollection = await connectToPostsCollection();
        const result = await postsCollection.find().toArray();

        if (!result || result.length === 0) {
            return { success: false, data: null, error: 'No posts found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        console.log(`error: concted to mongodb`);

        return { success: false, data: null, error };
    }
}


// Insert a new post
// This function returns a promise that resolves to the inserted post document
export async function insertNewPostTDB(post) {
    const postsCollection = await connectToPostsCollection();

    try {
        const result = await postsCollection.insertOne(post);

        if (!result.acknowledged) {
            return { success: false, data: null, error: 'Insert failed' };
        }

        return { success: true, data: result.insertedId, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }
}

// Update an existing post by its ID
export async function updatePostTDB(id, post) {
    try {
        const postsCollection = await connectToPostsCollection();

        const result = await postsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: post }
        );
        // console.log(result);

        if (result.modifiedCount === 0) {
            return { success: false, error: 'post ton updated' };
        }

        return { success: true, error: null, data: "The post was updated successfully" };

    } catch (error) {
        return { success: false, error };
    }
}



// Delete a post by its ID
// This function returns a promise that resolves to the deleted post document
export async function deletePostFDB(id) {
    try {
        const postsCollection = await connectToPostsCollection();

        const result = await postsCollection.deleteOne(
            
            { _id: new ObjectId(id) }
        );
        console.log(`result: `+result.data);

        if (!result.data) {
            return { success: false, error: 'post not deleted' };
        }

        return { success: true, error: null ,data: "post deleted successfully"};

    } catch (error) {
        return { success: false, error };
    }
}

