import express from 'express';
import type { RequestHandler } from 'express';


const app = express();

const logMiddleware: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.originalUrl);
  next();
}

app.use(logMiddleware);

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Fullstackers!</h1>');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});