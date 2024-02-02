const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

module.exports = connectDB;
