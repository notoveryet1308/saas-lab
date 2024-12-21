const DATA_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

const getAssignmentData = async () => {
  try {
    const response = await fetch(DATA_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export { getAssignmentData };
