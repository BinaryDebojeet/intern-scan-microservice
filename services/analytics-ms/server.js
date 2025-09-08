import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// POST /api/v1/dashboard
app.post('/api/v1/dashboard', (req, res) => {
    console.log("Dashboard data requested with filters:", req.body);
    
    // This is the exact mock data structure you provided.
    const dashboardData = {
        filters: {
            dateRange: {
                type: req.body.date_range.type,
                from: req.body.date_range.from,
                to: req.body.date_range.to
            }
        },
        summary: {
            totalQRCodes: 6,
            totalScans: 152,
            totalUniqueScans: 42,
            totalVisits: 236
        },
        charts: {
            scansByOS: [
                { os: "Android", count: 80 },
                { os: "iOS", count: 50 },
                { os: "Windows", count: 22 }
            ],
            scansByCountry: [
                { country: "USA", count: 60 },
                { country: "India", count: 40 },
                { country: "UK", count: 30 },
                { country: "Other", count: 22 }
            ],
            scansByCity: [
                { city: "New York", count: 20 },
                { city: "London", count: 15 },
                { city: "Delhi", count: 10 },
                { city: "Other", count: 107 }
            ],
            scanActivity: [
                { datetime: "2025-08-01T00:00:00Z", count: 500 },
                { datetime: "2025-08-02T00:00:00Z", count: 1000 },
                { datetime: "2025-08-03T00:00:00Z", count: 2000 }
            ],
            scansByBrowser: [
                { browser: "Chrome", count: 100 },
                { browser: "Safari", count: 30 },
                { browser: "Firefox", count: 22 }
            ],
            scansByQRName: [
                { qrName: "QR 1", count: 60 },
                { qrName: "QR 2", count: 40 },
                { qrName: "QR 3", count: 52 }
            ],
            scansByTimeOfDay: [
                { timeUTC: "2025-08-01T09:00:00Z", count: 10 },
                { timeUTC: "2025-08-01T12:00:00Z", count: 30 },
                { timeUTC: "2025-08-01T15:00:00Z", count: 50 }
            ]
        }
    };

    res.status(200).json({
        status: "success",
        code: 200,
        data: dashboardData
    });
});

app.listen(PORT, () => {
    console.log(`Analytics Service running on port ${PORT}`);
});
