const Photo = require('../models/photo');

exports.processPhoto = async (req, res) => {
    const photoData = {
        user_id: req.body.user_id,
        filename: req.file.filename, 
        path: req.file.path,
    };

    try {
        const photo = await Photo.createPhoto(photoData); 
        res.status(201).json(photo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save photo' });
    }
};
