import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { Table } from "./Table";
import { DataField, useFormStore } from "@/store/useFormStore";

type Data = {
  alternatives: Array<DataField>;
  criteria: Array<DataField>;
};

export const InputData = () => {
  const { alternatives, criteria, setData } = useFormStore();
  const navigate = useNavigate();

  const methods: any = useForm({
    defaultValues: { alternatives, criteria },
  });

  const onSubmit = (data: Data) => {
    setData(data);
    navigate("/step2");
  };

  return (
    <Box sx={{ m: 8, mt: 10 }}>
      <Typography variant="h5">Input alternatives and criteria</Typography>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Please write your criteria and alternatives.
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{ display: { lg: "flex" }, justifyContent: "space-between" }}
          >
            <Table name={"alternatives"} />
            <Table name={"criteria"} />
          </Box>
          <Button type="submit" variant="outlined" size="large" sx={{ mt: 20 }}>
            Next
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};
