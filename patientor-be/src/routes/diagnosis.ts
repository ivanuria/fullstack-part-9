import express from 'express';
import type { Response } from 'express';

import diagnosisService from '../services/diagnosisService';
import type { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;