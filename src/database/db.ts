import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl: string = process.env.MONGO_URL ?? '';

export const connect = async (): Promise<void> => {
	await mongoose.connect(`${mongoUrl}`);
};

export const disconnect = async (): Promise<void> => {
	await mongoose.disconnect();
};
