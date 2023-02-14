import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

interface ITable {
  name: string;
}

export const Table: React.FC<ITable> = ({ name }) => {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "47.5%" },
        mt: 10,
        textAlign: "start",
      }}
    >
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        {name.toUpperCase()}
      </Typography>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: 1,
            mb: 1,
          }}
        >
          <OutlinedInput
            placeholder={"New Field"}
            {...register(name + `.${index}.value`)}
            sx={{ width: "100%", height: 50 }}
          />
          <Button
            onClick={() => remove(index)}
            sx={{ minWidth: 50, height: 50, p: 0 }}
          >
            <DeleteOutlineIcon />
          </Button>
        </Box>
      ))}
      <Button
        onClick={() => append({ value: "" })}
        variant="outlined"
        sx={{ minWidth: 35, height: 35, p: 0 }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};
