// Another file that uses your Express app
const dotenv = require('dotenv');
const init = require('./server'); // Adjust the path accordingly

// Call the init function to get the configured Express app
const app = init();
dotenv.config();

// Start the server
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
