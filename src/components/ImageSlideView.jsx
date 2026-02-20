import { useRef, useState } from "react";
import { Button, IconButton, Modal, Select } from "./ui";

const ImageSlideView = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("ITEM");
  const [rows, setRows] = useState([
    { id: 1, caption: "", tagStyle: "", images: [] },
    { id: 2, caption: "", tagStyle: "", images: [] },
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const fileInputRefs = useRef({});

  const tabs = ["SCATCH", "ITEM", "TRIM", "APPLICATION", "MEAS"];

  const captionOptions = [
    { value: "front", label: "Front View" },
    { value: "back", label: "Back View" },
    { value: "side", label: "Side View" },
    { value: "detail", label: "Detail" },
  ];

  const tagStyleOptions = [
    { value: "style1", label: "Style 1" },
    { value: "style2", label: "Style 2" },
    { value: "style3", label: "Style 3" },
  ];

  const handleAddRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), caption: "", tagStyle: "", images: [] },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length === 1) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleRowChange = (id, field, value) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleImageUpload = (id, event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));

    setRows(
      rows.map((r) =>
        r.id === id ? { ...r, images: [...r.images, ...newImages] } : r,
      ),
    );
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newRows = [...rows];
    const draggedRow = newRows[draggedItem];
    newRows.splice(draggedItem, 1);
    newRows.splice(index, 0, draggedRow);
    setRows(newRows);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleSave = () => {
    onSave(rows);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="IMAGE SLIDE VIEW" size="xl">
      {/* Tabs */}
      <div className="flex flex-wrap bg-emerald-500 px-2 sm:px-4 pt-2 sm:pt-4">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-bold transition-colors rounded-t-xl
              ${
                activeTab === tab
                  ? "bg-white text-emerald-500 border-2 border-emerald-500 border-b-white relative z-10"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              }
              ${index === 0 ? "rounded-tl-xl" : ""}
              ${index === tabs.length - 1 ? "rounded-tr-xl" : ""}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 sm:gap-4 bg-gray-50 px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 min-w-[600px]">
            <div className="col-span-1 text-xs font-semibold text-gray-600">
              S.N.
            </div>
            <div className="col-span-3 text-xs font-semibold text-gray-600">
              PARTICULARS
            </div>
            <div className="col-span-3 text-xs font-semibold text-gray-600">
              TAG STYLE
            </div>
            <div className="col-span-4 text-xs font-semibold text-gray-600">
              IMAGE
            </div>
            <div className="col-span-1 flex justify-end">
              <IconButton
                variant="primary"
                onClick={handleAddRow}
                icon={
                  <svg
                    className="w-5 h-5"
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
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {rows.map((row, index) => (
              <div
                key={row.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-3 sm:py-4 items-center min-w-[600px] ${
                  draggedItem === index ? "bg-teal-50" : "bg-white"
                }`}
              >
                <div className="col-span-1 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400 cursor-move"
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
                <div className="col-span-3">
                  <Select
                    options={captionOptions}
                    value={row.caption}
                    onChange={(val) => handleRowChange(row.id, "caption", val)}
                    placeholder="CAPTIONS"
                  />
                </div>
                <div className="col-span-3">
                  <Select
                    options={tagStyleOptions}
                    value={row.tagStyle}
                    onChange={(val) => handleRowChange(row.id, "tagStyle", val)}
                    placeholder="TAG STYLE"
                  />
                </div>
                <div className="col-span-4">
                  <div className="flex items-center gap-3">
                    {/* Upload Button */}
                    <button
                      onClick={() => fileInputRefs.current[row.id]?.click()}
                      className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </button>
                    <input
                      type="file"
                      ref={(el) => (fileInputRefs.current[row.id] = el)}
                      onChange={(e) => handleImageUpload(row.id, e)}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />

                    {/* Image Previews */}
                    <div className="flex gap-2 flex-wrap">
                      {row.images.map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-10 h-10 object-cover rounded border border-gray-300"
                          />
                        </div>
                      ))}
                    </div>

                    {/* View Mode Icons */}
                    <div className="flex gap-1 ml-auto">
                      <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      </button>
                      <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                      </button>
                      <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="7"
                            height="7"
                            strokeWidth={2}
                          />
                          <rect
                            x="14"
                            y="3"
                            width="7"
                            height="7"
                            strokeWidth={2}
                          />
                          <rect
                            x="3"
                            y="14"
                            width="7"
                            height="7"
                            strokeWidth={2}
                          />
                          <rect
                            x="14"
                            y="14"
                            width="7"
                            height="7"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <IconButton
                    variant="danger"
                    onClick={() => handleRemoveRow(row.id)}
                    icon={
                      <svg
                        className="w-5 h-5"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
        <Button
          variant="warning"
          onClick={onClose}
          size="lg"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          }
        >
          CANCEL
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          size="lg"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          }
        >
          SAVE
        </Button>
      </div>
    </Modal>
  );
};

export default ImageSlideView;
