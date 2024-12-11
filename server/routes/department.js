import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Department from '../models/departmentModel.js';  // Updated path to match actual filename

const router = express.Router();

// Get all departments
router.get('/', authMiddleware, async (req, res) => {
    try {
        const departments = await Department.find();
        res.json({
            success: true,
            departments
        });
    } catch (error) {
        res.json({
            success: false,
            error: 'Failed to fetch departments'
        });
    }
});

// Create department
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newDepartment = new Department(req.body);
        await newDepartment.save();
        res.json({
            success: true,
            department: newDepartment
        });
    } catch (error) {
        res.json({
            success: false,
            error: 'Failed to create department'
        });
    }
});

// Update department
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({
            success: true,
            department
        });
    } catch (error) {
        res.json({
            success: false,
            error: 'Failed to update department'
        });
    }
});

// Delete department
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Department deleted successfully'
        });
    } catch (error) {
        res.json({
            success: false,
            error: 'Failed to delete department'
        });
    }
});

export default router;