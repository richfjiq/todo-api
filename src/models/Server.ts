import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

class Server {
	private readonly app: express.Application;
	private readonly port: string;
	private readonly apiPaths = {
		todos: '/api/todos',
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT ?? '8080';
		this.middleware();
		this.routes();
	}

	listen(): void {
		this.app.listen(this.port, () => {
			// eslint-disable-next-line no-console
			console.log(`Server is running on port ${this.port}`);
		});
	}

	middleware(): void {
		this.app.use(cors());
		this.app.use(express.json());
	}

	routes(): void {
		this.app.use(this.apiPaths.todos, () => {});
	}
}

export default Server;
