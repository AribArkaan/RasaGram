const fs = require('fs');
const path = require('path');

const loadJsonFile = (filename) => {
    const filePath = path.join(__dirname, '../data', filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
};

module.exports = {
    loadJsonFile,
};
