import { Button, DatePicker, Input, Select } from "../ui";

const StyleInformation = ({ data, onChange, onSelectFile }) => {
  const handleChange = (field) => (value) => {
    onChange({ ...data, [field]: value });
  };

  const companyOptions = [
    { value: "company1", label: "ABC Textiles Ltd." },
    { value: "company2", label: "XYZ Garments Co." },
    { value: "company3", label: "Fashion Hub Inc." },
  ];

  const seasonOptions = [
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "fall", label: "Fall" },
    { value: "winter", label: "Winter" },
  ];

  const yearOptions = [
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const departmentOptions = [
    { value: "menswear", label: "Menswear" },
    { value: "womenswear", label: "Womenswear" },
    { value: "kidswear", label: "Kidswear" },
  ];

  const termsOptions = [
    { value: "fob", label: "FOB" },
    { value: "cif", label: "CIF" },
    { value: "exw", label: "EXW" },
  ];

  const divisionOptions = [
    { value: "knit", label: "Knit" },
    { value: "woven", label: "Woven" },
    { value: "denim", label: "Denim" },
  ];

  const labelBrandOptions = [
    { value: "brand1", label: "Nike" },
    { value: "brand2", label: "Adidas" },
    { value: "brand3", label: "Puma" },
  ];

  const costingByOptions = [
    { value: "pc", label: "Per PC" },
    { value: "dz", label: "Per DZ" },
  ];

  const currencyOptions = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "gbp", label: "GBP" },
  ];

  const itemOptions = [
    { value: "tshirt", label: "T-Shirt" },
    { value: "polo", label: "Polo Shirt" },
    { value: "jacket", label: "Jacket" },
  ];

  const accessToOptions = [
    { value: "all", label: "All" },
    { value: "team1", label: "Team A" },
    { value: "team2", label: "Team B" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
        Style Information
      </h3>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          placeholder="COMPANY NAME"
          options={companyOptions}
          value={data.companyName}
          onChange={handleChange("companyName")}
          required
          className="lg:col-span-1"
        />
        <DatePicker
          placeholder="DATE"
          value={data.date}
          onChange={handleChange("date")}
        />
        <Select
          placeholder="ITEM"
          options={itemOptions}
          value={data.item}
          onChange={handleChange("item")}
          required
        />
        <Button
          variant="purple"
          onClick={onSelectFile}
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          }
        >
          SELECT FILE
        </Button>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          placeholder="STYLE NUMBER"
          value={data.styleNumber}
          onChange={handleChange("styleNumber")}
        />
        <Select
          placeholder="SEASON"
          options={seasonOptions}
          value={data.season}
          onChange={handleChange("season")}
        />
        <Select
          placeholder="YEAR"
          options={yearOptions}
          value={data.year}
          onChange={handleChange("year")}
        />
        <Select
          placeholder="STATUS"
          options={statusOptions}
          value={data.status}
          onChange={handleChange("status")}
          required
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          placeholder="DEPARTMENT"
          options={departmentOptions}
          value={data.department}
          onChange={handleChange("department")}
          required
        />
        <Select
          placeholder="TERMS OF SALES"
          options={termsOptions}
          value={data.termsOfSales}
          onChange={handleChange("termsOfSales")}
          required
        />
        <Select
          placeholder="DIVISION"
          options={divisionOptions}
          value={data.division}
          onChange={handleChange("division")}
          required
        />
        <Select
          placeholder="LABEL/BRAND"
          options={labelBrandOptions}
          value={data.labelBrand}
          onChange={handleChange("labelBrand")}
        />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          placeholder="Quantity"
          value={data.quantity}
          onChange={handleChange("quantity")}
          type="number"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <Select
          placeholder="COSTING BY"
          options={costingByOptions}
          value={data.costingBy}
          onChange={handleChange("costingBy")}
          required
        />
        <Select
          placeholder="CURRENCY"
          options={currencyOptions}
          value={data.currency}
          onChange={handleChange("currency")}
          required
        />
        <div></div>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          placeholder="ACCESS TO"
          options={accessToOptions}
          value={data.accessTo}
          onChange={handleChange("accessTo")}
        />
      </div>
    </div>
  );
};

export default StyleInformation;
