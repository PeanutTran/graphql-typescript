import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { Logger } from 'winston';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
	const logger: Logger = Container.get('logger');
	try {
		const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
		const userRecord = await UserModel.findById(req.token._id);
		if (!userRecord) {
			req.isAuth = false;
			return res.sendStatus(401);
		}
		const currentUser = userRecord.toObject();
		Reflect.deleteProperty(currentUser, 'password');
		req.isAuth = true;
		if (req.baseUrl.split('/').includes('graphql')) {
			req.currentUser = currentUser;
			return next();
		}
		req.currentUser = currentUser;
		return next();
	} catch (e) {
		logger.error('🔥 Error attaching user to req: %o', e);
		return next(e);
	}
};

export default attachCurrentUser;
