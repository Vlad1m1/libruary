import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/ApiError';

export default function validatorMiddleware(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = ApiError.Custom('VALIDATION_ERROR');
		error.errors = errors.array();
		return next(error);
	}
	next();
}
