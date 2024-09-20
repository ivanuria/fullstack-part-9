import { v1 as uuid } from 'uuid';
import { Gender, Patient } from "./types";

const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};
const isGender = (str: unknown): str is Gender => {
  return isString(str) && Object.values(Gender).map(gender => gender.toString()).includes(str);
};

export const toNewPatient = (patient: unknown): Patient => {
  if (!patient || typeof patient !== 'object') {
    throw new Error('Missing or incorrect patient data');
  }
  // Existence
  if (!('name' in patient))
    throw new Error('Name is required');
  if (!('dateOfBirth' in patient))
    throw new Error('Date Of Birth is required');
  if (!('ssn' in patient))
    throw new Error('SSN is required');
  if (!('gender' in patient))
    throw new Error('Gender is required');
  if (!('occupation' in patient))
    throw new Error('Occupation is required');
  // Types
  if (!isString(patient.name))
    throw new Error('Name must be a string');
  if (!isString(patient.dateOfBirth))
    throw new Error('Date of Birth must be a string');
  if (!isString(patient.ssn))
    throw new Error('SSN must be a string');
  if (!isGender(patient.gender))
    throw new Error('Gender must be of \'female\', \'male\' or \'other\'');
  if (!isString(patient.occupation))
    throw new Error('Occupation must be a string');

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid() as string,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
  } as Patient;
};