import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import DashboardPieChart from "../components/Dashboard/DashboardGraphs/PieChart";
import DashboardStackedBarChart from "../components/Dashboard/DashboardGraphs/StackedBarChart";
import Summary from "../components/Dashboard/Summary";
import GoalsList from "../components/Dashboard/Goals/ViewGoalsList";
import Grid from '@mui/material/Grid';
import AddGoalItem from "../components/Dashboard/Goals/AddGoalItem";
import { useSelector } from "react-redux";
import { useTransactionCategories } from "../hooks/useTransactionCategories";
import { useDailyTransactions } from "../hooks/useDailyTransactions";
import { useDispatch } from "react-redux";
import { getTransactionsAsync } from "../redux/thunks/transactionThunk";
/**
 * Component for the dashboard page
 */
export default function DashBoardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsAsync());
  }, [dispatch]);
  const transactions = useSelector((state) => state.transactions.transactions);
  const { categoriesData } = useTransactionCategories(transactions);
  const { dailyTransactions } = useDailyTransactions(transactions);

  const sampleData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Container
      component="main"
      sx={{
        paddingTop: "30px",
        pb: 2,
      }}
    >
      {/* todo: make the Grid sizing part of the graph components instead */}
      <Grid container spacing={2}>
        {/* <DashboardLineChart title="Money In" data={sampleData} dataKey="pv" />
        <DashboardLineChart title="Money Out" data={sampleData} dataKey="pv" /> */}
        {/* <DashboardBarChart title="Total Transactions" data={sampleData} /> */}
        <DashboardStackedBarChart
          title="Daily Transactions"
          data={dailyTransactions}
        />
        <DashboardPieChart title="Spending Categories" data={categoriesData} />
      </Grid>
      <Summary />
			<AddGoalItem />
      <GoalsList />
    </Container>
  );
}
