import TablePremier from "./components/Table.jsx";

function Premier() {
  return (
    <div
      className="w-full min-h-screen"
      style={{ background: "linear-gradient(90deg, #00ff85 0%, #38003c 80%)" }}
    >
      <div className="max-w-4xl mx-auto mt-8">
        <TablePremier />
      </div>
    </div>
  );
}

export default Premier;
