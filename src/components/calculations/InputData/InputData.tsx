import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { Box } from "@mui/material";
import { Title } from "../UI/Title";
import { FormButtons } from "../UI/FormButtons";
import { InputTable } from "./InputTable";
import { DataField, useFormStore } from "@/store/useFormStore";

type Data = {
  alternatives: Array<DataField>;
  criteria: Array<DataField>;
};

interface IInputData {
  path: string;
}

export const InputData: React.FC<IInputData> = ({ path }) => {
  const { alternatives, criteria, setData } = useFormStore();
  const navigate = useNavigate();

  const methods: UseFormReturn<{
    alternatives: DataField[];
    criteria: DataField[];
  }> = useForm({
    defaultValues: { alternatives, criteria },
  });

  const onSubmit = (data: Data) => {
    setData(data);
    navigate(path);
  };

  return (
    <Box sx={{ width: "85%", m: "auto" }}>
      <Title
        title={"Input Alternatives and Criteria"}
        explain={`Write down from 2 to 15 criteria and 
          alternatives for calculating promising technology`}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{ display: { lg: "flex" }, justifyContent: "space-between" }}
          >
            <InputTable name={"alternatives"} />
            <InputTable name={"criteria"} />
          </Box>
          <FormButtons />
        </form>
      </FormProvider>
    </Box>
  );
};
