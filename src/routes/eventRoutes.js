const express = require("express");
const router = express.Router();

const events = [
    { id: 1, name: "Event 1", description: "Description for Event 1" },
    { id: 2, name: "Event 2", description: "Description for Event 2" },
];

/**
 * Get a list of events.
 * @route GET /events
 * @group Events - Operations related to events
 * @returns {Array.<object>} 200 - List of events.
 */

// Retrieve a list of events
router.get("/", (req, res) => {
    res.status(200).json(events);
});

module.exports = router;