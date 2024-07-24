"use client";

import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export default function MatchPosition() {
  const data = [{ name: "result", value: 50, fill: "var(--color-result)" }];

  const chartConfig = {
    result: {
      label: "result",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <h2 className="h2 text-center">Conicidencia con el puesto</h2>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={data}
              startAngle={225}
              endAngle={-45}
              innerRadius={80}
              outerRadius={140}
              barSize={15}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                radius={25}
                angleAxisId={0}
                tick={false}
                stroke="none"
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={25}
                fill="var(--chart-2)"
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {`${data[0].value.toLocaleString()}%`}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <small className="small">Puede mejorar</small>
        </CardFooter>
      </Card>
    </>
  );
}
