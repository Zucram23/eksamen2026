// controllers/userController.js
// Controller som indeholder forretningslogik for brugere.
// Modtager requests fra routes og kommunikerer med User-modellen.
// Hører til Controller-laget i MVC.

const User = require('../models/userModel');
const { hashPassword } = require('../utils/bcrypt');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    try {
        const { name, email, password, profile } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }


        const hashedPassword = await hashPassword(password);


        const user = new User({
            name,
            email,
            password: hashedPassword,
            profile: profile || {}
        });

        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};