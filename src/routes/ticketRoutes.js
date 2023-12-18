const express = require("express");
const router = express.Router();

/**
 * Handle the process of selecting and purchasing a ticket
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

router.post("/purchase", (req, res) => {
    // Extract ticket information from the request body
    const { ticketType, quantity, paymentMethod } = req.body;

    // For simplicity, generate a random confirmation code
    const confirmationCode = Math.random().toString(36).substring(7);

    // Return a confirmation response with the generated code
    res.status(200).json({ confirmationCode });
});

// Export the router for use in the Express app
module.exports = router;