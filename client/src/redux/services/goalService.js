import fetchHelper from "./fetchHelper";

const getGoals = async () => {
  const data = await fetchHelper("/goals", "GET", {});
  return data;
};

const addGoal = async (goal) => {
  const data = await fetchHelper("/goals", "POST", goal);
  return data;
};

const updateGoal = async (goal) => {
  const data = await fetchHelper(
		`/goals/${goal._id}`,
		"PUT",
		goal
	);
  return data;
}

const deleteGoal = async (goal) => {
  const data = await fetchHelper(
    `/goals/${goal._id}`,
    "DELETE",
    goal
  );
  return data;
}

const service = { getGoals, addGoal, updateGoal, deleteGoal }

export default service