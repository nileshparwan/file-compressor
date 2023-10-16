const { Router } = require('express');
const imageRoutes = require('./image');
const pdfRoutes = require('./pdf');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: "ok"
    });
});

router.use('/image', imageRoutes);
router.use('/pdf', pdfRoutes);

module.exports = router;