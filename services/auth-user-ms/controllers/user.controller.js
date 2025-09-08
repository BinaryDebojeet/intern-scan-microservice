import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

// A helper function to set the JWT cookie via the gateway
const generateAndSetToken = (res, user) => {
    const payload = { userId: user.userId, role: user.role, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the cookie directly. The gateway will pass it through.
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    });
};

// Main authentication logic (login/register)
export const authenticateUser = async (req, res) => {
    const { event, mode, email, password, mobile, country_code, passcode } = req.body;
    
    try {
        let user;
        const query = mode.includes('email') ? { email } : { mobile };
        user = await User.findOne(query);

        if (event === 'register') {
            if (user) return res.status(400).json({ message: 'User already exists.' });
            
            const newUser = new User({
                userId: randomUUID(),
                email: email || null,
                mobile: mobile || null,
                countryCode: country_code || null,
                password: password || null,
                passwordSet: !!password,
                emailVerified: mode.includes('email'),
                mobileVerified: mode.includes('mobile'),
            });
            user = await newUser.save();
        } else { // login
            if (!user) return res.status(404).json({ message: 'User not found.' });

            if (mode.includes('password')) {
                const isMatch = await user.comparePassword(password);
                if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });
            }
            // For OTP mode, we assume passcode was validated by a previous step
        }

        generateAndSetToken(res, user);

        res.status(200).json({
            status: 'success',
            code: 200,
            data: {
                user_id: user.userId
            }
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Send OTP
export const sendOtp = (req, res) => {
    // In a real app, you would integrate Twilio, SendGrid, etc. here.
    console.log('Sending OTP to:', req.body);
    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            message: "OTP sent successfully",
            expires_in: 300,
            passcode: "10069a2b1238" // Mock passcode for testing
        }
    });
};

// Verify OTP
export const verifyOtp = (req, res) => {
    // In a real app, you'd check the passcode against a stored value (e.g., in Redis)
    console.log('Verifying OTP with passcode:', req.body.passcode);
    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            message: "OTP verified successfully",
            passcode: req.body.passcode
        }
    });
};

// Get User Details
export const getUserDetails = async (req, res) => {
    const { 'user-id': userId } = req.params;
    try {
        const user = await User.findOne({ userId }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                "user-id": user.userId,
                "profile-photo": user.profilePhoto,
                "email": user.email,
                "email-verified": user.emailVerified,
                "mobile": user.mobile,
                "country-code": user.countryCode,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "dob": user.dob,
                "passwordSet": user.passwordSet,
                "created-at": user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Update User Details
export const updateUserDetails = async (req, res) => {
    const { 'user-id': userId } = req.params;
    const { 'profile-photo': profilePhoto, lastName, dob } = req.body;
    
    try {
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { profilePhoto, lastName, dob },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                "user-id": updatedUser.userId,
                "profile-photo": updatedUser.profilePhoto,
                "lastName": updatedUser.lastName,
                "dob": updatedUser.dob,
                "message": "user details updated successfully"
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    const { 'user-id': userId } = req.params;
    try {
        const result = await User.deleteOne({ userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                message: "user deleted successfully"
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Manage Passwords
export const managePassword = async (req, res) => {
    const { event, 'new-password': newPassword } = req.body;
    // In a real scenario, you'd find the user via their authenticated session (JWT)
    // and then perform the password action (set, update, reset).
    console.log(`Password event '${event}' triggered.`);
    
    // Mocked success response
    const messageMap = {
        reset: "Password reset successfully",
        update: "Password updated successfully",
        set: "Password set successfully"
    };

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            message: messageMap[event] || "Password action processed."
        }
    });
};
