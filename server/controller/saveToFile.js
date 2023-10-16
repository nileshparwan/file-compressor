const fs = require('fs').promises;
module.exports = async (buffer, filePath) => {
    await fs.writeFile(filePath, buffer);
    console.log(`PDF saved to: ${filePath}`);
};