const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

// Data storage file
const DATA_FILE = path.join(__dirname, 'data', 'enquiries.json');
const EVENTS_FILE = path.join(__dirname, 'data', 'events.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Initialize data files
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}
if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify([
        {
            id: 1,
            title: 'Grand Wedding Expo 2024',
            date: '2024-07-15',
            description: 'Join us for the biggest wedding expo showcasing top vendors and planners.',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
            time: '10:00 AM - 8:00 PM',
            guests: '500+ Expected',
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'Corporate Leadership Summit',
            date: '2024-08-20',
            description: 'Annual leadership summit featuring industry experts and networking sessions.',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
            time: '9:00 AM - 6:00 PM',
            guests: '300+ Attendees',
            status: 'upcoming'
        },
        {
            id: 3,
            title: 'Diwali Celebration Night',
            date: '2024-11-01',
            description: 'Experience the magic of Diwali with cultural performances and grand feast.',
            image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600',
            time: '6:00 PM - 12:00 AM',
            guests: '1000+ Guests',
            status: 'upcoming'
        }
    ]));
}

// ========== API ROUTES ==========

// Get all enquiries
app.get('/api/enquiries', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Submit new enquiry
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, phone, eventType, eventDate, message } = req.body;

        // Validation
        if (!name || !email || !phone || !eventType || !eventDate) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please fill in all required fields' 
            });
        }

        // Read existing data
        const enquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        // Create new enquiry
        const newEnquiry = {
            id: Date.now(),
            name,
            email,
            phone,
            eventType,
            eventDate,
            message: message || '',
            status: 'new',
            createdAt: new Date().toISOString()
        };

        enquiries.push(newEnquiry);

        // Save to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2));

        res.json({ 
            success: true, 
            message: 'Enquiry submitted successfully!',
            data: newEnquiry 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get all events
app.get('/api/events', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get single event
app.get('/api/events/:id', (req, res) => {
    try {
        const events = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
        const event = events.find(e => e.id === parseInt(req.params.id));

        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update enquiry status
app.patch('/api/enquiries/:id', (req, res) => {
    try {
        const { status } = req.body;
        const enquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const index = enquiries.findIndex(e => e.id === parseInt(req.params.id));

        if (index === -1) {
            return res.status(404).json({ success: false, error: 'Enquiry not found' });
        }

        enquiries[index].status = status || enquiries[index].status;
        enquiries[index].updatedAt = new Date().toISOString();

        fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2));

        res.json({ success: true, data: enquiries[index] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete enquiry
app.delete('/api/enquiries/:id', (req, res) => {
    try {
        let enquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        enquiries = enquiries.filter(e => e.id !== parseInt(req.params.id));

        fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2));

        res.json({ success: true, message: 'Enquiry deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Shrutham Convention Server running on port ${PORT}`);
    console.log(`📁 API endpoints:`);
    console.log(`   GET  /api/health`);
    console.log(`   GET  /api/events`);
    console.log(`   GET  /api/enquiries`);
    console.log(`   POST /api/contact`);
});

module.exports = app;
