import zod from 'zod';
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatient = zod.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
};

export type PatientNonSensible = Omit<Patient, 'ssn'>;