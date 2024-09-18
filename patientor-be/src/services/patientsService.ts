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

export default {
  getEntries,
  getNonSensibleData
};