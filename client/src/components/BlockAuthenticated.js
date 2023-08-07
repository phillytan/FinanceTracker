import { useSelector } from "react-redux";
import { Alert, AlertTitle } from '@mui/material'
import { Navigate } from "react-router-dom";

const BlockAuthenticated = ({ children }) => {
	const accesstoken = useSelector((state) => state.users.accesstoken);
  if (accesstoken) {
    return (
			<>
				<br />
				<Navigate to="/" replace={true} />
				<Alert severity="info">
					<AlertTitle>Loading</AlertTitle>
				</Alert>
			</>
		);
  }
  return children
};

export default BlockAuthenticated;
