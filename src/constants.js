export const TABLE_COLUMN_DATA = {
  serialNo: { dataFieldName: "s.no", columnName: "S.No" },
  amountPledged: { dataFieldName: "amt.pledged", columnName: "Amount pledged" },
  percentageFunded: {
    dataFieldName: "percentage.funded",
    columnName: "Percentage funded",
  },
};

export const TABLE_COLUMN_LIST = Object.values(TABLE_COLUMN_DATA).map(
  (colData) => colData.columnName
);


export const MAX_ROWS_PER_PAGE = 5;