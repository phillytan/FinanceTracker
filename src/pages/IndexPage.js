import { Button, Container, Card, CardContent, Typography } from "@mui/material";
import ViewTransactionsTable from "../components/Transactions/ViewTransactionsTable";
import AddTransactionItem from "../components/Transactions/AddTransactionItem";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Label } from 'recharts';

const data = [
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

function IndexPage() {
	return (
		<>
			<Container>
				<br />
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<AddTransactionItem />
				</div>
				<ViewTransactionsTable />
				<br />
        <Card variant={'outlined'}>
          <CardContent>
            <Typography variant={'h6'} align={'center'}>Chart Name</Typography>
            <ResponsiveContainer width={"100%"} height={256}>
              <BarChart title="Chart Name" width={150} height={40} data={data}>
                <XAxis dataKey={'index'} />
                <YAxis type={'number'} />
                <Bar dataKey="uv" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <br />
				<Button variant="contained">Hello World</Button>
			</Container>
		</>
	);
}

export default IndexPage;
