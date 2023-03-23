import { Box, Typography } from "@mui/material";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Title } from "../UI/Title";
import { FormButtons } from "../UI/FormButtons";
import { MatrixTable } from "./MatrixTable";
import { DataField, useFormStore } from "@/store/useFormStore";
import {
  AltMatrixes,
  MatrixType,
  useMatrixStore,
} from "@/store/useMatrixStore";

type Data = {
  critMatrix: MatrixType;
  altMatrixes: AltMatrixes;
};

interface IMatrix {
  path: Array<string>;
}

export const Matrix: React.FC<IMatrix> = ({ path }) => {
  const { alternatives, criteria } = useFormStore();
  const { critMatrix, altMatrixes, setData } = useMatrixStore();

  const navigate = useNavigate();

  const methods: UseFormReturn<{
    critMatrix: MatrixType;
    altMatrixes: AltMatrixes;
  }> = useForm({
    defaultValues: { critMatrix, altMatrixes },
  });

  const onBack = () => {
    navigate(path[0]);
  };

  const onSubmit = (data: Data) => {
    setData(data);
    navigate(path[1]);
  };

  const checkError = (name: string, index?: number) => {
    if (!(methods.formState.errors as any)[name]) return "";

    if (index !== undefined) {
      if (!(methods.formState.errors as any)[name][index]) return "";
    }

    return (
      <Typography sx={{ color: "#d32f2f" }}>
        Please fill out all required fields correctly. Maximum length is 3
        characters. You can use only numbers and forward slash
      </Typography>
    );
  };

  return (
    <Box sx={{ width: "85%", m: "auto" }}>
      <Title
        title={"Comparison Matrix"}
        explain={`Fill out all matrixes fields to solve the problem. 
        You can use only numbers and forward slash`}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ mb: 8 }}>
            <MatrixTable
              title={"Matrix of pairwise comparisons for criteria"}
              name={"critMatrix"}
              cells={criteria}
            />
            {checkError("critMatrix")}
          </Box>
          {criteria.map((criterion: DataField, index: number) => (
            <Box key={index} sx={{ mb: 8 }}>
              <MatrixTable
                title={`Matrix of pairwise comparisons for criterion 
              ${criterion.value}`}
                name={`altMatrixes.${index}`}
                cells={alternatives}
              />
              {checkError("altMatrixes", index)}
            </Box>
          ))}
          <FormButtons onBack={onBack} />
        </form>
      </FormProvider>
    </Box>
  );
};
