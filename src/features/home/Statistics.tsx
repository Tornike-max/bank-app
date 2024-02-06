import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { generateColors } from "../../ui/generateColors";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

export default function Statistics({
  transactions,
}: {
  transactions: Models.Document[] | undefined;
}) {
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLegend(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generatedColors = generateColors(
    transactions?.length !== 0 ? transactions?.length || 5 : 1
  );

  const data1 =
    transactions?.length !== 0
      ? transactions?.map((actions, index) => {
          return {
            amount: actions?.amount,
            name: actions?.description,
            color: generatedColors[index],
          };
        })
      : [];

  return (
    <>
      {transactions?.length !== 0 ? (
        <div className="max-w-[2200px] w-full rounded-lg flex justify-center gap-2">
          <div className="w-full bg-stone-100 rounded-lg flex justify-center items-center">
            <PieChart width={420} height={250}>
              <Pie
                data={data1}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill=" #6366f1"
                paddingAngle={3}
                legendType="line"
                labelLine={true}
              >
                {data1?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>

              <Tooltip />
              {showLegend && (
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              )}
            </PieChart>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
