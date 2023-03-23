const createSplitText = (text: string) => {
  const textArr = text.split(" ");
  
  const changedText: Array<string[]> = [[], [], []];
  let counter = 0;

  for (let i = 0; i < textArr.length; i++) {
    if (counter <= 15) changedText[0].push(textArr[i]);
    if (counter > 15 && counter <= 40) changedText[1].push(textArr[i]);
    if (counter > 40) changedText[2].push(textArr[i]);
    counter += textArr[i].length;
  }

  return (
    <>
      <tspan x={0} dy=".8em">
        {changedText[0].join(" ")}
      </tspan>
      <tspan x={0} dy="1.2em">
        {changedText[1].join(" ")}
      </tspan>
      <tspan x={0} dy="1.2em">
        {changedText[2].join(" ")}
      </tspan>
    </>
  );
};

export const CustomizedAxisTick: React.FC<any> = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={0} textAnchor="middle" fill="#666" font-size="13px">
        {createSplitText(payload.value)}
      </text>
    </g>
  );
};
