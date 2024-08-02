interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: Option[];
  selectedOption: string;
  onSelect: (value: string) => void;
}
