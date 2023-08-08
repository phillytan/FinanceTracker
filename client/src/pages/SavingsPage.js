import { Container } from "@mui/material";
import ViewSavingsTable from "../components/Savings/ViewSavingsTable";
import AddSavingItem from "../components/Savings/AddSavingItem";
import RequireAuthentication from '../components/RequireAuthentication'

function SavingsPage() {
	return (
    <Container>
      <RequireAuthentication>
				<br />
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<AddSavingItem />
				</div>
				<ViewSavingsTable />
				<br />
      </RequireAuthentication>
    </Container>
	);
}

export default SavingsPage;
