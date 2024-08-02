import { useState, useRef, FC } from "react";

import "./Dropdown.css";
import { DropdownProps } from "./types.ts";

import { useOutsideClick } from "@/shared/hooks/useOutsideClick.ts";

export const Dropdown: FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find(option => option.value === selectedOption)?.label ||
    "Select Language";

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
        <img
          src="/arrow-down.svg"
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
          alt="Arrow"
        />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(option => (
            <div key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
