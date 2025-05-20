import express from 'express';
import { Sequelize } from './model';
import cors from 'cors';
import { initEnv } from './utils/InitEnv';
import { Logger } from './utils/logger';
import config from 'config';
import http from 'node:http';
import router from './route';
import errorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';
import ApiError from './exceptions/ApiError';

initEnv();
export const isDev = process.env.mode === 'development';

const app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(errorHandlingMiddleware);
app.use(
	(req, res) =>
		errorHandlingMiddleware(ApiError.NotFound(), req, res),
);

export const HOST = config.get('server.HOST') || 'localhost';
export const PORT = config.get('server.PORT') as number || 3000;
export const ADDRESS = `http://${HOST}:${PORT}`;

const handleServerStart = () => {
	Logger.log(`Server started on ${ADDRESS}`);

	if(isDev) {
		Logger.debug('The server is running in DEVELOPMENT MODE');
	}
};

const start  = async () => {

	await Sequelize.authenticate();
	await Sequelize.sync();

	if(isDev) {
		app.listen(
			PORT,
			handleServerStart,
		);
		return;
	}

	const server = http.createServer(app);

	server.listen(
		PORT,
		HOST as string,
		handleServerStart,
	);
};

start();
