import { Button, Container } from '@mui/material'
import NavBar from './components/NavBar';
import TransactionsTable from './components/TransactionsTable';

function App() {
  return (
		<>
			<NavBar />
			<Container>
        <br />
        <TransactionsTable />
        <br />
				<Button variant="contained">Hello World!</Button>
			</Container>
		</>
	);
}

export default App;
