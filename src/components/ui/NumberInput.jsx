/** Text-based numeric input — no spinners, allows natural typing. */
export default function NumberInput({ value, onChange, allowDecimal = false, className, ...props }) {
  const display = value === null || value === undefined ? '' : String(value);

  return (
    <input
      type="text"
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      value={display}
      onChange={(e) => {
        let v = e.target.value;
        if (allowDecimal) {
          if (v !== '' && !/^\d*\.?\d*$/.test(v)) return;
        } else if (!/^\d*$/.test(v)) {
          v = v.replace(/\D/g, '');
        }
        onChange(v);
      }}
      className={className}
      {...props}
    />
  );
}

export const toNumber = (v) => Number(v) || 0;
