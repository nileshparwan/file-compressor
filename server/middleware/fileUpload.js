const multer = require('multer');
const path = require('path');

const fileUpload = ({ diskStoragePath, isMemory = false }) => {
    let storage;
    const inputImagePath = path.join(__dirname, diskStoragePath);

    if (isMemory) {
        storage = multer.memoryStorage();
    } else {
        storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, inputImagePath);
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            },
        });
    }

    const fileFilter = (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF and image files are allowed.'), false);
        }
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 1024 * 1024 * 7 }, // 7mb
    });
};

module.exports = {
    fileUpload
};