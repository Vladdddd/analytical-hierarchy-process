import { DataField } from "@/store/useFormStore";

export const createChartObj = (
  vectors: Array<number>,
  alternatives: Array<DataField>,
) => {
  return vectors.map((vector, ind) => {
    return { name: alternatives[ind].value, vector };
  });
};
