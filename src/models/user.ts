import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a full name'],
		index: true,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model<IUser & mongoose.Document>('User', User);
