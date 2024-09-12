export {}; // I've been playing araound a while

enum CLASSIFICATION {
  Underweight_III = 'Underweight (Severe thinness)',
  Underweight_II = 'Underweight (Moderate thinness)',
  Underweight_I = 'Underweight (Mild thinness)',
  Normal = 'Normal range',
  Overweight = 'Overweight',
  Obese_I = 'Obese (Class I)',
  Obese_II = 'Obese (Class II)',
  Obese_III = 'Obese (Class III)',
};

interface limitType {
  name: CLASSIFICATION;
  limit: number;
}

const RANGES:limitType[] = [
  {
    name: CLASSIFICATION.Underweight_III,
    limit: 16,
  },
  {
    name: CLASSIFICATION.Underweight_II,
    limit: 17,
  },
  {
    name: CLASSIFICATION.Underweight_I,
    limit: 18.5,
  },
  {
    name: CLASSIFICATION.Normal,
    limit: 25,
  },
  {
    name: CLASSIFICATION.Overweight,
    limit: 30,
  },
  {
    name: CLASSIFICATION.Obese_I,
    limit: 35,
  },
  {
    name: CLASSIFICATION.Obese_II,
    limit: 40,
  },
  {
    name: CLASSIFICATION.Obese_III,
    limit: 999999,
  }, // This will make my life easier
]; // This is more verbose than expected, though more understandable

const sortLimits = (prev:limitType, next:limitType) => prev.limit - next.limit;

const calculateBmi = (height: number, weight: number) : CLASSIFICATION => {
  const BMI = weight / Math.pow((height / 100), 2); // https://en.wikipedia.org/wiki/Body_mass_index
  for (const classification of RANGES.sort(sortLimits)) { // Let's play with the numbers one by one from min to max
    if (BMI < classification.limit)
      return classification.name;
  }
  throw new Error(`End of classification with a BMI of ${BMI}`);
}

console.log(calculateBmi(180, 74))