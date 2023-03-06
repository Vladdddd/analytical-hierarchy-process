import { Stepper, Step, StepLabel } from "@mui/material";
import { useLocation } from "react-router-dom";

const steps = [
  "Input Criteria & Alternatives",
  "Create Comparison Matrixes",
  "Check results",
];

interface IPageStepper {
  routes: Array<string>;
}

export const PageStepper: React.FC<IPageStepper> = ({ routes }) => {
  const { pathname } = useLocation();
  const activeStep = routes.findIndex((route) => pathname === route);

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
