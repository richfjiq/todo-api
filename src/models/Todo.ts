import mongoose, { Schema, model } from 'mongoose';

import type { ITodo } from '../interfaces/todo';

const todoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Todo: mongoose.Model<ITodo> = mongoose.models.Todo ?? model('Todo', todoSchema);

export default Todo;
