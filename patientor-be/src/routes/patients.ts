import express from 'express';
import type { Response } from 'express';
import type { PatientNonSensible, Patient } from '../types';

import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNonSensible[] >) => {
  res.send(patientsService.getNonSensibleData());
});

router.post('/', (req, res: Response<Patient | string>) => {
  try {
    const finalEntry:Patient = toNewPatient(req.body);
    const newEntry = patientsService.addEntry(finalEntry);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;