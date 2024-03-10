const app = require('./config/express');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
    console.log('Connected to database');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
