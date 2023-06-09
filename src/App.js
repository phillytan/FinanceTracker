import { Container } from '@mui/material'
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
			</Container>
		</>
	);
}

export default App;
