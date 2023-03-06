import { Box, Typography } from "@mui/material";

interface ITitle {
  title: string;
  explain: string;
}

export const Title: React.FC<ITitle> = ({ title, explain }) => {
  return (
    <Box sx={{ mt: 9, mb: 10 }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1" sx={{ width: "45%", m: "auto", mt: 1 }}>
        {explain}
      </Typography>
    </Box>
  );
};
