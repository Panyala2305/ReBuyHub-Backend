import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://re-buy-hub.vercel.app'],  // Your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowing these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowing specific headers
  credentials: true,  // This allows cookies to be sent if needed
  preflightContinue: false,  // Don't continue to the next middleware after preflight response
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// API routes
app.use('/api', authRoutes);

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    });
    
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
};

startServer();
