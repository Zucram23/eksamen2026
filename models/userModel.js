// models/User.js
// Model der beskriver User-strukturen i databasen.
// Indeholder schema og regler for hvordan brugere gemmes.
// Hører til Model-laget i MVC.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        age: Number,
        weight: Number,
        height: Number,
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        fitnessGoal: {
            type: String,
            enum: ['weightloss', 'musclebuild-up', 'strength', 'condition']
        }
    }
})
module.exports = mongoose.model('User', userSchema);