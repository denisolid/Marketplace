import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${password}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
    
    await mongoose.connect(uri);
    console.log('MongoDB Connected Successfully');
    
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;