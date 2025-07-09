function CButton({ label, onClick, className }) {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {label}
    </button>
  );
}

export default CButton;
