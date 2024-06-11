const getIngredients = (req, res) => {
    // Logic to get ingredients from database
    res.json({ message: "Get all ingredients" });
};

const createIngredient = (req, res) => {
    // Logic to create a new ingredient
    res.json({ message: "Ingredient created" });
};

module.exports = {
    getIngredients,
    createIngredient,
};
