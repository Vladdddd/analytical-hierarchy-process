import { create } from "zustand";

export type CritMatrix = Array<Array<string>>;
export type AltMatrixes = Array<Array<Array<string>>>;

export interface IMatrixStore {
  critMatrix: CritMatrix;
  altMatrixes: AltMatrixes;
  setData: (data: { critMatrix: CritMatrix; altMatrixes: AltMatrixes }) => void;
}

export const useMatrixStore = create<IMatrixStore>((set) => ({
  critMatrix: [],
  altMatrixes: [],
  loading: false,
  error: null,
  setData: (data: { critMatrix: CritMatrix; altMatrixes: AltMatrixes }) => {
    set(data);
  },
}));
