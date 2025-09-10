import { getUserByNameFDB, insertNewUserTDB } from '../DAL/usersDAL.js';
import { comparePassword, generateToken, hashPassword } from '../utils/authUtils.js';

export async function signup(req, res) {
    const { username, password, role } = req.body;

    //TODO: Allow someone with the same name to log in. Also check by password and more.
    const existing = await getUserByNameFDB(username);
    if (existing.success) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    const hashed = await hashPassword(password);
    const created = await insertNewUserTDB({username, hashed, role});
    console.log(created)
    if (created.success) {

        res.status(201).json({created});
    }
    else {
          res.status(500).json({ error: created.error });
    }
}




export async function login(req, res) {
    const { username, password } = req.body;

    const finded = await getUserByNameFDB(username);
    console.log(`finded`, finded);

    if (!finded.success) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, finded.data.hashed);
    if (!isMatch) {
        return res.status(403).json({ message: 'Wrong password' });
    }

    const token = generateToken({ id: finded.data._Id, role: finded.data.role });
    res.cookie('token', token, { httpOnly: true, });

    res.json({ message: 'Login successful', token, role: finded.data.role, name: finded.data.username, userId: finded.data.userId });
}

export function logout(req, res) {
    const token = null;
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully', token });
}
