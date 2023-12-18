// Import necessary modules and the route files
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const eventsRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

// Create an Express application instance as a server
const app = express();

// Add middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the defined routes for authentication and events
app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);
app.use("/tickets", ticketRoutes);

// Start the server, listen on the specified port, and log a message to the console.
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});

// Close the server function
function closeServer(callback) {
    server.close(callback);
  }

// Export the Express application for testing purposes
module.exports = app;
module.exports.closeServer = closeServer;