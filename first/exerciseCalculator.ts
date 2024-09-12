const ratingDescription = [
  'I cannot believe how a coach potato you are',
  'So you have decided you should go to the fridge and count that as an exercise, haven\'t you?',
  'Ok, you performed as expected. You shall higher your expectatives though. You lazy sloth.'
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
    ratingDescription: ratingDescription[rating - 1],
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))