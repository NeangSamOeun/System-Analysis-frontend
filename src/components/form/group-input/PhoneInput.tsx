import { useState, useEffect } from "react";

interface CountryCode {
  code: string;
  label: string;
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  onChange?: (phoneNumber: string) => void;
  selectPosition?: "start" | "end";
  value?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+855 (000) 000-0000",
  onChange,
  selectPosition = "start",
  value,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("KH");
  const [phoneNumber, setPhoneNumber] = useState<string>(value || "+855");

  const countryCodes: Record<string, string> = countries.reduce(
    (acc, { code, label }) => ({ ...acc, [code]: label }),
    {}
  );

  // Update phoneNumber when `value` prop changes
  useEffect(() => {
    if (value) setPhoneNumber(value);
  }, [value]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    const prefix = countryCodes[newCountry];
    // Preserve user-typed digits after the old prefix
    const rest = phoneNumber.replace(/^\+?[0-9]+/, "");
    const newNumber = prefix + rest;
    setPhoneNumber(newNumber);
    onChange?.(newNumber);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefix = countryCodes[selectedCountry];
    let input = e.target.value;

    // Ensure input always starts with prefix
    if (!input.startsWith(prefix)) {
      input = prefix;
    }

    // Remove any letters after prefix
    const afterPrefix = input.slice(prefix.length).replace(/[^0-9]/g, "");

    const newPhoneNumber = prefix + afterPrefix;
    setPhoneNumber(newPhoneNumber);
    onChange?.(newPhoneNumber);
  };

  return (
    <div className="relative flex">
      {/* Dropdown at start */}
      {selectPosition === "start" && (
        <div className="absolute">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="appearance-none bg-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Input field */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder={countries.find((c) => c.code === selectedCountry)?.label || placeholder}
        className={`dark:bg-dark-900 h-11 w-full ${
          selectPosition === "start" ? "pl-[84px]" : "pr-[84px]"
        } rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-8000`}
      />

      {/* Dropdown at end */}
      {selectPosition === "end" && (
        <div className="absolute right-0">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="appearance-none bg-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
