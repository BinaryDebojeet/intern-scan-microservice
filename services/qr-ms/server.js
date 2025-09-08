import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// --- Mongoose Model ---
const qrCodeSchema = new mongoose.Schema({
    // Define schema based on your POST request body
    name: String,
    type: String,
    // ... add all other fields from the Postman request body
}, { timestamps: true });
const QRCode = mongoose.model('QRCode', qrCodeSchema);


// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected to QR DB.'))
    .catch((err) => console.error('MongoDB connection error:', err));


// --- Routes and Controllers ---
const router = express.Router();

// GET /api/v1/qr - List all QR codes
router.get('/', async (req, res) => {
    // This mocks the response from your Postman collection.
    // TODO: Implement actual database query with pagination and sorting.
    const mockData = [
        { id: 1, qr_code_name: "Restaurant Menu", qr_code_type: "PDF" },
        { id: 2, qr_code_name: "Event Ticket", qr_code_type: "Image" }
    ];
    res.status(200).json({
        status: 'success',
        code: 200,
        data: mockData,
        pagination: { page: 1, limit: 10, total: 2, total_pages: 1 }
    });
});

// POST /api/v1/qr - Create a QR Code
router.post('/', async (req, res) => {
    try {
        console.log('Received data to create QR Code:', req.body);
        // const newQRCode = new QRCode(req.body);
        // await newQRCode.save(); // Uncomment to save to DB
        res.status(200).json({
            status: "success",
            code: 200,
            data: { message: "QR created successfully" }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


app.use('/api/v1/qr', router);

app.listen(PORT, () => {
    console.log(`QR Code Service running on port ${PORT}`);
});