import type { Diagnosis } from '../types';
import data from '../../data/diagnoses';

const getEntries = (): Diagnosis[] => {
  return data;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};