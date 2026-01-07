// server.js
// App- og server-entry point.
// Ansvarlig for at konfigurere Express, middleware, routes og starte serveren.
// Hører til "Controller-laget" i MVC, da den håndterer routing og request-flow.


const express = require('express');
const { connectDB } = require('./db');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');
const path = require('path');


const app = express();
const port = 3000;


app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/userRoutes');
const workoutPlanRoutes = require('./routes/workoutPlanRoutes');

app.use('/api/users', userRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'FitTracker API is running!',
        endpoints: {
            users: '/api/users',
            workoutPlans: '/api/workout-plans'
        }
    });
});
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

connectDB();
app.listen(port, () => console.log('Server klar på http://localhost:3000'));