import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'node:http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const server = createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`${req.method}:${req.originalUrl}, failed with error:${err}`);
  next(err);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`server is up on: http://localhost:${PORT}`);
});
