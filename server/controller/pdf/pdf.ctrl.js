const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = async (data, compressPdfPath) => {
    try {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(compressPdfPath));

            doc.text(data.text);

            doc.end();

            // Read the compressed PDF and resolve with the Buffer
            const compressedPdfBuffer = fs.readFileSync(compressPdfPath);
            resolve(compressedPdfBuffer);
        });
    } catch (error) {
        console.error('Error compressing PDF:', error);
        throw error;
    }
};