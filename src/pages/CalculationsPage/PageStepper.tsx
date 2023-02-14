import { Stepper, Step, StepLabel } from "@mui/material";
import { useLocation } from "react-router-dom";

const steps = ["Input Data", "Create Comparison Matrix", "Check results"];

export const PageStepper = () => {
  const { pathname } = useLocation();
  const activeStep = pathname === "/" ? 0 : pathname === "/step2" ? 1 : 2;

  return (
    <Stepper
      activeStep={activeStep}
      sx={{ width: "100%", m: "0 auto", mt: { xs: 2, lg: 4 } }}
    >
      {steps.map((label) => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
