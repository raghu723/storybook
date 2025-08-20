import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable, { type Column } from "../DataTable";

type Person = { id: number; name: string; age: number };

const sampleData: Person[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

describe("DataTable", () => {
  it("renders rows and columns", () => {
    render(<DataTable<Person> data={sampleData} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<DataTable<Person> data={[]} columns={columns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("allows selecting rows", async () => {
    const user = userEvent.setup();
    render(<DataTable<Person> data={sampleData} columns={columns} selectable />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
  });
});
