import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable"; 

// 1️⃣ define row type
type Person = { id: number; name: string; age: number };

// 2️⃣ sample data
const sampleData: Person[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

// 3️⃣ define columns with correct typing
const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

// 4️⃣ configure Storybook
const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable<Person>,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DataTable<Person>>;

// 5️⃣ stories
export const Default: Story = {
  render: () => <DataTable<Person> data={sampleData} columns={columns} />,
};

export const Selectable: Story = {
  render: () => <DataTable<Person> data={sampleData} columns={columns} selectable />,
};

export const Loading: Story = {
  render: () => <DataTable<Person> data={[]} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => <DataTable<Person> data={[]} columns={columns} />,
};

