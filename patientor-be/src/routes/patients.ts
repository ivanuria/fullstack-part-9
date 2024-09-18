import express from 'express';
import type { Response } from 'express';
import type { PatientNonSensible } from '../types';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNonSensible[]>) => {
  res.send(patientsService.getNonSensibleData());
});

export default router;