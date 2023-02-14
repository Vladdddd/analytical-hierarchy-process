import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { PageStepper } from "./PageStepper";
import { InputData } from "@/components/calculations/InputData";
import { Matrix } from "@/components/calculations/Matrix";

export const CalculationsPage = () => {
  return (
    <Box>
      <PageStepper />
      <Routes>
        <Route path="/" element={<InputData />} />
        <Route path="/step2" element={<Matrix />} />
      </Routes>
    </Box>
  );
};
