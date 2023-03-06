import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type DataField = {
  value: string;
  id: string;
};

export interface IFormStore {
  alternatives: Array<DataField>;
  criteria: Array<DataField>;
  setData: (data: {
    alternatives: Array<DataField>;
    criteria: Array<DataField>;
  }) => void;
}

export const useFormStore = create<IFormStore>((set) => ({
  alternatives: [
    { value: "", id: uuidv4() },
    { value: "", id: uuidv4() },
    { value: "", id: uuidv4() },
  ],
  criteria: [
    { value: "", id: uuidv4() },
    { value: "", id: uuidv4() },
    { value: "", id: uuidv4() },
  ],
  loading: false,
  error: null,
  setData: (data: {
    alternatives: Array<DataField>;
    criteria: Array<DataField>;
  }) => {
    set(data);
  },
}));
