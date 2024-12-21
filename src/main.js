import { Table } from "./table.js";
import { getAssignmentData } from "./api.js";
import { TABLE_COLUMN_LIST } from "./constants.js";

const paginateBtnContainer = document.querySelector(".pagination-container");
const paginatePrevBtn = document.querySelector(".pagination-button.prev");
const paginateNextBtn = document.querySelector(".pagination-button.next");
const tableLoader = document.querySelector(".table-loader");
const tableError = document.querySelector(".table-error");

const init = async () => {
  const assignmentData = await getAssignmentData();

  let currentPage = 1;

  const table = new Table({
    currentPage,
    data: assignmentData,
    nextButtonNode: paginateNextBtn,
    prevButtonNode: paginatePrevBtn,
    tableColumnList: TABLE_COLUMN_LIST,
    tableLoader,
    tableError,
  });

  table.init();

  paginateBtnContainer.addEventListener("click", ({ target }) => {
    if (target.classList.contains("next")) {
      currentPage += 1;
      table.setPage(currentPage);
    } else if (target.classList.contains("prev")) {
      if (currentPage > 1) {
        currentPage -= 1;
        table.setPage(currentPage);
      }
    }
  });
};

init();
