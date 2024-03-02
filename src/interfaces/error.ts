interface Context {
	label: string;
	values: string;
	key: string;
}

export interface IError {
	message: string;
	path: string[];
	type: string;
	context: Context;
}

export interface IErrorFormatted {
	key: string;
	message: string;
}
