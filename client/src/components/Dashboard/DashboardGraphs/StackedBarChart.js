import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Grid from '@mui/material/Grid';


const formatTooltip = (value, name) => {
  return [`${name}: $${value}`]
}
/**
 * Component for displaying a stacked bar chart
 * @param {string} title title of the chart
 * @param {list} data data that the chart will display
 */
export default function DashboardStackedBarChart({ title, data }) {

  return (
    <Grid item xs={12}>
      <Card variant={"outlined"}>
        <CardContent>
          <Typography variant={"h6"} align={"center"}>
            {title}
          </Typography>
          <ResponsiveContainer width={"100%"} height={256}>
            <BarChart
              title={title}
              width={150}
              height={40}
              data={data}
            >
              <XAxis dataKey={"date"} />
              <YAxis type={"number"} />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="Grocery" stackId="a" fill="#8884d8" />
              <Bar dataKey="Transportation" stackId="a" fill="#82ca9d" />
              <Bar dataKey="Entertainment" stackId="a" fill="#ffc658" />
              <Bar dataKey="Food" stackId="a" fill="#EF7E3B" />
              <Bar dataKey="Other" stackId="a" fill="#E6314D" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid >
  );
}
