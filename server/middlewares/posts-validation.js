
//A function that verifies receipt of the required fields for creating a new post,
//  or updating an existing post.

export  function validatePosts(req, res, next) {
    if (!req.body) {
        return res.status(400).json({ message: 'Invalid or Error: All three fields must be added: postersName, description, timePosting' });
    }
    const {
        description,
        postersName,
        timePosting } = req.body;

    if (
        !description || typeof description !== 'string' || description.trim() === '' ||
        !postersName || typeof postersName !== 'string' || postersName.trim() === '' ||
        !timePosting || typeof timePosting !== 'string' || timePosting.trim() === ''
    ) {
        return res.status(400).json({ message: 'Invalid or Error: All three fields must be added: postersName, description, timePosting' });
    }

    next();
}


//A function that verifies receipt of an id param 
// for the purpose of receiving/updating/deleting a specific post.

export function validateIdParams(req, res, next) {

    if (!req?.params.id) {
        return res.status(400).json({ error: 'Id params is required' });
    }
    next()
}


