import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  OutlinedInput,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { DataField } from "@/store/useFormStore";

interface IMatrixTable {
  title: string;
  name: string;
  cells: Array<DataField>;
}

export const MatrixTable: React.FC<IMatrixTable> = ({ title, name, cells }) => {
  const { register } = useFormContext();

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        {title}
      </Typography>
      <TableContainer>
        <Table sx={{ border: "1px solid #e0e0e0" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                #
              </TableCell>
              {cells.map((cell: DataField) => (
                <TableCell
                  key={cell.id}
                  align="center"
                  sx={{ borderLeft: "1px solid #e8eaf6", fontWeight: 600 }}
                >
                  {cell.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cells.map((cell: DataField, index: number) => (
              <TableRow key={cell.id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {cell.value}
                </TableCell>
                {cells.map((cell: DataField, index2: number) => (
                  <TableCell
                    key={cell.id}
                    align="center"
                    sx={{ borderLeft: "1px solid #e8eaf6" }}
                  >
                    <OutlinedInput
                      {...register(`${name}.${index}.${index2}`, {
                        required: true,
                        maxLength: 3,
                        pattern: /^[0-9/]+$/i,
                      })}
                      size="small"
                      inputProps={{ style: { textAlign: "center" } }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
