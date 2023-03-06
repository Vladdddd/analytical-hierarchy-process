import { Box, Button } from "@mui/material";

interface IFormButtons {
  onBack?: () => void;
}

export const FormButtons: React.FC<IFormButtons> = ({ onBack }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 20,
        mb: 2,
      }}
    >
      <Button
        onClick={onBack ? onBack : () => {}}
        variant="outlined"
        size="large"
        disabled={onBack ? false : true}
      >
        Back
      </Button>
      <Button type="submit" variant="outlined" size="large">
        Next
      </Button>
    </Box>
  );
};
