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
		complete: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true },
);

const Todo: mongoose.Model<ITodo> = mongoose.models.Todo ?? model('Todo', todoSchema);

export default Todo;
