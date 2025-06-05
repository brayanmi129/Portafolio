import Cbutton from "../../components/Cbutton";

const Alert = () => {
  alert("¡Hiciste clic!");
};
function ToDoList() {
  return (
    <div>
      <Cbutton
        label="Haz clic aquí"
        onClick={Alert}
        className="bg-blue-500 text-black px-4 py-2 rounded"
      />
    </div>
  );
}

export default ToDoList;
