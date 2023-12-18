const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Mock database (replace this with database integration SOON!)
const users = [];
const secret_key = "yourSecretKey"; // Replace with a secure secret key for JWT

// Registration controller
exports.registerUser = async (req, res) => {
    try
    {
        const { username, password } = req.body;

        // Check if the username already exists
        if (users.some(user => user.username === username))
        {
            return res.status(400).json({ message: "Username already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        // Return success message (you might want to return a JWT token instead)
        res.status(201).json({ message: "User registered successfully." });
    }
    catch (error)
    {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

// Login controller
exports.loginUser = async (req, res) => {
    try
    {
        const { username, password } = req.body;

        // Check if the user exists
        const user = users.find(user => user.username === username);

        if (!user || !(await bcrypt.compare(password, user.password)))
        {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, secret_key, { expiresIn: "1h" });

        // Return success message and JWT token
        res.status(200).json({ message: "Login successful.", token });
    }
    catch (error)
    {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};