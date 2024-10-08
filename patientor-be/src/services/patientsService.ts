import type { Patient, PatientNonSensible } from "../types";
import data from '../../data/patients';

const getEntries = (): Patient[] => {
  return data;
};

const getNonSensibleData = (): PatientNonSensible[] => {
  return data.map(({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
    id, name, dateOfBirth, ssn, gender, occupation
  }));
};

const addEntry = (entry: Patient): Patient => {
  data.push(entry);
  return entry;
};

export default {
  getEntries,
  getNonSensibleData,
  addEntry,
};