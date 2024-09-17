import express from 'express';
import type Express from 'express';
// Modules
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

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

app.use(express.json());
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises:reqDailyExercises, target:reqTarget } = req.body;
  // Clean and check exercises
  checkCleanData(
    typeof (reqDailyExercises as number[]).map !== 'function',
    'daily exercises shuld be an array of numbers',
    res);
  const daily_exercises: number[] = (reqDailyExercises as number[]).map(n => Number(n));
  checkCleanData(
    daily_exercises.reduce((a:boolean, b:number) => a || isNaN(b), false),
    'all data in daily exercises shuld be numbers',
    res);
  // Clean and check target
  const target = Number(reqTarget);
  checkCleanData(
    isNaN(target),
    'target should be a number',
    res
  );

  const results = calculateExercises(daily_exercises, target);

  return res.json(results).end();
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});