const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = [];

/**
 * Register a new user
 * @route POST /auth/register
 * @group Authentication - User authentication operations
 * @param {string} username.body.required - The username.
 * @param {string} password.body.required - The user's password.
 * @returns {object} 201 - User registered successfully.
 * @returns {object} 500 - Internal server error.
 */
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    // User's password is hashed before storing it in the 'users' array.
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
});

/**
 * Log in an existing user.
 * @route POST /auth/login
 * @group Authentication - User authentication operations
 * @param {string} username.body.required - The username.
 * @param {string} password.body.required - The user's password.
 * @returns {object} 200 - Successful login, returns a JWT token.
 * @returns {object} 401 - Invalid credentials.
 */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);

    if (user && (await bcrypt.compare(password, user.password)))
    {
        // If successful, a JWT token is generated.
        const token = jwt.sign({ username }, "secret_key");
        res.status(200).json({ token });
    }
    else 
    {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;