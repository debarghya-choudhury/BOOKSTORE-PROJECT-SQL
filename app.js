const express = require('express');
const app = express();
const sequelize = require('./config/database');
const config = require('./config/config');
const cors = require('cors');

const port = process.env.PORT || 3000; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const routes = require('./routes/allRoutes'); 
app.use('/api', routes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API!');
});

// Database Connection
sequelize.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Database connection error:', err));

// Initializing Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
