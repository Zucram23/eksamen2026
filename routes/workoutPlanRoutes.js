// routes/workoutPlanRoutes.js
// Definerer API-endpoints for workout plans.
// Sender requests videre til workoutPlanController.
// Hører til Controller-laget i MVC.

const express = require('express');
const router = express.Router();
const workoutPlanController = require('../controllers/workoutPlanController');


router.post('/', workoutPlanController.createWorkoutPlan);
router.get('/user/:userId', workoutPlanController.getWorkoutPlansByUser);
router.get('/:id', workoutPlanController.getWorkoutPlanById);
router.put('/:id', workoutPlanController.updateWorkoutPlan);
router.delete('/:id', workoutPlanController.deleteWorkoutPlan);

module.exports = router;