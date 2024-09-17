import express from 'express';
import type Express from 'express';

const app = express();
app.use(express.json());

const requestLogger:Express.RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path);
  next();
};

app.use(requestLogger);

// routes
app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));