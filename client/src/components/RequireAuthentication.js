import { useSelector } from "react-redux";
import { Alert, AlertTitle } from '@mui/material'

const RequireAuthentication = ({ children }) => {
	const accesstoken = useSelector((state) => state.users.accesstoken);
  console.log(accesstoken)
  if (!accesstoken) {
    return (
      <>
        <br />
        <Alert severity="error">
          <AlertTitle>User Authentication Error</AlertTitle>
          This page requires user authentication. Please login.
        </Alert>
      </>
		);
  }
  return children
};

export default RequireAuthentication;
