import { useState } from "react";
import { IconButton, Input, Select } from "../ui";

const CostTable = ({
  title,
  data,
  onChange,
  columns = [
    "sn",
    "ref",
    "name",
    "unit",
    "qty",
    "unitPrice",
    "excs",
    "total",
    "depend",
  ],
  showDTM = true,
}) => {
  const [rows, setRows] = useState(data.rows || [{ id: 1 }]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const nameOptions = [
    { value: "name1", label: "Item Name 1", price: 10 },
    { value: "name2", label: "Item Name 2", price: 15 },
    { value: "name3", label: "Item Name 3", price: 20 },
  ];

  const unitOptions = [
    { value: "pcs", label: "PCS" },
    { value: "yard", label: "YARD" },
    { value: "meter", label: "METER" },
    { value: "kg", label: "KG" },
  ];

  const qtyOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "5", label: "5" },
    { value: "10", label: "10" },
  ];

  const handleAddRow = () => {
    const newRow = { id: Date.now() };
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

  const calculateRowTotal = (row) => {
    const qty = parseFloat(row.qty) || 0;
    const unitPrice = parseFloat(row.unitPrice) || 0;
    const excs = parseFloat(row.excs) || 0;
    const baseTotal = qty * unitPrice;
    const excsAmount = (baseTotal * excs) / 100;
    return (baseTotal + excsAmount).toFixed(2);
  };

  const handleRowChange = (id, field, value) => {
    const updated = rows.map((r) => {
      if (r.id === id) {
        const newRow = { ...r, [field]: value };
        // Auto-calculate total when qty, unitPrice, or excs changes
        if (field === "qty" || field === "unitPrice" || field === "excs") {
          newRow.total = calculateRowTotal(newRow);
        }
        // If price field is used (for application cost)
        if (field === "price") {
          newRow.total = value;
        }
        return newRow;
      }
      return r;
    });
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
    (sum, row) => sum + (parseFloat(row.total) || parseFloat(row.price) || 0),
    0,
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4 overflow-visible">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
        {title}
      </h3>

      <div className="table-responsive overflow-visible">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-10">
                S.N.
              </th>
              {columns.includes("ref") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                  REF.
                </th>
              )}
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2">
                Name
              </th>
              {columns.includes("type") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-24">
                  Type
                </th>
              )}
              {columns.includes("placement") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-24">
                  Placement
                </th>
              )}
              {columns.includes("category") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-24">
                  Category
                </th>
              )}
              {columns.includes("unit") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                  Unit
                </th>
              )}
              {columns.includes("qty") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-16">
                  Qty
                </th>
              )}
              {columns.includes("unitPrice") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                  Unit Price
                </th>
              )}
              {columns.includes("excs") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-16">
                  Excs[%]
                </th>
              )}
              {columns.includes("total") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                  Total
                </th>
              )}
              {columns.includes("price") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                  Price
                </th>
              )}
              {columns.includes("depend") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                  Depend
                </th>
              )}
              {columns.includes("cmPrice") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-24">
                  CM. PRICE
                </th>
              )}
              {columns.includes("action") && (
                <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                  ACTION
                </th>
              )}
              <th className="w-16 py-2 px-2">
                <IconButton
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
                />
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
                {columns.includes("ref") && (
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Ref"
                      value={row.ref || ""}
                      onChange={(val) => handleRowChange(row.id, "ref", val)}
                    />
                  </td>
                )}
                <td className="py-2 px-2 overflow-visible">
                  <Select
                    options={nameOptions}
                    value={row.name || ""}
                    onChange={(val) => handleRowChange(row.id, "name", val)}
                    placeholder="NAME"
                  />
                </td>
                {columns.includes("type") && (
                  <td className="py-2 px-2 overflow-visible">
                    <Select
                      options={[{ value: "type1", label: "Type 1" }]}
                      value={row.type || ""}
                      onChange={(val) => handleRowChange(row.id, "type", val)}
                      placeholder="Type"
                    />
                  </td>
                )}
                {columns.includes("placement") && (
                  <td className="py-2 px-2 overflow-visible">
                    <Select
                      options={[
                        { value: "front", label: "Front" },
                        { value: "back", label: "Back" },
                      ]}
                      value={row.placement || ""}
                      onChange={(val) =>
                        handleRowChange(row.id, "placement", val)
                      }
                      placeholder="Placement"
                    />
                  </td>
                )}
                {columns.includes("category") && (
                  <td className="py-2 px-2 overflow-visible">
                    <Select
                      options={[{ value: "cat1", label: "Category 1" }]}
                      value={row.category || ""}
                      onChange={(val) =>
                        handleRowChange(row.id, "category", val)
                      }
                      placeholder="Category"
                    />
                  </td>
                )}
                {columns.includes("unit") && (
                  <td className="py-2 px-2 overflow-visible">
                    <Select
                      options={unitOptions}
                      value={row.unit || ""}
                      onChange={(val) => handleRowChange(row.id, "unit", val)}
                      placeholder="UNIT"
                    />
                  </td>
                )}
                {columns.includes("qty") && (
                  <td className="py-2 px-2 overflow-visible">
                    <Select
                      options={qtyOptions}
                      value={row.qty || ""}
                      onChange={(val) => handleRowChange(row.id, "qty", val)}
                      placeholder="QTY"
                    />
                  </td>
                )}
                {columns.includes("unitPrice") && (
                  <td className="py-2 px-2">
                    <Input
                      placeholder="$ U. Price"
                      value={row.unitPrice || ""}
                      onChange={(val) =>
                        handleRowChange(row.id, "unitPrice", val)
                      }
                      type="number"
                    />
                  </td>
                )}
                {columns.includes("excs") && (
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Excs[%]"
                      value={row.excs || ""}
                      onChange={(val) => handleRowChange(row.id, "excs", val)}
                      type="number"
                    />
                  </td>
                )}
                {columns.includes("total") && (
                  <td className="py-2 px-2">
                    <Input
                      placeholder="$ Total"
                      value={row.total || ""}
                      disabled
                    />
                  </td>
                )}
                {columns.includes("price") && (
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Price"
                      value={row.price || ""}
                      onChange={(val) => handleRowChange(row.id, "price", val)}
                      type="number"
                    />
                  </td>
                )}
                {columns.includes("depend") && showDTM && (
                  <td className="py-2 px-2">
                    <button className="bg-gray-600 text-white text-xs px-3 py-1.5 rounded">
                      DTM
                    </button>
                  </td>
                )}
                {columns.includes("cmPrice") && (
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Cm. Price"
                      value={row.cmPrice || ""}
                      onChange={(val) =>
                        handleRowChange(row.id, "cmPrice", val)
                      }
                      type="number"
                    />
                  </td>
                )}
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

      <div className="flex justify-end mt-2">
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

export default CostTable;
