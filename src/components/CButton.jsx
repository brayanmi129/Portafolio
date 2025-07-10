function CButton({ label, onClick, className }) {
  //CButton
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {label}
    </button>
  );
}

export default CButton;
