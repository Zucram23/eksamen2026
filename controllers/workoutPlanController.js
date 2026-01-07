const WorkoutPlan = require('../models/workoutPlanModel');

exports.createWorkoutPlan = async (req, res) => {
    try {
        const workoutPlan = new WorkoutPlan(req.body);
        await workoutPlan.save();

        res.status(201).json({
            message: 'Workout plan created successfully',
            workoutPlan
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

exports.getWorkoutPlansByUser = async (req, res) => {
    try {
        const workoutPlans = await WorkoutPlan.find({ user: req.params.userId })
            .sort({ createdAt: -1 });
        res.json(workoutPlans);
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.getWorkoutPlanById = async (req, res) => {
    try {
        const workoutPlan = await WorkoutPlan.findById(req.params.id)
            .populate('user', 'name email');

        if (!workoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' });
        }

        res.json(workoutPlan);
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.updateWorkoutPlan = async (req, res) => {
    try {
        const workoutPlan = await WorkoutPlan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!workoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' });
        }

        res.json({ message: 'Workout plan updated successfully', workoutPlan });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.deleteWorkoutPlan = async (req, res) => {
    try {
        const workoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);

        if (!workoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' });
        }

        res.json({ message: 'Workout plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};