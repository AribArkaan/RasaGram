const fs = require('fs');

// Dummy model 
const dummyModel = (image) => {
    
    return Math.floor(Math.random() * 29); // Random label ID antara 0 sampai 28
};

const processImage = async (filePath) => {
    const image = fs.readFileSync(filePath);
    const labelId = dummyModel(image);
    return labelId;
};

module.exports = processImage;