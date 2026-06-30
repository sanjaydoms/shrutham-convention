# 🎉 Shrutham Convention

> Premier Event Venue Website - Weddings, Corporate Events, and Grand Celebrations in Hyderabad

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **Stunning UI** - Modern, responsive design with elegant animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- 📝 **Contact Form** - Submit enquiries with backend API
- 🖼️ **Gallery** - Beautiful image gallery with lightbox
- ⭐ **Testimonials** - Auto-rotating client testimonials
- 📅 **Events** - Upcoming events showcase
- 🎭 **Services** - Detailed service offerings
- 🔍 **SEO Ready** - Optimized for search engines

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/shrutham-convention.git
cd shrutham-convention

# Install dependencies
npm install

# Start the server
npm start

# Or for development with auto-reload
npm run dev
```

The website will be available at `http://localhost:3000`

## 📁 Project Structure

```
shrutham-convention/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # Frontend JavaScript
├── backend/
│   ├── server.js           # Express server
│   └── data/               # Data storage (JSON files)
├── package.json            # Node.js dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get single event |
| GET | `/api/enquiries` | Get all enquiries |
| POST | `/api/contact` | Submit new enquiry |
| PATCH | `/api/enquiries/:id` | Update enquiry status |
| DELETE | `/api/enquiries/:id` | Delete enquiry |

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #1a1a2e;
    --accent: #e94560;
    --gold: #c9a227;
}
```

### Images
Replace image URLs in `index.html` with your own images.

### Content
Update text content directly in `index.html`.

## 📝 Contact Form

The contact form submits to `/api/contact` endpoint. Data is stored in `backend/data/enquiries.json`.

For production, consider connecting to:
- MongoDB
- MySQL
- PostgreSQL
- Firebase

## 🌐 Deployment

### Deploy to Render/Railway/Heroku
1. Push code to GitHub
2. Connect your repository to the platform
3. Set environment variables if needed
4. Deploy!

### Deploy to VPS/Dedicated Server
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start backend/server.js --name "shrutham-convention"

# Save PM2 config
pm2 save
pm2 startup
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support, email info@shruthamconvention.com or visit our website.

---

Made with ❤️ by Shrutham Convention Team
