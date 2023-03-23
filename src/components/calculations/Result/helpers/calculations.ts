import { AltMatrixes, MatrixType } from "@/store/useMatrixStore";

type ConvertedMatrix = Array<number[]>;

const avgConsistInd = [
  0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51, 1.54, 1.56, 1.57, 1.59,
];

const checkIsSlash = (str: string) => {
  if (str.length > 2) {
    if (str.includes("/")) {
      if (str[0] !== "/" && str[2] !== "/") return true;
      else return false;
    }
  }
  if (str.length <= 2) {
    if (str.includes("/")) return false;
    else return true;
  }
};

const convertMatrix = (matrix: MatrixType) => {
  const convertedMatrix = [];
  let isError = false;
  for (let i = 0; i < matrix.length; i++) {
    const mi = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (checkIsSlash(matrix[i][j])) {
        if (matrix[i][j].length === 3) {
          mi.push(
            Number(matrix[i][j].slice(0, 1)) / Number(matrix[i][j].slice(2, 3)),
          );
        } else mi.push(Number(matrix[i][j]));
      } else {
        isError = true;
        break;
      }
    }
    convertedMatrix.push(mi);
  }
  return { convertedMatrix, isError };
};

const calcPriority = (matrix: ConvertedMatrix) => {
  const u = [];
  const w = [];

  for (let i = 0; i < matrix.length; i++) {
    const ui = matrix[i].reduce((acc: number, cur: number) => acc * cur);
    u.push(ui ** (1 / 4));
  }

  for (let i = 0; i < matrix.length; i++) {
    const uj = u.reduce((acc, cur) => acc + cur, 0);
    const wi = u[i] / uj;
    w.push(Number(wi.toFixed(6)));
  }

  return w;
};

const calcIntensity = (matrix: ConvertedMatrix, w: Array<number>) => {
  const intensity = [];
  for (let i = 0; i < matrix.length; i++) {
    const inti = matrix[i].reduce(
      (acc: number, cur: number, ind: number) => acc + cur * w[ind],
      0,
    );
    intensity.push(Number(inti.toFixed(6)));
  }

  return intensity;
};

const calcFraction = (w: Array<number>, intensity: Array<number>) => {
  const fraction = [];
  for (let i = 0; i < w.length; i++) {
    fraction.push(Number((intensity[i] / w[i]).toFixed(6)));
  }
  return fraction;
};

const calcLambda = (fraction: Array<number>) => {
  const lambda =
    fraction.reduce((sum: any, record: any) => sum + record) / fraction.length;
  return Number(lambda.toFixed(6));
};

const calcInd = (lambda: number, length: number) => {
  return Number(((lambda - length) / (length - 1)).toFixed(6));
};

const calcRelativeCoherence = (ind: number, consistInd: number) => {
  return Number((ind / consistInd).toFixed(6));
};

const calcMatrixResults = (matrix: MatrixType) => {
  const { convertedMatrix, isError } = convertMatrix(matrix);

  if (!isError) {
    const consistInd = avgConsistInd[convertedMatrix.length - 3];
    const w = calcPriority(convertedMatrix);
    const intensity = calcIntensity(convertedMatrix, w);
    const fraction = calcFraction(w, intensity);
    const lambda = calcLambda(fraction);
    const ind = calcInd(lambda, convertedMatrix.length);
    const coherence = calcRelativeCoherence(ind, consistInd);

    return { w, intensity, fraction, lambda, ind, coherence, consistInd };
  } else return "Something went wrong";
};

export const calcResults = (matrixes: AltMatrixes) => {
  let isError = false;
  const result = matrixes.map((matrix) => {
    const res = calcMatrixResults(matrix);
    if (typeof res === "string") {
      isError = true;
      return {
        w: [],
        intensity: [],
        fraction: [],
        lambda: 0,
        ind: 0,
        coherence: 0,
        consistInd: 0,
      };
    }
    return res;
  });

  if (!isError) {
    let gVectors = [...result[0].w];
    let gVector = 0;
    let ind = 0;

    for (let i = 1; i < result.length; i++) {
      for (let j = 0; j < result[i].w.length; j++) {
        gVectors[j] += Number(result[i].w[j]);
      }
    }

    for (let i = 0; i < gVectors.length; i++) {
      gVectors[i] = gVectors[i] / result.length;
      if (gVectors[i] > gVector) {
        gVector = gVectors[i];
        ind = i;
      }
    }

    return {
      vectors: gVectors,
      vectorInd: ind,
      matrixesRes: result,
    };
  } else return "Something went wrong";
};
