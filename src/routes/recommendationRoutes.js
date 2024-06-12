const express = require('express');
const router = express.Router();
const recommendationHandler = require('../handlers/recommendationHandler');

router.get('/best-model', recommendationHandler.getBestModel);

router.post('/', recommendationHandler.createRecommendation);

router.get('/:photoId', recommendationHandler.getRecommendationsByPhotoId);

module.exports = router;
