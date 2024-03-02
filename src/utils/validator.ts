import Joi from 'joi';
import type { IError, IErrorFormatted, ITodo } from '../interfaces';

export const todoSchema = Joi.object<ITodo>({
	title: Joi.string().min(5).required(),
	description: Joi.string().min(5).required(),
	complete: Joi.boolean().required(),
});

export const getErrors = (errors: IError[]): IErrorFormatted[] => {
	const errArr: IErrorFormatted[] = [];
	errors.map((error) =>
		errArr.push({
			key: `${error.context.key}`,
			message: error.message,
		}),
	);
	return errArr;
};
