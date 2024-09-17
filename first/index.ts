import express from 'express';
import type Express from 'express';
// Modules
import calculateBmi from './bmiCalculator';

const app = express();

const logMiddleware: Express.RequestHandler = (req, _res, next) => {
  console.log(req.method, req.originalUrl);
  next();
};

const checkCleanData = (condition:boolean, message:string, res:Express.Response) => {
  if (condition)
    res
      .status(400)
      .json({ 'error': message })
      .end();
};

app.use(logMiddleware);

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Fullstackers!</h1>');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  checkCleanData(!(height && weight), 'height and weight should be provided', res);
  checkCleanData(isNaN(height) && isNaN(weight), 'height and weight must be numbers', res);
  checkCleanData(isNaN(height), 'height must be a number', res);
  checkCleanData(isNaN(weight), 'weight must be a number', res);

  const bmi = calculateBmi(height, weight);

  res.json({ weight, height, bmi, });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});