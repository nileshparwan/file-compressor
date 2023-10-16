const { Router } = require('express');
const pdfParse = require('pdf-parse');
const path = require('path');
const { fileUpload } = require('../../middleware/fileUpload');
const compressPDF = require('../../controller/pdf/pdf.ctrl');
const { copy } = require('../../utils/copy');
const { compressPDFZlib } = require('../../controller/pdf/pdf.zlib.ctrl');
const { compressPdfLibFile } = require('../../controller/pdf/pdf.lib.ctrl');
const fs = require('fs').promises;

const fileUploadMiddleware = (newPath) => fileUpload({ diskStoragePath: newPath, isMemory: false });
const uploadFile = (newPath) => fileUploadMiddleware(newPath).single('file');
const router = Router();

router.post('/pdfkit/compress', uploadFile("../public/pdf/pdfkit/uploads"), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("Invalid or empty PDF file");
        }

        const fileName = req.file.filename;
        const copyImagePath = path.join(__dirname, '../../public/pdf/pdfkit/compress');
        const filePath = fs.readFileSync(req.file.path);
        copy(filePath, copyImagePath, fileName);

        const data = await pdfParse(req.file.path);
        const compressedPdfBuffer = await compressPDF(data, `${copyImagePath}/${fileName}`);

        res.status(200).json({ compressedPdfBuffer });
    } catch (error) {
        console.error('Error compressing PDF:', { message: error.message, stack: error.stack });
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

router.post('/pdflib/compress', uploadFile("../public/pdf/pdflib/uploads"), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("Invalid or empty PDF file");
        }

        const fileName = req.file.filename;
        const copyPdfFolder = path.join(__dirname, '../../public/pdf/pdflib/compress');
        const outputPdfGz = `${copyPdfFolder}/${fileName}`;

        await compressPdfLibFile(req.file.path, outputPdfGz);
        res.status(200).json({ message: "pdf compressed successfully" });

    } catch (error) {
        console.error('Error compressing PDF:', { message: error.message, stack: error.stack });
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

router.post('/zlib/compress', uploadFile("../public/pdf/zlib/uploads"), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("Invalid or empty PDF file");
        }

        const fileName = req.file.filename;
        const copyPdfFolder = path.join(__dirname, '../../public/pdf/zlib/compress');
        const outputPdfGz = `${copyPdfFolder}/${fileName}.gz`;

        await compressPDFZlib(req.file.path, outputPdfGz);
        res.status(200).json({ message: "pdf compressed successfully" });

    } catch (error) {
        console.error('Error compressing PDF:', { message: error.message, stack: error.stack });
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});


module.exports = router;