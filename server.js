// Import necessary modules and the route files
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const eventsRoutes = require("./src/routes/eventRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");
const userRoutes = require("./src/routes/userRoutes");
const path = require("path");
const cors = require("cors");

// Create an Express application instance as a server
const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Add middleware to parse incoming JSON requests
app.use(bodyParser.json());


// app.use(cors({
//     origin: "http://localhost:3000"
// }));

// Handle all other routes (*) by sending the 'index.html' file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Use the defined routes for authentication and events
app.use("/auth", authRoutes);
// app.use("/events", eventsRoutes);
// app.use("/tickets", ticketRoutes);
// app.use("/user", userRoutes);

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