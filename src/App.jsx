import { useState } from "react";
import ImageSlideView from "./components/ImageSlideView";
import {
  CostTable,
  Credential,
  FabricCost,
  FOBCost,
  ManufacturingCost,
  StyleInformation,
} from "./components/sections";

// Initial state for form data
const initialFormData = {
  styleInfo: {
    companyName: "",
    date: "",
    item: "",
    styleNumber: "",
    season: "",
    year: "",
    status: "",
    department: "",
    termsOfSales: "",
    division: "",
    labelBrand: "",
    quantity: "",
    costingBy: "",
    currency: "",
    accessTo: "",
  },
  credential: {
    credentials: [
      { id: 1, type: "TIN", value: "" },
      { id: 2, type: "BIN", value: "" },
    ],
    courierAccNo: "",
    carrier: "",
    source: "",
    accessTo: "",
  },
  fabricCost: {
    ref: "",
    fabricName: "",
    unit: "",
    unitPrice: "",
    total: "",
  },
  trimCost: { rows: [{ id: 1 }] },
  accessoriesCost: { rows: [{ id: 1 }] },
  applicationCost: { rows: [{ id: 1 }] },
  manufacturingCost: { rows: [{ id: 1, name: "", cmPrice: "" }] },
  fobCost: { rows: [] },
  uploadedImages: [],
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  // Handle section data changes
  const handleSectionChange = (section) => (data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
    // Clear error when data is entered
    if (errors[section]) {
      setErrors((prev) => ({ ...prev, [section]: false }));
    }
  };

  // Validate required fields
  const validateForm = () => {
    const newErrors = {};

    // Check required style info fields
    if (!formData.styleInfo.companyName) newErrors.companyName = true;
    if (!formData.styleInfo.item) newErrors.item = true;
    if (!formData.styleInfo.status) newErrors.status = true;
    if (!formData.styleInfo.department) newErrors.department = true;
    if (!formData.styleInfo.termsOfSales) newErrors.termsOfSales = true;
    if (!formData.styleInfo.division) newErrors.division = true;
    if (!formData.styleInfo.costingBy) newErrors.costingBy = true;
    if (!formData.styleInfo.currency) newErrors.currency = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image save from modal
  const handleImageSave = (images) => {
    setFormData((prev) => ({ ...prev, uploadedImages: images }));

    // Validate after save
    if (!validateForm()) {
      setShowValidationMessage(true);
      setTimeout(() => setShowValidationMessage(false), 5000);
    }
  };

  // Calculate costs
  const exFactoryCost = 43.41;
  const finalCostDZ = 47.68;
  const finalCostPC = 47;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Costing Management
          </h1>
          <button className="p-2 rounded-md bg-teal-500 text-white hover:bg-teal-600">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Validation Message */}
      {showValidationMessage && (
        <div className="fixed top-20 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Please fill in all required fields (Company Name, Item, Status,
              Department, Terms of Sales, Division, Costing By, Currency)
            </span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Style Information */}
        <StyleInformation
          data={formData.styleInfo}
          onChange={handleSectionChange("styleInfo")}
          onSelectFile={() => setIsModalOpen(true)}
        />

        {/* Credential */}
        <Credential
          data={formData.credential}
          onChange={handleSectionChange("credential")}
        />

        {/* Fabric Cost */}
        <FabricCost
          data={formData.fabricCost}
          onChange={handleSectionChange("fabricCost")}
        />

        {/* Trim Cost/DZ */}
        <CostTable
          title="Trim Cost/DZ"
          data={formData.trimCost}
          onChange={handleSectionChange("trimCost")}
          columns={[
            "sn",
            "ref",
            "name",
            "unit",
            "qty",
            "unitPrice",
            "excs",
            "total",
            "depend",
          ]}
        />

        {/* Accessories Cost/DZ */}
        <CostTable
          title="Accessories Cost/DZ"
          data={formData.accessoriesCost}
          onChange={handleSectionChange("accessoriesCost")}
          columns={[
            "sn",
            "ref",
            "name",
            "unit",
            "qty",
            "unitPrice",
            "excs",
            "total",
            "depend",
          ]}
        />

        {/* Application Cost/DZ */}
        <CostTable
          title="Application Cost/DZ"
          data={formData.applicationCost}
          onChange={handleSectionChange("applicationCost")}
          columns={[
            "sn",
            "ref",
            "name",
            "type",
            "placement",
            "category",
            "price",
          ]}
          showDTM={false}
        />

        {/* Cost of Manufacturing/DZ */}
        <ManufacturingCost
          data={formData.manufacturingCost}
          onChange={handleSectionChange("manufacturingCost")}
        />

        {/* Ex-Factory Cost/DZ */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Ex-Factory Cost/DZ
            </h3>
            <span className="text-lg font-bold text-gray-800">
              $ {exFactoryCost}
            </span>
          </div>
        </div>

        {/* FOB Cost/DZ */}
        <FOBCost
          data={formData.fobCost}
          onChange={handleSectionChange("fobCost")}
        />
      </main>

      {/* Footer - Final Cost */}
      <footer className="sticky bottom-0 bg-blue-50 border-t border-gray-200 py-2 sm:py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
              FINAL COST/DZ
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-800 ml-1 sm:ml-2">
              $ {finalCostDZ}
            </span>
            <span className="text-gray-400 mx-2 sm:mx-4">|</span>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
              FINAL COST/PC
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-800 ml-1 sm:ml-2">
              $ {finalCostPC}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-teal-500 hover:bg-teal-600 text-white rounded transition-colors">
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button className="p-2 bg-teal-500 hover:bg-teal-600 text-white rounded transition-colors">
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
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </button>
          </div>
        </div>
      </footer>

      {/* Image Slide View Modal */}
      <ImageSlideView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleImageSave}
      />
    </div>
  );
}

export default App;
