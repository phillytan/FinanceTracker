import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NavBar from "./components/NavBar";
import store from './redux/store/store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<NavBar />
					<Routes>
						<Route path={"/"} element={<IndexPage />} />
						<Route path={"/login"} element={<LoginPage />} />
						<Route path={"/signup"} element={<SignupPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
