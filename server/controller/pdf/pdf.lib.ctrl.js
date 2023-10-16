const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');

const compressPdfLibFile = async (inputPath, outputfile) => {
    try {
        // Validate inputPath
        if (typeof inputPath !== 'string') {
            throw new Error('Invalid inputPath. It must be a string.');
        }

        // Read the original PDF file
        const pdfBytes = await fs.readFile(inputPath);

        // Load the original PDF document
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Create a new PDF document for compression
        const compressedPdfDoc = await PDFDocument.create();

        // Copy pages from the original document to the new document
        const pages = await compressedPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach((page) => compressedPdfDoc.addPage(page));

        // Save the compressed PDF to a buffer
        const compressedPdfBytes = await compressedPdfDoc.save();

        // Write the compressed PDF to the output file
        await fs.writeFile(outputfile, compressedPdfBytes);

        console.log('PDF compression complete.');
    } catch (error) {
        console.error('Error compressing PDF:', error.message);
    }
};

module.exports = {
    compressPdfLibFile
}