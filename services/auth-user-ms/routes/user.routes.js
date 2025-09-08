import express from 'express';
import {
    authenticateUser,
    sendOtp,
    verifyOtp,
    getUserDetails,
    updateUserDetails,
    deleteUser,
    managePassword
} from '../controllers/user.controller.js';

const router = express.Router();

// Base auth route for login/register
// POST /api/v1/auth
router.post('/auth', authenticateUser);

// OTP routes
// POST /api/v1/auth/send-otp
router.post('/auth/send-otp', sendOtp);

// POST /api/v1/auth/verify-otp
router.post('/auth/verify-otp', verifyOtp);

// User profile routes with URL parameters
// GET /api/v1/users/user/:user-id
router.get('/users/user/:user-id', getUserDetails);

// PUT /api/v1/users/user/:user-id
router.put('/users/user/:user-id', updateUserDetails);

// DELETE /api/v1/users/user/:user-id
router.delete('/users/user/:user-id', deleteUser);

// Password management
// PUT /api/v1/auth/password
router.put('/auth/password', managePassword);


export default router;
