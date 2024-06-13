const Photo = require('../models/photo');

const getPhoto = async (req, res) => {
    try {
        // Memanggil logika untuk mendapatkan foto dari database
        const photo = await Photo.getPhoto();
        res.json(photo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const uploadPhoto = async (req, res) => {
    const photoData = {
        user_id: req.body.user_id,
        filename: req.file.filename,
        path: req.file.path,
        description: req.body.description,
        url: req.body.url 
    };

    try {
        const photo = await Photo.createPhoto(photoData);
        res.status(201).json(photo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getPhoto,
    uploadPhoto,
};
