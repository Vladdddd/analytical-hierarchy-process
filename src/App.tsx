import { Box } from "@mui/material";
import { CalculationsPage } from "@/pages/CalculationsPage";

function App() {
  return (
    <Box
      sx={{
        maxWidth: { sx: "90%", md: "82.5%", lg: "75%" },
        m: "0 auto",
        textAlign: "center",
      }}
    >
      <CalculationsPage />
    </Box>
  );
}

export default App;
