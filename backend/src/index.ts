import express from 'express';
import cors from 'cors';
import {initEnv} from "./utils/InitEnv";
import {Logger} from "./utils/logger";
import config from "config";
import http from "node:http";

initEnv();
export const isDev = process.env.mode === 'development';

const app = express();

app.use(cors());
app.use(express.json());

export const HOST = config.get('server.HOST') || 'localhost';
export const PORT = config.get('server.PORT') as number || 3000
export const ADDRESS = `http://${HOST}:${PORT}`

const handleServerStart = () => {
	Logger.log(`Server started on ${ADDRESS}`);
	
	if(isDev) {
		Logger.debug('The server is running in DEVELOPMENT MODE');
	}
}

const start  = async () => {
	
	if(isDev) {
		app.listen(
			PORT,
			handleServerStart
		);
		return;
	}
	
	const server = http.createServer(app);
	
	server.listen(
		PORT,
		HOST as string,
		handleServerStart
	)
}

start();
