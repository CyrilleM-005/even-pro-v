interface FormInputProps {
  label: string;
  type: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}


export function FormInput({
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-base-200 rounded-xl w-full">
      <label className="floating-label w-full text-base-content">
        <span className="flex items-center gap-1 text-sm">
          {icon}
          {label}
        </span>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input bg-base-200 outline-0 px-2 pt-1 w-full"
        />
      </label>
    </div>
  );
}

export default FormInput;
