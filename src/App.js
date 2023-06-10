import { Container } from '@mui/material'
import TransactionsTable from './components/TransactionsTable';
import AddTransactionItem from './components/AddTransactionItem';

function App() {
	return (
		<>
			<Container>
				<br />
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<AddTransactionItem />
				</div>
				<TransactionsTable />
			</Container>
		</>
	);
}

export default App;
