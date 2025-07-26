import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputField = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  autoComplete = "off",
  error = "",
  isTextarea = false,
  min,
  max,
  step,
}) => {
  const inputId = id || name;

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Allow only digits for numeric input but treat as string
    if (type === "number" && !/^\d*$/.test(inputValue)) {
      return;
    }

    onChange(e); // Parent handles actual state update
  };

  return (
    <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-gray-900 text-md font-semibold mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`flex items-start border px-3 py-2 rounded-lg bg-gray-50 transition focus-within:border-gray-600 hover:scale-[1.02] ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="text-gray-500 mt-1 mr-2 w-5 h-5"
          />
        )}

        {isTextarea ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            rows={4}
            className="w-full bg-transparent focus:outline-none text-gray-900 resize-none"
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={type}
            inputMode={type === "number" ? "numeric" : undefined}
            pattern={type === "number" ? "\\d*" : undefined}
            value={value ?? ""}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            min={min}
            max={max}
            step={step}
            className="w-full bg-transparent focus:outline-none text-gray-900"
          />
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
