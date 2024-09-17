import express from 'express';
import type Express from 'express';
import cors from 'cors';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const requestLogger:Express.RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path);
  next();
};

app.use(requestLogger);

// routes
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));