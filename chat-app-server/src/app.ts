import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'node:http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createSocket } from "./socket/socket-connection";
import authRouter from "./routes/auth.router";
import { AppError } from './error/appError';
import { AppConfig } from "./config/app.config";

const app = express();
const server = createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.originalUrl)
  next()
})

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.send("OK");
})

app.use(AppConfig.apiUrl.auth, authRouter)

app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
  console.error(`${req.method}:${req.originalUrl}, failed with error:${err}`);
  res.status(err.httpCode).json({ message: err.message, title: err.name, isOperational: err.isOperational })
});

server.listen(AppConfig.port, () => {
  console.log(`server is up on: http://localhost:${AppConfig.port}`);
});

createSocket(server)