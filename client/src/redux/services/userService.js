import fetchHelper from "./fetchHelper";

const createUser = async (user) => {
	const data = await fetchHelper(`/users`, "POST", user);
	localStorage.setItem("accesstoken", data.token);
  global.setNotification('success', 'User Created!')
	return data;
};

const login = async (user) => {
  const data = await fetchHelper(`/users/login`, "POST", user);
	localStorage.setItem("accesstoken", data.token);
  global.setNotification('success', 'Successfully Logged in!')
	return data;
};

const service = {
	createUser,
	login,
};

export default service;
