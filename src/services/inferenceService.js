// src/services/inferenceService.js

const fs = require('fs');
const path = require('path');

// Load the model
const modelPath = path.join(__dirname, '../data/best_model.json');
const modelData = JSON.parse(fs.readFileSync(modelPath, 'utf8'));

// Dummy function to simulate image processing using the model
const processImage = async (filePath) => {
    const image = fs.readFileSync(filePath);
    
    // Simulate a prediction. You need to replace this with actual model inference logic
    const labelId = Math.floor(Math.random() * 29); // Random label ID between 0 and 28
    
    return labelId;
};

// Label dictionary
const labelDict = {
    0: 'ayam bakar', 1: 'ayam goreng', 2: 'bakso', 3: 'bakwan', 4: 'batagor',
    5: 'bihun', 6: 'capcay', 7: 'gado-gado', 8: 'ikan goreng', 9: 'kerupuk',
    10: 'martabak telur', 11: 'mie', 12: 'nasi goreng', 13: 'nasi putih',
    14: 'nugget', 15: 'opor ayam', 16: 'pempek', 17: 'rendang', 18: 'roti',
    19: 'sate', 20: 'sosis', 21: 'soto', 22: 'steak', 23: 'tahu', 24: 'telur',
    25: 'tempe', 26: 'terong balado', 27: 'tumis kangkung', 28: 'udang'
};

// Dish details
const dishDetails = {
    'ayam bakar': {
        ingredients: ['chicken', 'soy sauce', 'garlic', 'shallots', 'turmeric', 'coriander', 'cumin', 'coconut milk'],
        method: 'Grill the marinated chicken over medium heat for 30 minutes.',
        cookTime: '45 minutes',
        estimatedCost: '$5'
    },
    'ayam goreng': {
        ingredients: ['chicken', 'flour', 'garlic', 'salt', 'pepper'],
        method: 'Fry the chicken pieces in hot oil until golden brown.',
        cookTime: '30 minutes',
        estimatedCost: '$4'
    },
    // Add details for other dishes...
};

const getDishDetails = (labelId) => {
    const dishName = labelDict[labelId];
    const details = dishDetails[dishName] || {};

    return {
        labelId,
        dishName,
        ingredients: details.ingredients || [],
        cookingInstructions: details.method || '',
        cookingTime: details.cookTime || '',
        estimatedCost: details.estimatedCost || ''
    };
};

module.exports = {
    processImage,
    getDishDetails
};