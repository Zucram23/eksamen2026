const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');


const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(logger);


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
app.use(errorHandler);

connectDB();
app.listen(port, () => console.log('Server klar på http://localhost:3000'));