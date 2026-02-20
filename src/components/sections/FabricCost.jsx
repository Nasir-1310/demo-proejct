import { Input, Select } from "../ui";

const FabricCost = ({ data, onChange }) => {
  const fabricOptions = [
    {
      value: "fabric1",
      label:
        'Single Jersey, 50% linen, 40% cotton, 19% lurex , 240oz. 110x76/45x45  (CMIA), 60"',
    },
    {
      value: "fabric2",
      label:
        'Single Jersey, 50% linen, 40% cotton, 19% lurex , 240oz. 110x76/45x45  (CMIA), 60"',
    },
  ];

  const unitOptions = [
    { value: "yard", label: "Yard" },
    { value: "meter", label: "Meter" },
    { value: "kg", label: "KG" },
  ];

  const handleChange = (field) => (value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4 overflow-visible">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
        Fabric Cost
      </h3>

      <div className="table-responsive overflow-visible">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-20">
                REF
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2">
                FABRIC NAME
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-28">
                UNIT
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-28">
                UNIT PRICE
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 py-2 px-2 w-24">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-2">
                <Input
                  placeholder="Ref"
                  value={data.ref || ""}
                  onChange={handleChange("ref")}
                />
              </td>
              <td className="py-2 px-2">
                <Select
                  options={fabricOptions}
                  value={data.fabricName || ""}
                  onChange={handleChange("fabricName")}
                  placeholder="Select Fabric"
                />
              </td>
              <td className="py-2 px-2">
                <div className="flex items-center gap-2">
                  <Select
                    options={unitOptions}
                    value={data.unit || ""}
                    onChange={handleChange("unit")}
                    placeholder="Unit"
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </td>
              <td className="py-2 px-2">
                <Input
                  placeholder="Unit Price"
                  value={data.unitPrice || ""}
                  onChange={handleChange("unitPrice")}
                  type="number"
                />
              </td>
              <td className="py-2 px-2">
                <Input
                  placeholder="Total"
                  value={data.total || ""}
                  onChange={handleChange("total")}
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FabricCost;
