import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
	/**
	 * Your favorite port
	 */
	port: parseInt(process.env.PORT, 10),

	/**
	 * That long string from mlab
	 */
	databaseURL: process.env.MONGODB_URI,

	/**
	 * Your secret sauce
	 */
	jwtSecret: process.env.JWT_SECRET,

	/**
	 * Used by winston logger
	 */
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},

	/**
	 * API configs
	 */
	api: {
		prefix: '/',
	},
};
