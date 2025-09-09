import { ObjectId } from "mongodb";
import { connectToDatabase } from "../DB/LinkodkodeDB.js";


// Connect to the users collection
// This function returns a promise that resolves to the users collection
async function connectToUsersCollection() {
    const db = await connectToDatabase();
    return await db.collection('users');
}


// Function to get a user by its ID
// This function returns a promise that resolves to the user document
export async function getUserByIdFDB(id) {
    try {
        const usersCollection = await connectToUsersCollection();
        const result = await usersCollection.findOne({ "_id": new ObjectId(id) })
        //console.log(result);
        if (!result) {
            return { success: false, data: null, error: 'user not found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }

}


// Function to get a user by its user name
// This function returns a promise that resolves to the user document
export async function getUserByNameFDB(username) {
    try {
        const usersCollection = await connectToUsersCollection();
        const result = await usersCollection.findOne({ "username": username })
        if (!result) {
            return { success: false, data: null, error: 'user not found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }

}

// Function to get all users
// This function returns a promise that resolves to an array of user documents
export async function getAllusersFDB() {
    try {
        const usersCollection = await connectToUsersCollection();
        const result = await usersCollection.find().toArray();

        if (!result || result.length === 0) {
            return { success: false, data: null, error: 'No users found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        console.log(`error: concted to mongodb`);

        return { success: false, data: null, error };
    }
}


// Insert a new user
// This function returns a promise that resolves to the inserted user document
export async function insertNewUserTDB(user) {
    const usersCollection = await connectToUsersCollection();

    try {
        const result = await usersCollection.insertOne(user);

        if (!result.acknowledged) {
            return { success: false, data: null, error: 'Insert failed' };
        }

        return { success: true, data: result.insertedId, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }
}

// Update an existing user by its ID
export async function updateUserTDB(id, user) {
    try {
        const usersCollection = await connectToUsersCollection();

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: user }
        );
        // console.log(result);

        if (result.modifiedCount === 0) {
            return { success: false, error: 'user ton updated' };
        }

        return { success: true, error: null, data: "The user was updated successfully" };

    } catch (error) {
        return { success: false, error };
    }
}



// Delete a user by its ID
// This function returns a promise that resolves to the deleted user document
export async function deleteUserFDB(id) {
    try {
        const usersCollection = await connectToUsersCollection();

        const result = await usersCollection.deleteOne(
            
            { _id: new ObjectId(id) }
        );
        console.log(`result: `+result.data);

        if (!result.data) {
            return { success: false, error: 'user not deleted' };
        }

        return { success: true, error: null ,data: "user deleted successfully"};

    } catch (error) {
        return { success: false, error };
    }
}

