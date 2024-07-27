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
import { Skeleton } from "@/components/ui/skeleton";
import { CompatibilityAssessment, PartialObject } from "@/server/types";

interface MatchChartProps {
  isLoading?: boolean;
  keywords?: PartialObject<CompatibilityAssessment['keywords']>
}

export default function MatchChart({ isLoading = false, keywords }: MatchChartProps) {
  const data = [{ name: "result", value: Math.round((keywords ?? []).filter((keyword) => keyword?.inCv).length)/(keywords?.length || 1)* 100, fill: "var(--color-result)" }];

  const chartConfig = {
    result: {
      label: "result",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const Loader = () => {
    return (
      <div className="flex justify-center mb-4">
        <Skeleton className="w-40 h-40 rounded-full bg-gray-200" />
      </div>
    );
  };

  return (
    <Card className="flex flex-col shadow-md rounded-xl">
      <CardHeader className="items-center pb-0">
        <h2 className="h2 text-center">Coincidencia con el puesto</h2>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <Loader />
        ) : (
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
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {isLoading ? (
          <Skeleton className="w-56 h-5 rounded-full bg-gray-200" />
        ) : (
          <small className="small">Puede mejorar</small>
        )}
      </CardFooter>
    </Card>
  );
}
