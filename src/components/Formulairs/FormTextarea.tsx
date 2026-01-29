export function FormTextarea({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  rows = 10,
}: {
  label: string;
  icon?: React.ComponentType<{ size: number }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="flex gap-2 px-2 py-1 bg-base-200 rounded-xl w-full h-full">
      <label className="floating-label w-full text-base-content h-full">
        <span className="flex items-center gap-1 text-sm">
          {Icon && <Icon size={16} />}
          {label}
        </span>

        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="textarea bg-base-200 outline-0 px-2 pt-2 w-full h-full resize-none"
        />
      </label>
    </div>
  );
}
export default FormTextarea;
