import { useState } from "react";
import { IconButton, Input, Select } from "../ui";

const Credential = ({ data, onChange }) => {
  const [credentials, setCredentials] = useState(
    data.credentials || [
      { id: 1, type: "TIN", value: "" },
      { id: 2, type: "BIN", value: "" },
    ],
  );

  const typeOptions = [
    { value: "TIN", label: "TIN" },
    { value: "BIN", label: "BIN" },
    { value: "ERC", label: "ERC" },
    { value: "IRC", label: "IRC" },
    { value: "REG NO", label: "REG NO" },
    { value: "TRADE LICENCE NO", label: "TRADE LICENCE NO" },
    { value: "EORI", label: "EORI" },
  ];

  const accessToOptions = [
    { value: "all", label: "All" },
    { value: "internal", label: "Internal Only" },
    { value: "external", label: "External" },
  ];

  const handleAdd = () => {
    const newCredential = { id: Date.now(), type: "", value: "" };
    const updated = [...credentials, newCredential];
    setCredentials(updated);
    onChange({ ...data, credentials: updated });
  };

  const handleRemove = (id) => {
    const updated = credentials.filter((c) => c.id !== id);
    setCredentials(updated);
    onChange({ ...data, credentials: updated });
  };

  const handleChange = (id, field, value) => {
    const updated = credentials.map((c) =>
      c.id === id ? { ...c, [field]: value } : c,
    );
    setCredentials(updated);
    onChange({ ...data, credentials: updated });
  };

  const handleFieldChange = (field) => (value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
        Credential
      </h3>

      <div className="space-y-3">
        {credentials.map((cred, index) => (
          <div key={cred.id} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-2 md:col-span-1">
              <Select
                options={typeOptions}
                value={cred.type}
                onChange={(val) => handleChange(cred.id, "type", val)}
                placeholder="Select"
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <Input
                value={cred.value}
                onChange={(val) => handleChange(cred.id, "value", val)}
                placeholder=""
              />
            </div>
            <div className="col-span-2 md:col-span-1 flex gap-1 justify-center">
              {index === 0 ? (
                <IconButton
                  variant="primary"
                  onClick={handleAdd}
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
              ) : (
                <IconButton
                  variant="danger"
                  onClick={() => handleRemove(cred.id)}
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
              )}
            </div>
            {index === 0 && (
              <>
                <div className="col-span-6 md:col-span-4">
                  <Input
                    placeholder="COURIER ACC. NO:"
                    value={data.courierAccNo || ""}
                    onChange={handleFieldChange("courierAccNo")}
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <Input
                    placeholder="CARRIER"
                    value={data.carrier || ""}
                    onChange={handleFieldChange("carrier")}
                  />
                </div>
              </>
            )}
            {index === 1 && (
              <>
                <div className="col-span-6 md:col-span-4">
                  <Input
                    placeholder="SOURCE"
                    value={data.source || ""}
                    onChange={handleFieldChange("source")}
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <Select
                    placeholder="Access To"
                    options={accessToOptions}
                    value={data.accessTo || ""}
                    onChange={handleFieldChange("accessTo")}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credential;
