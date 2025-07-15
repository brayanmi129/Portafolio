export const updateNotes = (newNote) => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Nota guardada:", data);
    })
    .catch((error) => {
      console.error("Error al guardar la nota:", error);
    });
};
