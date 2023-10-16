const fs = require('fs-extra');
const path = require('path');

module.exports = (sourcePath, destinationPath, fileName) => {
    // Create the destination folder if it doesn't exist
    fs.ensureDirSync(destinationPath);
    // Copy the file
    fs.copySync(sourcePath, path.join(destinationPath, fileName));

    console.log('File copied successfully');
};