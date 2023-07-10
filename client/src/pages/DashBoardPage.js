import * as React from "react";
import Container from "@mui/material/Container";
import DashboardBarChart from "../components/DashboardGraphs/BarChart";
import DashboardLineChart from "../components/DashboardGraphs/LineChart";
import DashboardPieChart from "../components/DashboardGraphs/PieChart";
import DashboardStackedBarChart from "../components/DashboardGraphs/StackedBarChart";
import Grid from '@mui/material/Grid';
/**
 * Component for the dashboard page
 */
export default function DashBoardPage() {
  const sampleData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
  ];

  const sampleStackedData = [
    { date: '6/13', Grocery: 44, Transportation: 35, Entertainment: 23, Food: 10, Other: 20 },
    { date: '6/14', Grocery: 12, Transportation: 23, Entertainment: 122, Food: 12, Other: 10 },
    { date: '6/15', Grocery: 22, Transportation: 3, Entertainment: 73, Food: 10, Other: 20 },
    { date: '6/16', Grocery: 13, Transportation: 15, Entertainment: 32, Food: 10, Other: 20 },
    { date: '6/17', Grocery: 44, Transportation: 35, Entertainment: 23, Food: 10, Other: 20 },
    { date: '6/18', Grocery: 35, Transportation: 45, Entertainment: 20, Food: 10, Other: 20 },
];

  return (
    <Container
      component="main"
      sx={{
        paddingTop: "30px",
      }}
    >
      {/* todo: make the Grid sizing part of the graph components instead */}
      <Grid container spacing={2}>
          <DashboardLineChart title="Money In" data={sampleData} dataKey="pv" />
          <DashboardLineChart title="Money Out" data={sampleData} dataKey="pv" />
          <DashboardPieChart title="Title Here" data={pieData} />
          <DashboardBarChart title="Title Here" data={sampleData} />
          <DashboardStackedBarChart title='Daily Transactions' data={sampleStackedData}/>
      </Grid>
    </Container>
  );
}
