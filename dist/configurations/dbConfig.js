"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.connectDB = void 0;
const mongoose = __importStar(require("mongoose"));
exports.mongoose = mongoose;
const dotenv = __importStar(require("dotenv"));
const common_1 = require("@nestjs/common");
dotenv.config();
const logger = new common_1.Logger('DatabaseConnection');
const connectDB = async () => {
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
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error("Error connecting to MongoDB:", errorMessage);
        throw error;
    }
};
exports.connectDB = connectDB;
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
//# sourceMappingURL=dbConfig.js.map