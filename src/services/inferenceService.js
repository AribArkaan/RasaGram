const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');

// File path to the JSON model
const jsonModelPath = path.resolve(__dirname, 'model_config1.json');

console.log(`JSON Model path: ${jsonModelPath}`);
let model;

// Load the model
const loadModel = async () => {
    try {
        if (fs.existsSync(jsonModelPath)) {
            console.log('JSON Model file exists');
            const modelJson = require(jsonModelPath);

            // Load the model using the new format
            model = await tf.loadLayersModel({
                modelTopology: modelJson,
            });

            console.log('Model loaded successfully from JSON');
        } else {
            console.error('JSON model file does not exist');
        }
    } catch (error) {
        console.error('Error loading model:', error.message);
        console.error(error.stack);
        throw new Error('Failed to load model');
    }
};


loadModel().then(() => {
    if (model) {
        console.log('Model is ready for predictions');
    } else {
        console.error('Model is not loaded properly');
    }
}).catch(error => {
    console.error('Error in loadModel:', error);
});

// Preprocess the image to the required format
const preprocessImage = (imageBuffer) => {
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]); // Assuming the model expects 224x224 images
    const normalizedImage = resizedImage.div(255.0); // Normalize to [0, 1]
    const batchedImage = normalizedImage.expandDims(0); // Add batch dimension
    return batchedImage;
};

// Function to process the image using the model
const processImage = async (filePath) => {
    if (!model) {
        try {
            await loadModel();
        } catch (error) {
            throw new Error('Failed to load model');
        }
    }

    if (!model) {
        throw new Error('Model is not loaded, cannot process image');
    }

    const imageBuffer = fs.readFileSync(filePath);
    const preprocessedImage = preprocessImage(imageBuffer);
    const prediction = model.predict(preprocessedImage);
    const labelId = prediction.argMax(-1).dataSync()[0];
    return labelId;
};

// Label dictionary and dish details (unchanged)
const labelDict = {
    0: 'ayam bakar', 1: 'ayam goreng', 2: 'bakso', 3: 'bakwan', 4: 'batagor',
    5: 'bihun', 6: 'capcay', 7: 'gado-gado', 8: 'ikan goreng', 9: 'kerupuk',
    10: 'martabak telur', 11: 'mie', 12: 'nasi goreng', 13: 'nasi putih',
    14: 'nugget', 15: 'opor ayam', 16: 'pempek', 17: 'rendang', 18: 'roti',
    19: 'sate', 20: 'sosis', 21: 'soto', 22: 'steak', 23: 'tahu', 24: 'telur',
    25: 'tempe', 26: 'terong balado', 27: 'tumis kangkung', 28: 'udang'
};

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

// Function to get dish details (unchanged)
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
