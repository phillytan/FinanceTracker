import { Button, Container } from "@mui/material";
import ViewTransactionsTable from "../components/Transactions/ViewTransactionsTable";
import AddTransactionItem from "../components/Transactions/AddTransactionItem";

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
				<Button variant="contained">Hello World</Button>
			</Container>
		</>
	);
}

export default IndexPage;
