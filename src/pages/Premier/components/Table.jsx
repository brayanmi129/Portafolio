import { useState, useEffect } from "react";
import { response } from "./data.js";

function TablePremier() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Extraemos los datos y los ordenamos por puntos descendente
    const sortedData = [...response.data]
      .sort((a, b) => b.puntos - a.puntos)
      .map((item) => ({
        ...item,
        DG: item.GF - item.GC,
      }));

    setData(sortedData);
  }, []); // solo se ejecuta una vez al montar

  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-white p-4">
      <table className="min-w-full table-auto text-sm text-gray-700">
        <thead
          className="text-white"
          style={{ background: "linear-gradient(90deg, #00ff85 0%, #38003c 80%)" }}
        >
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Equipo</th>
            <th className="px-4 py-2 text-center">GF</th>
            <th className="px-4 py-2 text-center">GC</th>
            <th className="px-4 py-2 text-center">DG</th>
            <th className="px-4 py-2 text-center">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((equipo, index) => (
            <tr key={equipo.equipo} className="hover:bg-gray-100 transition duration-200 border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 font-medium">{equipo.equipo}</td>
              <td className="px-4 py-2 text-center">{equipo.GF}</td>
              <td className="px-4 py-2 text-center">{equipo.GC}</td>
              <td className="px-4 py-2 text-center">
                {equipo.DG > 0 ? `+${equipo.DG}` : equipo.DG}
              </td>
              <td className="px-4 py-2 text-center">{equipo.puntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePremier;
