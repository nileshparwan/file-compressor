const sharp = require('sharp');
const fs = require('fs').promises;

async function sharpImageCompressor(inputImagePath, outputImagePath) {
    const inputImageBuffer = await fs.readFile(inputImagePath);
    try {
        // Determine the input image format (JPEG or PNG)
        const imageInfo = await sharp(inputImageBuffer).metadata();
        const imageFormat = imageInfo.format.toLowerCase();

        // Compress the image and convert it to Buffer
        const outputImageBuffer = await sharp(inputImageBuffer)
            .toFormat(imageFormat)
            .jpeg({ quality: 80 })
            .png({ compressionLevel: 9 })
            .toBuffer();

        // write file to new folder
        fs.writeFile(outputImagePath, outputImageBuffer);

        return outputImageBuffer;
    } catch (err) {
        console.error(err);
    }
}

module.exports = sharpImageCompressor;
