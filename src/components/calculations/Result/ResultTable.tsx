import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MatrixRes } from "./Result";
import { DataField } from "@/store/useFormStore";

const cells = [
  "Row",
  "Criteria",
  "Column",
  "Vector",
  "Intensity relative importance",
  "Fraction",
];

interface IResultTable {
  criteria: Array<DataField>;
  matrixRes: MatrixRes;
  matrix: Array<string[]>;
}

export const ResultTable: React.FC<IResultTable> = ({
  criteria,
  matrixRes,
  matrix,
}) => {
  return (
    <Box sx={{ mb: 10 }}>
      <TableContainer>
        <Table sx={{ border: "1px solid #e0e0e0" }}>
          <TableHead>
            <TableRow>
              {cells.map((cell: string) => (
                <TableCell
                  key={cell}
                  align="center"
                  sx={{ borderLeft: "1px solid #e8eaf6", fontWeight: 600 }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {criteria.map((crit: DataField, ind: number) => (
              <TableRow key={crit.id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {ind + 1}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderLeft: "1px solid #e8eaf6" }}
                >
                  {crit.value}
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    p: "0",
                    borderLeft: "1px solid #e8eaf6",
                  }}
                >
                  {matrix[ind].map((item: any, ind2: number) => (
                    <Typography
                      key={ind2}
                      sx={{
                        width: "33.3%",
                        textAlign: "center",
                        p: 1,
                        pt: 2,
                        pb: 2,
                        borderLeft: ind2 !== 0 ? "2px solid #e8eaf6" : "",
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </TableCell>
                {[
                  matrixRes.w[ind],
                  matrixRes.intensity[ind],
                  matrixRes.fraction[ind],
                ].map((item: any) => (
                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #e8eaf6" }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {[
              {
                name: "Eigenvalue of the matrix (λmax)",
                value: matrixRes.lambda,
              },
              {
                name: "Consistency index",
                value: matrixRes.ind,
              },
              {
                name: "Coherence",
                value: matrixRes.coherence,
              },
            ].map((item: any) => (
              <TableRow>
                <TableCell colSpan={5}>{item.name}</TableCell>
                <TableCell
                  align="center"
                  sx={{ borderLeft: "1px solid #e8eaf6" }}
                >
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
