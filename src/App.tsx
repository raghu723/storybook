import InputField from "./components/InputField";

import DataTable, { type Column } from "./components/DataTable"; // 👈 import Column as a type


// row type for table
type Person = { id: number; name: string; age: number };

const sampleData: Person[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="space-y-10 w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600">StoryBook</h1>

        {/* InputField section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">InputField Examples</h2>
          <InputField label="Username" placeholder="Enter username" />
          <InputField
            label="Email"
            placeholder="Enter email"
            helperText="We’ll never share your email."
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            invalid
            //errorMessage="Password is too short"
          />
          <InputField label="Disabled" placeholder="Can’t type here" disabled />
        </section>

        {/* DataTable section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">DataTable Example</h2>
          <DataTable<Person> data={sampleData} columns={columns} selectable />
        </section>
      </div>
    </div>
  );
}    



