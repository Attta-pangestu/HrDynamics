import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.json({ success: false, error: 'Login failed' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ 
                success: false, 
                error: 'Email already registered' 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: role || 'employee'
        });

        await newUser.save();

        res.json({
            success: true,
            message: 'Registration successful'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.json({ 
            success: false, 
            error: 'Registration failed. Please try again.' 
        });
    }
});

// Verify route
router.get('/verify', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, error: 'Verification failed' });
    }
});

export default router;