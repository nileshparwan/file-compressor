const { Router } = require('express');
const path = require('path');
const sharpImageCompressor = require('../../controller/image/sharpImageCompressor.ctrl');
const copyImage = require('../../controller/image/copyImage.ctl');
const { fileUpload } = require('../../middleware/fileUpload');

const router = Router();
const fileUploadMiddleware = fileUpload({ diskStoragePath: "../public/image/uploads", isMemory: false });
const uploadFile = () => fileUploadMiddleware.single('file');

router.post('/sharp', uploadFile(), async (req, res) => {
    if (req.file) {
        const fileName = req.file.filename;
        const copyImagePath = path.join(__dirname, '../../public/image/compress');
        const copyImagePathAndFileName = `${copyImagePath}/${fileName}`;
        copyImage(req.file.path, copyImagePath, fileName);

        const compressedImage = await sharpImageCompressor(copyImagePathAndFileName, copyImagePathAndFileName);
        res.json({ before: req.file, after: compressedImage });
    } else {
        return res.status(400).json({ message: 'Could not upload the file' });
    }
});

module.exports = router;