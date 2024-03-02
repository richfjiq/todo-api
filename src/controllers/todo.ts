import type { Request, Response } from 'express';

import { db } from '../database';
import { Todo } from '../models';
import { getErrors, todoSchema } from '../utils/validator';
import type { IError } from '../interfaces';

export const createTodo = async (req: Request, res: Response): Promise<void> => {
	const { error } = todoSchema.validate(req.body, {
		abortEarly: false,
	});

	if (error !== undefined) {
		res.status(400).json({ errors: getErrors(error.details as IError[]) });
		return;
	}
	const { title, description, complete } = req.body;

	try {
		await db.connect();
		const todo = new Todo({
			title,
			description,
			complete,
		});
		await todo.save();
		await db.disconnect();
		res.status(200).json(todo);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
	try {
		await db.connect();
		const todos = await Todo.find().select('_id title description');
		await db.disconnect();
		res.status(200).json(todos);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
	const { todoId } = req.params;

	try {
		await db.connect();
		const todo = await Todo.findById(todoId).select('-__v');
		await db.connect();
		res.status(200).json(todo);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
	const { todoId } = req.params;
	const { complete } = req.body;

	try {
		await db.connect();
		await Todo.findByIdAndUpdate(todoId, {
			complete,
		});
		await db.connect();
		res.status(200).json({ message: 'Todo updated.' });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
	const { todoId } = req.params;

	try {
		await db.connect();
		await Todo.findByIdAndDelete(todoId);
		await db.connect();
		res.status(200).json({ message: 'Todo deleted.' });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};
