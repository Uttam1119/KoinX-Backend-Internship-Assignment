// Connect to MongoDB
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
          })
          console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}
module.exports = {connectDB}