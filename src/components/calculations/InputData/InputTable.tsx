import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

interface IInputTable {
  name: string;
}

export const InputTable: React.FC<IInputTable> = ({ name }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name });

  const checkIsLengthError = (index: number) => {
    if (
      (errors[name] as any)[index]?.value.type === "maxLength" ||
      (errors[name] as any)[index]?.value.type === "minLength"
    ) {
      return (
        <Typography sx={{ color: "#d32f2f" }}>
          The string must be more than 2 character and less than 31 characters
        </Typography>
      );
    } else return "";
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "47.5%" },
        textAlign: "start",
      }}
    >
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        {name.toUpperCase()}
      </Typography>
      {fields.map((item: Record<"id", string>, index: number) => (
        <Box key={item.id}>
          <Box
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
              {...register(name + `.${index}.value`, {
                required: true,
                minLength: 3,
                maxLength: 90,
              })}
              sx={{ width: "100%", height: 50 }}
            />
            <Button
              onClick={() => remove(index)}
              sx={{ minWidth: 50, height: 50, p: 0 }}
            >
              <DeleteOutlineIcon />
            </Button>
          </Box>
          {errors[name] ? checkIsLengthError(index) : ""}
        </Box>
      ))}
      {errors[name] ? (
        <Typography sx={{ color: "#d32f2f" }}>
          Please fill out all required fields correctly
        </Typography>
      ) : (
        ""
      )}
      <Button
        onClick={() => append({ value: "", id: uuidv4() })}
        variant="outlined"
        disabled={fields.length < 15 ? false : true}
        sx={{ minWidth: 35, height: 35, mt: 1, p: 0 }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};
