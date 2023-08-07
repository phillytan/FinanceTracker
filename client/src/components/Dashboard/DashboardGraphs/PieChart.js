import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { formatTooltip } from "./StackedBarChart";

const COLOR_MAP = {
    Grocery: "#8884d8",
    Transportation: "#82ca9d",
    Entertainment: "#ffc658",
    Food: "#EF7E3B",
    Other: "#E6314D"
}
/**
 * Component for displaying a bar chart
 * @param {object} props
 * @param {string} props.title title of the chart
 * @param {list} props.data data that the chart will display
*/
export default function App(props) {
  const renderLabel = (entry) => `$${entry.payload.value}`
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <Card variant={"outlined"}>
        <CardContent>
          <Typography variant={"h6"} align={"center"}>
            {props.title}
          </Typography>
          <ResponsiveContainer width={"100%"} height={256}>
            <PieChart width={150} height={40}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={props.data}
                outerRadius={80}
                fill="#8884d8"
                label={renderLabel}
              >
              {props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.name]} />
            ))}
              </Pie>
              <Tooltip formatter={formatTooltip}/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
}
