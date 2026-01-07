const mongoose = require('mongoose');

const workoutPlanExerciseSchema = new mongoose.Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
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
})
module.exports = mongoose.model('Exercise', workoutPlanExerciseSchema);