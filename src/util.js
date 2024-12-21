import { TABLE_COLUMN_DATA, MAX_ROWS_PER_PAGE } from "./constants.js";

const transformAssignmentData = (assignmentData = {}) => {
  return Object.keys(assignmentData).reduce((acc, key) => {
    if (key === TABLE_COLUMN_DATA.serialNo.dataFieldName)
      acc.push(assignmentData[key]);
    if (key === TABLE_COLUMN_DATA.amountPledged.dataFieldName)
      acc.push(assignmentData[key]);
    if (key === TABLE_COLUMN_DATA.percentageFunded.dataFieldName)
      acc.push(assignmentData[key]);

    return acc;
  }, []);
};

const paginateContent = (content = [], page) => {
  const startIndex = (page - 1) * MAX_ROWS_PER_PAGE;
  const endIndex = startIndex + MAX_ROWS_PER_PAGE;
  return content.slice(startIndex, endIndex);
};

const updatePaginationButtons = (
  prevBtn,
  nextBtn,
  currentPage,
  hasNextPage
) => {
  if (!prevBtn || !nextBtn) return;

  if (!hasNextPage) nextBtn.setAttribute("disabled", true);
  else nextBtn.removeAttribute("disabled");

  if (currentPage <= 1) prevBtn.setAttribute("disabled", true);
  else prevBtn.removeAttribute("disabled");
};

export { transformAssignmentData, paginateContent, updatePaginationButtons };
