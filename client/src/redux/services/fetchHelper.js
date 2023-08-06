let ENDPOINT;
if (process.env.NODE_ENV === 'development') {
	ENDPOINT = "http://localhost:3001";
} else {
	ENDPOINT = "https://financetracker-backend.onrender.com";
}

const fetchHelper = async (path, method, body) => {
	const accesstoken = localStorage.getItem("accesstoken")
		? localStorage.getItem("accesstoken")
		: null;
	const response = await fetch(ENDPOINT + path, {
		method,
		headers: {
			"Content-Type": "application/json",
			accesstoken,
		},
		[method.toUpperCase() !== "GET" ? "body" : undefined]: JSON.stringify(body),
	});
	const data = await response.json();
	if (!response.ok) {
		global.setNotification("error", data.message);
		throw new Error(data.message);
	}
	return data;
};

export default fetchHelper;
