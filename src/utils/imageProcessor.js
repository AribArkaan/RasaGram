const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.detectFood = async (photoPath) => {
    // Tambahkan logika deteksi makanan Anda di sini
    // Misalnya, panggil model machine learning Anda untuk mendeteksi makanan dari photoPath
    return 'Dummy Food'; // Hapus ini dan ganti dengan hasil deteksi sebenarnya
};

module.exports = upload;
