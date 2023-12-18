const express = require("express");
const router = express.Router();

/**
 * Get user profile information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/profile", (req, res) => {
    // For simplicity return static user profile information
    const userProfile = {
        username: 'john_doe',
        email: 'john@example.com',
    };

    res.status(200).json(userProfile);
});

/**
 * Get a ticket history for the user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get("/tickets", (req, res) => {
    // for simplicity, return static ticket history
    const ticketHistory = [
        { event: "Event 1", date: "2023-01-01" },
        { event: "Event 2", date: "2023-01-01" },
    ];

    res.status(200).json(ticketHistory);
} );

module.exports = router;