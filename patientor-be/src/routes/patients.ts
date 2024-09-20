import express from 'express';
import { v1 as uuid } from 'uuid';
import zod from 'zod';
import type {
  Request,
  Response,
  NextFunction,
} from 'express';
import type {
  PatientNonSensible,
  Patient,
  NewPatient,
} from '../types';

import patientsService from '../services/patientsService';
import { NewPatientSchema } from '../utils';

const router = express.Router();

const patientParserMW = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorParserMW = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof zod.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<PatientNonSensible[] >) => {
  res.send(patientsService.getNonSensibleData());
});

router.post('/', patientParserMW, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient | string>) => {
  const id = uuid();
  const newEntry = patientsService.addEntry({...req.body, id });
  res.json(newEntry);
});

router.use(errorParserMW);

export default router;