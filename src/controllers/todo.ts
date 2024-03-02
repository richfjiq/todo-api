import type { Request, Response } from 'express';
import { db } from '../database';
import { Todo } from '../models';

export const createTodo = async (req: Request, res: Response): Promise<void> => {
	const { title, description } = req.body;

	try {
		await db.connect();
		const todo = new Todo({
			title,
			description,
		});
		await todo.save();
		await db.disconnect();
		res.status(200).json(todo);
	} catch (error) {
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
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
	const { todoId } = req.params;
	const { title, description } = req.body;

	try {
		await db.connect();
		await Todo.findByIdAndUpdate(todoId, {
			title,
			description,
		});
		await db.connect();
		res.status(200).json({ message: 'Todo updated.' });
	} catch (error) {
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
		await db.disconnect();
		res.status(404).json({ message: 'Server Error.' });
	}
};
