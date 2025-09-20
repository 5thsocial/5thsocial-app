import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

const logger = new Logger('DatabaseConnection');

export const connectDB = async () => {
    try {
        logger.log("Attempting to connect to MongoDB...");
        
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        
        const conn = await mongoose.connect(mongoUri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            bufferCommands: true
        });
        
        logger.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error("Error connecting to MongoDB:", errorMessage);
        throw error;
    }
};

mongoose.connection.on("connected", () => {
    logger.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    logger.error("Error connecting to MongoDB", err);
});

mongoose.connection.on("disconnected", () => {
    logger.log("MongoDB disconnected");
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    logger.log('MongoDB connection closed through app termination');
    process.exit(0);
});

export { mongoose };