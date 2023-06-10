import { Button, Container } from '@mui/material'
import NavBar from './components/NavBar';
import TransactionsTable from './components/TransactionsTable';
import AddTransactionItem from './components/AddTransactionItem';

function App() {
	return (
		<>
			<NavBar />
			<Container>
				<br />
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<AddTransactionItem />
				</div>
				<TransactionsTable />
				<br />
				<Button variant="contained">Hello World</Button>
			</Container>
		</>
	);
}

export default App;
