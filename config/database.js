import mongoose from 'mongoose';

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('DATABASE CONNECTION FAILED: ',err.message));

}

export default connectDB;