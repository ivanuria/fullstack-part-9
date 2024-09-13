const ratingDescription = [
  'I cannot believe how a coach potato you are',
  'So you have decided you should go to the fridge and count that as an exercise, haven\'t you?',
  'Ok, you performed as expected. You shall higher your expectatives though. You lazy sloth.'
];
const ratingDescriptionNormal = [
  'Forgive yourself only once in a while but check if you are aiming for a achievable goal',
  'Not as much as expected, but, hey, you haven\'t stayed still either',
  'It\'s the Eye of the Tiger, It\'s the thrill of the fight'
];

interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExercise:number[], target:number) : result => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter(day => day > 0).length;
  const average = dailyExercise.reduce((a, b) => a + b, 0) / periodLength;
  const preRating = average / target;
  let rating:number;
  if (preRating < 0.5) rating = 1;
  else if (preRating < 1) rating = 2;
  else rating = 3;
  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: target < 1.5 ? ratingDescription[rating - 1] : ratingDescriptionNormal[rating - 1],
    target,
    average,
  }
}

const parseArgs = () : [Array<number>, number] => {
  const args = process.argv.slice(2).map(item => Number(item)); // They are all numbers after all

  if (args.length < 2 )
    throw new Error('You must provide at least two numbers: target day1 day2 day3...');

  if (args.some(item => isNaN(item)))
    throw new Error('All provided items should be numbers');

  return [args.slice(1), args[0]]
}

const [days, target] = parseArgs();
console.log(calculateExercises(days, target))