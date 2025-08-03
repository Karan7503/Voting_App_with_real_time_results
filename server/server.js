require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');

//Route imports
const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');
const testRoutes = require('./routes/testRoutes');
const candidateRoutes = require('./routes/candidateRoutes');



// middleware
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',  // allow frontend to access
  credentials: true
}));


// Routes
app.use('/api/v1/candidate', candidateRoutes);
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vote', voteRoutes);

app.get('/api/test', (req, res) => {
  res.json({ msg: 'API working!' });
});

// // Fallback Route
app.all('/*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// Connect to DB and start server
const PORT = process.env.PORT || 5000;

const start = async ()=>{
    try{
        await connectDB();
        
        app.listen(PORT, ()=>{
            console.log(`Sever running on http://localhost:${PORT}`);
        });
    }catch(error){
        console.log('Failed to start server:', error);
        process.exit(1);
    }
};

start();





