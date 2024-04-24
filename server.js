const app = require('./config/express');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

db.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});