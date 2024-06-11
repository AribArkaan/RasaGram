const express = require('express');
const recommendationHandler = require('../handlers/recommendationHandler');

const router = express.Router();

router.post('/', recommendationHandler.createRecommendation);
router.get('/:photoId', recommendationHandler.getRecommendationsByPhotoId);

module.exports = router;
