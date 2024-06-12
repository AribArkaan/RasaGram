const { loadJsonFile } = require('../utils/jsonLoader');
const Recommendation = require('../models/recommendation');

exports.getBestModel = (req, res) => {
    try {
        const bestModel = loadJsonFile('best_model.json');
        res.status(200).json(bestModel);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load best model' });
    }
};

exports.createRecommendation = async (req, res) => {
    const recommendationData = {
        photo_id: req.body.photo_id,
        dish_id: req.body.dish_id,
    };

    try {
        const recommendation = await Recommendation.createRecommendation(recommendationData);
        res.status(201).json(recommendation);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create recommendation' });
    }
};

exports.getRecommendationsByPhotoId = async (req, res) => {
    try {
        const recommendations = await Recommendation.getRecommendationsByPhotoId(req.params.photoId);
        res.status(200).json(recommendations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};
