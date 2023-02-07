import { Query } from "../Types/types";

export const initialQuery: Query = {
  name: '',
  region: '',
  timezone: '',
  continent: '',
  population: {min: -1, max: -1},
}