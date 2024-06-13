const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');
const dishRoutes = require('./routes/dishRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const foodRoutes = require('./routes/foodRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Ensure connection is established before using routes
connectDB().then((connection) => {
    app.use((req, res, next) => {
        req.db = connection;
        next();
    });

    app.use('/users', userRoutes);
    app.use('/photos', photoRoutes);
    app.use('/dishes', dishRoutes);
    app.use('/ingredients', ingredientRoutes);
    app.use('/foods', foodRoutes);
    app.use('/recommendations', recommendationRoutes);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
});
