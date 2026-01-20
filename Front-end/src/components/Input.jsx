export default function Input({ label, type = "text", value, onChange, placeholder, name }) {
  return (
    <div className="flex flex-col mb-3 w-full">
      {label && <label className="text-sm font-bold mb-1">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-black"
      />
    </div>
  );
}