const ENDPOINT = "http://localhost:3001";

const accesstoken = localStorage.getItem("accesstoken")
	? localStorage.getItem("accesstoken")
	: null;

const fetchHelper = async (path, method, body) => {
  const response = await fetch(ENDPOINT + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      accesstoken
    },
    [method.toUpperCase() !== 'GET' ? 'body' : undefined]: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    global.setNotification('error', data.message)
    throw new Error(data.message)
  }
  return data
};

module.exports = fetchHelper;
