import { Button, Container } from '@mui/material'
import TransactionsTable from './components/TransactionsTable';

function App() {
  return (
		<>
			<Container>
        <br />
        <TransactionsTable />
        <br />
				<Button variant="contained">Hello World</Button>
			</Container>
		</>
	);
}

export default App;
