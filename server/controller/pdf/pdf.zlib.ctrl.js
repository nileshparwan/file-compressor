const fs = require('fs');
const zlib = require('zlib');

const compressPDFZlib = (inputPath, outputPdfGz) => {
    try {
        // Read the original PDF file
        const pdfBuffer = fs.readFileSync(inputPath);

        // Compress the PDF buffer using zlib asynchronously
        const compressedPdfBuffer = zlib.gzipSync(pdfBuffer);

        // Write the compressed PDF to the output file
        fs.writeFileSync(outputPdfGz, compressedPdfBuffer);
    } catch (error) {
        console.log('Error compressing PDF:', error);
    }
};

module.exports = {
    compressPDFZlib
}