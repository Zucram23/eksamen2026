const mongoose = require('mongoose');

const workoutPlanExerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true,
        min: 1
    },
    reps: {
        type: Number,
        required: true,
        min: 1
    },
    restTime: {
        type: Number,
        default: 60
    },
    notes: {
        type: String,
    }
});

const workoutPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    workoutType: {
        type: String,
        enum: ['strength', 'cardio', 'flexibility', 'mixed'],
        default: 'mixed'
    },
    exercises: [workoutPlanExerciseSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

workoutPlanSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);