// Import required modules
const express = require("express");
const multer = require('multer');
const BaseRouter = require('./router'); // Assuming you have a router module named 'router'

// Define the init function
function init() {
    // Create an Express app
    const app = express();

    // Configure middleware for handling URL-encoded and JSON data
    app.use(express.static('public'));
    app.use(express.raw({ type: 'application/pdf' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Use the BaseRouter for routes under the '/api' path
    app.use('/api', BaseRouter);

    // error management
    // Multer error handling middleware
    app.use((err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Multer error', details: err.message });
        }
        next(err);
    });

    return app;
}

// Export the init function
module.exports = init;
