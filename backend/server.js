require('dotenv').config(); // Load environment variables at the start
const express = require('express');
const cors = require('cors');
const app = express();
const youtubeRoutes = require('./routes/youtubeRoutes');
// Middleware
app.use(cors());
app.use(express.json()); // ✅ Add this to parse JSON requests
app.use('/api/youtube', youtubeRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
