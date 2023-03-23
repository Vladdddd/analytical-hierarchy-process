import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Box, Typography } from "@mui/material";
import { Title } from "../UI/Title";
import { CustomizedAxisTick } from "./CustomizedAxisTick";
import { ResultTable } from "./ResultTable";
import { calcResults } from "./helpers/calculations";
import { createChartObj } from "./helpers/createChartObject";
import { useMatrixStore } from "@/store/useMatrixStore";
import { useFormStore } from "@/store/useFormStore";

export type MatrixRes = {
  w: Array<number>;
  intensity: Array<number>;
  fraction: Array<number>;
  lambda: number;
  ind: number;
  coherence: number;
  consistInd: number;
};

type Results =
  | {
      vectors: Array<{ name: string; vector: number }>;
      vectorInd: number;
      matrixesRes: Array<MatrixRes>;
    }
  | string;

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "brown",
  "red",
  "grey",
  "#1976d2",
  "lightgrey",
  "black",
  "aqua",
  "cyan",
  "coral",
];

export const Result = () => {
  const { alternatives, criteria } = useFormStore();
  const { altMatrixes } = useMatrixStore();
  const [res, setRes] = useState<Results>("");

  useEffect(() => {
    if (altMatrixes.length) {
      const results = calcResults(altMatrixes);
      if (typeof results !== "string") {
        const vectors = createChartObj(results.vectors, alternatives);
        setRes({
          vectors,
          vectorInd: results.vectorInd,
          matrixesRes: results.matrixesRes,
        });
      } else setRes(results);
    }
  }, [altMatrixes, alternatives]);

  if (typeof res === "string") {
    return <Typography>{res}</Typography>;
  }

  return (
    <Box>
      <Title
        title={"Result & Statistic"}
        explain={`Now you can get acquainted with the promising technology 
        and result tables of your alternatives and criteria`}
      />
      <Typography variant="h5" sx={{ mt: 8 }}>
        Promising Technology is
        <b>
          <br />
          {res.vectorInd !== undefined ? alternatives[res.vectorInd].value : ""}
        </b>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <BarChart width={750} height={465} data={res.vectors}>
          <XAxis
            dataKey="name"
            height={60}
            tick={<CustomizedAxisTick />}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="vector" fill="#1976d2">
            {res.vectors
              ? res.vectors.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))
              : ""}
          </Bar>
        </BarChart>
      </Box>
      <Typography variant="h5" sx={{ mt: 8, mb: 4 }}>
        Result Tables for Each Alternative
      </Typography>
      {res.matrixesRes
        ? res.matrixesRes.map((res: any, ind: number) => (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Matrix and results of pairwise comparisons for{" "}
              <b>{criteria[ind].value}</b>
            </Typography>
            <ResultTable
              criteria={alternatives}
              matrixRes={res}
              matrix={altMatrixes[ind]}
            />
          </>
        ))
        : ""}
    </Box>
  );
};
