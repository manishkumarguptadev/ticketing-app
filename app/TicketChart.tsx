"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

function TicketChart({ open, inProgress, closed }: Props) {
  const chartData: {
    label: string;
    value: number;
    fill: string;
  }[] = [
    { label: "open", value: open, fill: "hsl(var(--chart-1))" },
    {
      label: "inProgress",
      value: inProgress,
      fill: "hsl(var(--chart-2)",
    },
    { label: "closed", value: closed, fill: "hsl(var(--chart-3))" },
  ];

  const chartConfig = {
    open: {
      label: "Open",
      color: "hsl(var(--chart-1))",
    },
    inProgress: {
      label: "In Progress",
      color: "hsl(var(--chart-2))",
    },
    closed: {
      label: "Closed",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
  const totalTickets = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-96"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTickets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tickets
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing total tickets
        </div>
      </CardFooter>
    </Card>
  );
}

export default TicketChart;
