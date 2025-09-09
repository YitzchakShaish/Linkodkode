import { getUserByNameFDB, insertNewUserTDB } from '../DAL/usersDAL.js';
import { comparePassword, generateToken, hashPassword } from '../utils/authUtils.js';

export async function signup(req, res) {
    const { username, password, role } = req.body;


    const existing = await getUserByNameFDB(username);
    if (existing.success) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    const hashed = await hashPassword(password);
    const created = await insertNewUserTDB(username, hashed, role);
    const token = generateToken({ id: finded.playerId, role: finded.role });
    res.cookie('token', token, { httpOnly: true, });

    res.status(201).json({ message: 'User registered successfully', token, name: username, playerId: created.playerId });
}




export async function login(req, res) {
    const { username, password } = req.body;

    const finded = await getUserByNameFDB(username);
    console.log(`finded`, finded);

    if (!finded.success) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, finded.password_hash);
    if (!isMatch) {
        return res.status(403).json({ message: 'Wrong password' });
    }

    const token = generateToken({ id: finded.playerId, role: finded.role });
    res.cookie('token', token, { httpOnly: true, });

    res.json({ message: 'Login successful', token, role: finded.role, name: finded.username, playerId: finded.playerId });
}

export function logout(req, res) {
    const token = null;
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully', token });
}
