import { useEffect } from "react";
import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageStepper } from "./PageStepper";
import { InputData } from "@/components/calculations/InputData";
import { Matrix } from "@/components/calculations/Matrix";
import { Result } from "@/components/calculations/Result";

const routes = ["/", "/step-2", "/step-3"];

export const CalculationsPage = () => {
  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <Box>
      <PageStepper routes={routes} />
      <Routes>
        <Route path={routes[0]} element={<InputData path={routes[1]} />} />
        <Route
          path={routes[1]}
          element={<Matrix path={[routes[0], routes[2]]} />}
        />
        <Route path={routes[2]} element={<Result />} />
        <Route path="*" element={<Navigate to={routes[0]} replace />} />
      </Routes>
    </Box>
  );
};
