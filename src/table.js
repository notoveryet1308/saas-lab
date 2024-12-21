import {
  updatePaginationButtons,
  paginateContent,
  transformAssignmentData,
} from "./util.js";

export class Table {
  constructor({
    data,
    page = 1,
    prevButtonNode,
    nextButtonNode,
    tableColumnList = [],
    tableLoader,
    tableError,
  }) {
    this.data = data;
    this.currentPage = page;
    this.prevButtonNode = prevButtonNode;
    this.nextButtonNode = nextButtonNode;
    this.tableColumnList = tableColumnList;
    this.tableLoader = tableLoader;
    this.tableError = tableError;
  }

  createTableColCell = (columnName) =>
    `<div class="table-column-cell">${columnName}</div>`;

  createTableRowCell = (rowData) => {
    return `<div class="table-row-cell-data">${rowData}</div>`;
  };

  createTableHeader = ({ tableHeader, tableColumnList = [] }) => {
    tableColumnList.forEach((columnName) => {
      tableHeader.insertAdjacentHTML(
        "beforeend",
        this.createTableColCell(columnName)
      );
    });
  };

  createTableRow = ({ data = [], tableBody }) => {
    const tableRow = document.createElement("div");
    tableRow.classList.add("table-row");

    data.forEach((rowData) => {
      tableRow.insertAdjacentHTML(
        "beforeend",
        this.createTableRowCell(rowData)
      );
    });
    tableBody.appendChild(tableRow);
  };

  createTableBody = ({ tableBodySelector, tableData = [[]] }) => {
    const tableBody = document.querySelector(tableBodySelector);
    tableBody.innerHTML = "";

    tableData.map((data) => this.createTableRow({ data, tableBody }));
  };

  render() {
    if (!this.data.length) return (this.tableError.style.display = "flex");
    else {
      this.tableLoader.style.display = "none";
    }
    const paginatedData = paginateContent(this.data, this.currentPage);
    const tableData = paginatedData.map(transformAssignmentData);

    const hasNextPage =
      paginateContent(this.data, this.currentPage + 1).length > 0;

    this.createTableBody({
      tableBodySelector: ".table-body",
      tableData,
    });

    updatePaginationButtons(
      this.prevButtonNode,
      this.nextButtonNode,
      this.currentPage,
      hasNextPage
    );
  }

  init() {
    this.createTableHeader({
      tableHeader: document.querySelector(".table-header"),
      tableColumnList: this.tableColumnList,
    });
    this.render();
  }

  setPage(page) {
    this.currentPage = page;
    this.render();
  }
}
