const apiUrl = "http://localhost:4000";
const fetchTasks = async () => {
  try {
    const res = await fetch(`${apiUrl}/task`, {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    /*     console.log(data); */
    return data.result;
  } catch (error) {
    console.error("Error al recuperar notas:", error);
    return [];
  }
};

const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (!token) {
      console.error("No hay token disponible.");
      return;
    }
    const res = await fetch(`${apiUrl}/task/nuevatarea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    return res.json();
  } catch (error) {
    console.error("Error creating new note:", error);
  }
};

const editTask = async (id, taskData) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (!token) {
      console.error("No hay token disponible.");
      return;
    }
    const { tag_name, ...editedTaskData } = taskData;
    const res = await fetch(`${apiUrl}/task/editartarea/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedTaskData),
    });
    console.log(res);
    return res.json();
  } catch (error) {
    console.error("Error editing note:", error);
  }
};

const updateNoteStatus = async (noteId, noteStatus = true) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No hay token disponible.");
      return;
    }

    const res = await fetch(`${apiUrl}/task/estadotarea/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ note_status: noteStatus }), // Cambia el cuerpo para usar note_status
    });

    if (!res.ok) {
      console.error("Error en la solicitud:", res.status, res.statusText);
      const errorData = await res.json();
      console.error("Error details:", errorData);
      return;
    }

    console.log(
      `Nota con ID ${noteId} ha sido ${
        noteStatus ? "completada" : "pendiente"
      } exitosamente.`
    );
  } catch (error) {
    console.error(`Error al actualizar el estado de la nota:`, error);
  }
};

const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (!token) {
      console.error("No hay token disponible.");
      return;
    }
    const res = await fetch(`${apiUrl}/task/eliminartarea/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error delete note:", error);
  }
};

const fetchTags = async () => {
  try {
    const res = await fetch(`${apiUrl}/tag`, {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();

    /*    console.log(data); */

    return data.result;
  } catch (error) {
    console.error("Error getting tags:", error);
    return [];
  }
};

const createTag = async (tagData) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (!token) {
      console.error("No hay token disponible.");
      return;
    }
    const res = await fetch(`${apiUrl}/tag/newtag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tagData),
    });

    if (!res.ok) {
      console.error("Error en la solicitud:", res.status, res.statusText);
      const errorData = await res.json();
      console.error("Error details:", errorData);
      return;
    }

    return res.json();
  } catch (error) {
    console.error("Error creating new tag:", error);
  }
};

const deleteTag = async (tagId) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (!token) {
      console.error("No hay token disponible.");
      return;
    }
    const res = await fetch(`${apiUrl}/tag/deletetag/${tagId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error delete tag:", error);
  }
};

export {
  fetchTasks,
  createTask,
  editTask,
  updateNoteStatus,
  deleteTask,
  fetchTags,
  createTag,
  deleteTag
};
