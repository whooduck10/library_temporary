require('dotenv').config();
const mongoose = require('mongoose');
const seedDatabase = require('./data/seedData');

// Connect to MongoDB first
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/library_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('Connected to MongoDB');
    // Run the seed function
    return seedDatabase();
})
.then(() => {
    console.log('Seeding completed');
    process.exit(0);
})
.catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
}); 