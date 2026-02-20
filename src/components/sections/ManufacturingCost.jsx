import { useState } from "react";
import { Button, IconButton, Input, Select } from "../ui";

const ManufacturingCost = ({ data, onChange }) => {
  const [rows, setRows] = useState(
    data.rows || [{ id: 1, name: "", cmPrice: "" }],
  );
  const [draggedIndex, setDraggedIndex] = useState(null);

  const nameOptions = [
    { value: "cutting", label: "Cutting" },
    { value: "sewing", label: "Sewing" },
    { value: "finishing", label: "Finishing" },
    { value: "packing", label: "Packing" },
  ];

  const handleAddRow = () => {
    const newRow = { id: Date.now(), name: "", cmPrice: "" };
    const updated = [...rows, newRow];
    setRows(updated);
    onChange({ ...data, rows: updated });
  };

  const handleRemoveRow = (id) => {
    if (rows.length === 1) return;
    const updated = rows.filter((r) => r.id !== id);
    setRows(updated);
    onChange({ ...data, rows: updated });
  };

  const handleRowChange = (id, field, value) => {
    const updated = rows.map((r) =>
      r.id === id ? { ...r, [field]: value } : r,
    );
    setRows(updated);
    onChange({ ...data, rows: updated });
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newRows = [...rows];
    const draggedRow = newRows[draggedIndex];
    newRows.splice(draggedIndex, 1);
    newRows.splice(index, 0, draggedRow);
    setRows(newRows);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    onChange({ ...data, rows });
  };

  const total = rows.reduce(
    (sum, row) => sum + (parseFloat(row.cmPrice) || 0),
    0,
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4 overflow-visible">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
        Cost of Manufacturing/DZ
      </h3>

      <div className="table-responsive">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-16">
                S.N.
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2">
                NAME
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-32">
                CM. PRICE
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-24">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`border-b border-gray-100 ${draggedIndex === index ? "bg-teal-50" : "bg-white"}`}
              >
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-gray-400 cursor-move"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                </td>
                <td className="py-2 px-2 overflow-visible">
                  <Select
                    options={nameOptions}
                    value={row.name || ""}
                    onChange={(val) => handleRowChange(row.id, "name", val)}
                    placeholder="NAME"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    placeholder="Cm. Price"
                    value={row.cmPrice || ""}
                    onChange={(val) => handleRowChange(row.id, "cmPrice", val)}
                    type="number"
                  />
                </td>
                <td className="py-2 px-2">
                  <IconButton
                    variant="danger"
                    onClick={() => handleRemoveRow(row.id)}
                    icon={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-3">
        <Button
          variant="primary"
          onClick={handleAddRow}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          ADD
        </Button>
        <div className="bg-gray-100 px-4 py-2 rounded">
          <span className="text-xs text-teal-600">$ Total</span>
          <div className="text-sm font-medium">
            {total > 0 ? total.toFixed(2) : "1511"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingCost;
