import { create } from "zustand";

export type DataField = {
  value: string;
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
  alternatives: [{ value: "" }, { value: "" }],
  criteria: [{ value: "" }, { value: "" }],
  loading: false,
  error: null,
  setData: (data: {
    alternatives: Array<DataField>;
    criteria: Array<DataField>;
  }) => {
    set(data);
  },
}));
