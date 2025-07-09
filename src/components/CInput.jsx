function CInput({ type, input, className, onChange, value }) {
  return (
    <input
      type={type}
      placeholder={input}
      className={className}
      onChange={onChange}
      value={value}
    />
  );
}

export default CInput;
