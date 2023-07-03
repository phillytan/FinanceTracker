import { Container } from "@mui/material";
import ViewTransactionsTable from "../components/Transactions/ViewTransactionsTable";
import AddTransactionItem from "../components/Transactions/AddTransactionItem";
import BulkUpload from "../components/Transactions/BulkUpload";


function IndexPage() {
	return (
		<>
			<Container>
				<br />
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<AddTransactionItem />
					<BulkUpload />
				</div>
				<ViewTransactionsTable />
				<br />
			</Container>
		</>
	);
}

export default IndexPage;
