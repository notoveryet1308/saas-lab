import { describe, it, expect, beforeEach, vi } from "vitest";
import { Table } from "../src/table";

describe("Table", () => {
  let mockDocument;
  let table;
  const mockData = [
    ["John", "Doe", "30"],
    ["Jane", "Smith", "25"],
  ];

  beforeEach(() => {
    mockDocument = {
      createElement: vi.fn(() => ({
        classList: { add: vi.fn() },
        insertAdjacentHTML: vi.fn(),
        appendChild: vi.fn(),
      })),
      querySelector: vi.fn(() => ({
        innerHTML: "",
        insertAdjacentHTML: vi.fn(),
      })),
    };
    global.document = mockDocument;

    table = new Table({
      data: mockData,
      prevButtonNode: document.createElement("button"),
      nextButtonNode: document.createElement("button"),
      tableColumnList: ["Name", "Surname", "Age"],
      tableLoader: { style: { display: "none" } },
      tableError: { style: { display: "none" } },
    });
  });

  it("should create column cell with correct HTML", () => {
    const result = table.createTableColCell("Name");
    expect(result).toBe('<div class="table-column-cell">Name</div>');
  });

  it("should create row cell with correct HTML", () => {
    const result = table.createTableRowCell("John");
    expect(result).toBe('<div class="table-row-cell-data">John</div>');
  });
});
