import { test } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';

import { hashPassword, comparePassword, generateToken } from '../services/authServices.js';

const secrate = process.env.JWT_SECRET || "secratesecratesecrate"


test("The encryption function works, the regular password and the encrypted password are not the same.", async () => {
    const pas = "yitzchak123"
    const hash = await hashPassword(pas)
    assert.notDeepStrictEqual(pas, hash);
});

test("Check 2 encryptions are not the same.", async () => {
    const pas = "yitzchak123"
    const hash1 = await hashPassword(pas)
    const hash2 = await hashPassword(pas)
    assert.notDeepStrictEqual(hash1, hash2);
});

test("Check encrypted password against original password. With comparison function.", async () => {
    const pas = "yitzchak123"
    const hash = await hashPassword(pas)
    const res = await comparePassword(pas, hash)
    assert.strictEqual(res, true);
});



test("Check for proper token decoding", async () => {
    const payload = { username: "yitzchak", role: "user" }
    const token = generateToken(payload, secrate)

    const decoded = jwt.verify(token, secrate);
    assert.deepStrictEqual(decoded.username, payload.username);
});

test("Check for incorrect token.", async () => {
    const payload = { username: "yitzchak", role: "user" }
    const token = generateToken(payload, secrate)
    const tamperedToken = token.slice(0, -5) + 'invalid_signature_part';
    try {
        jwt.verify(tamperedToken, secrate);
    } catch (error) {
        assert.strictEqual(error.name, 'JsonWebTokenError')
    }
});
