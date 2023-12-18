/**
 * Express Router for authentication-related routes
 * @module authRoutes
 */
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");


/**
 * Register a new user
 * @route POST /auth/register
 * @function
 * @memberof module:authRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {function} middleware - Express middleware for handling user registration.
 */
router.post("/register", registerUser);

/**
 * Log in an existing user.
 * @route POST /auth/login
 * @function
 * @memberof module:authRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {function} middleware - Express middleware for handling user login.
 */
router.post('/login', loginUser);

module.exports = router;