import { Container } from '@mui/material'
import ViewTransactionsTable from '../components/Transactions/ViewTransactionsTable'
import AddTransactionItem from '../components/Transactions/AddTransactionItem'
import BulkUpload from '../components/Transactions/BulkUpload'
import RequireAuthentication from '../components/RequireAuthentication'

function IndexPage() {
  return (
    <Container>
      <RequireAuthentication>
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AddTransactionItem />
          <BulkUpload />
        </div>
        <ViewTransactionsTable />
        <br />
      </RequireAuthentication>
    </Container>
  )
}

export default IndexPage
