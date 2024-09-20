import zod from 'zod';
import { Gender } from "./types";

export const NewPatientSchema = zod.object({
  name: zod.string().min(1),
  dateOfBirth: zod.string().date(),
  ssn: zod.string().min(1),
  gender: zod.nativeEnum(Gender),
  occupation: zod.string().min(1),
});