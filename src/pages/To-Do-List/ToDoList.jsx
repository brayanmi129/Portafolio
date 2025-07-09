import { CButton, CLabel, CInput } from "../../components";
import { useState } from "react";
import { XMarkIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/solid";

function ToDoList() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [completadas, setCompletadas] = useState([]);

  const agregar = (tarea) => {
    setTareas([...tareas, tarea]);
    console.log([...tareas, tarea]);
    setTarea("");
  };

  const eliminar = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  const noCompletada = (index) => {
    const nuevasTareas = completadas.filter((_, i) => i !== index);
    setCompletadas(nuevasTareas);
    setTareas([...tareas, completadas[index]]);
  };

  const completar = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
    setCompletadas([...completadas, tareas[index]]);
  };

  return (
    <div className="flex flex-col w-3/4 h-screen justify-start items-center p-8">
      <div>
        <CLabel text="Lista de tareas" className="text-2xl font-bold mb-4" />
      </div>
      <div className="flex w-full p-4 justify-center">
        <CInput
          type="text"
          input="Escribe su tarea"
          className="h-full border border-black-300 rounded-md mr-5 w-2/3 focus:border-blue-500 text-black"
          onChange={(e) => setTarea(e.target.value)}
          value={tarea}
        />
        <CButton
          label="Añadir tarea"
          onClick={() => agregar(tarea)}
          className="bg-blue-500 p-2 text-white border border-gray-300 rounded-md"
        />
      </div>
      {tareas.length > 0 && (
        <div className="w-full mt-4">
          <div className="m-4">
            <CLabel text="Tareas pendientes" className="text-2xl font-bold" />
          </div>
          <ul className="list-disc pl-5 fle">
            {tareas.map((tarea, index) => (
              <div
                key={index}
                className="flex w-full bg-white border-2 border-red-600 rounded-lg p-4 mb-2 text-gray-800 font-medium shadow-sm"
              >
                <div className="w-full">{tarea}</div>
                <button
                  type="button"
                  onClick={() => completar(index)}
                  className="flex border-2 border-green-600 rounded-lg p-1 justify-center items-center ml-2 mr-2 hover:bg-green-50 transition"
                >
                  <CheckIcon className="h-6 w-6 text-green-500" />
                </button>
                <button
                  type="button"
                  onClick={() => eliminar(index)}
                  className="flex border-2 border-red-600 rounded-lg p-1 justify-center items-center ml-2 mr-2 hover:bg-red-50 transition"
                >
                  <TrashIcon className="h-6 w-6 text-red-500" />
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}{" "}
      {completadas.length > 0 && (
        <div className="w-full mt-4">
          <div className="m-4">
            <CLabel text="Tareas Completadas" className="text-2xl font-bold" />
          </div>
          <ul className="list-disc pl-5 fle">
            {completadas.map((tarea, index) => (
              <div
                key={index}
                className="flex w-full bg-white border-2 border-green-600 rounded-lg p-4 mb-2 text-gray-800 font-medium shadow-sm"
              >
                <div className="w-full">{tarea}</div>
                <button
                  type="button"
                  onClick={() => noCompletada(index)}
                  className="flex border-2 border-red-600 rounded-lg p-1 justify-center items-center ml-2 mr-2 hover:bg-red-50 transition"
                >
                  <TrashIcon className="h-6 w-6 text-red-500" />
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ToDoList;
