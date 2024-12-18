import React, { useEffect, useState } from "react";
import "../cards/Cards.css";
import {
  fetchTasks,
  createTask,
  editTask,
  updateNoteStatus,
  deleteTask,
  fetchTags,
} from "../../store/actions/api";
import Card from "../card/Card";
import ModalcreateTask from "../modalCreateTask/ModalCreateTask";
import { GoPlus } from "react-icons/go";

function Cards() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newNoteData, setNewNoteData] = useState({
    note_title: "",
    note_description: "",
    note_date: "",
    tag_id: 0,
  });
  const [editTaskData, setEditTaskData] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [showCompletedNotes, setShowCompletedNotes] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

const handleCreateTask = async (e) => {
  e.preventDefault();
  try {
    const newTask = await createTask(newNoteData);
    if (newTask) {
      const updatedNotes = await fetchTasks();
      setNotes(updatedNotes);
      setNewNoteData({
        note_title: "",
        note_description: "",
        note_date: "",
        tag_id: 0,
      });
      toggleModal();
    } else {
      console.error("Error al agregar la tarea");
    }
  } catch (error) {
    console.error("Error creando la tarea:", error);
  }
};

  const handleEditModalClose = () => {
    setShowModal(false);
    setEditTaskData(null);
  };

  const handleEditTask = async (editTaskData) => {
    try {
      const res = await editTask(editTaskData.note_id, editTaskData);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.note_id === editTaskData.note_id ? editTaskData : note
        )
      );
    } catch (error) {
      console.error("Error editing note:", error);
    }
    handleEditModalClose();
  };

  const onUpdateStatus = async (noteId, isCompleted) => {
    try {
      await updateNoteStatus(noteId, isCompleted);
      const updatedNotes = notes.map((note) =>
        note.note_id === noteId ? { ...note, completed: isCompleted } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error(
        `Error al ${
          isCompleted ? "marcar como completado" : "marcar como pendiente"
        } la nota con ID ${noteId}: ${error}`
      );
    }
  };

  const handleDeleteTask = async (noteId) => {
    try {
      const res = await deleteTask(noteId);
      if (res && res.success) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.note_id !== noteId)
        );
        console.log("Nota eliminada con éxito");
      } else {
        console.error("Error al eliminar la nota");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilterChange = (tag) => {
    setFilterTag(tag);
  };

  const filteredNotes = filterTag
    ? notes.filter((note) => note.tag_name === filterTag)
    : notes;

  const filteredAndCompletedNotes = showCompletedNotes
    ? notes.filter((note) => note.completed)
    : filteredNotes;

  useEffect(() => {
    const getNotes = async () => {
      try {
        const result = await fetchTasks();
        const notesWithCompletedStatus = result.map((note) => ({
          ...note,
          completed: note.note_status, 
        }));
        setNotes(notesWithCompletedStatus);
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    };

    getNotes();
  }, []);

  useEffect(() => {
    const getTags = async () => {
      try {
        const result = await fetchTags();
        console.log(result);
        setTagsFilter(result);
      } catch (error) {
        console.error("Error getting tags:", error);
      }
    };

    getTags();
  }, []);

  return (
    <div>
      <div className="d-flex option">
        <div>
          <ul className="d-flex filter">
            <li
              className={!filterTag ? "active" : ""}
              onClick={() => {
                handleFilterChange(null);
                setShowCompletedNotes(false);
              }}
            >
              <span>Todas</span>
            </li>
            {tagsFilter.map((tag) => (
              <li
                className={`tag-${tag.tag_name} ${
                  tag.tag_name === filterTag ? "active" : ""
                }`}
                key={tag.tag_id}
                onClick={() => handleFilterChange(tag.tag_name)}
              >
                {tag.tag_name}
              </li>
            ))}
            <li onClick={() => setShowCompletedNotes(!showCompletedNotes)}>
              {showCompletedNotes ? "Todas las tareas" : "Completadas"}
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex new">
        <button
          className="btn-note d-flex"
          onClick={toggleModal}
          data-bs-toggle="modal"
          data-bs-target="#createTaskModal"
        >
          <GoPlus />
          Crear nueva tarea
        </button>
      </div>
      <ModalcreateTask
        onClose={toggleModal}
        handlecreateTask={handleCreateTask}
        newNoteData={newNoteData}
        setNewNoteData={setNewNoteData}
        showModal={showModal}
        setShowModal={setShowModal}
        availableTags={tagsFilter}
      />
      <div className="d-flex cards">
        {filteredAndCompletedNotes.length > 0 ? (
          filteredAndCompletedNotes.map((note) => (
            <Card
              key={note.note_id + (editTaskData ? "_edit" : "")}
              note={note}
              onDelete={() => handleDeleteTask(note.note_id)}
              onEdit={handleEditTask}
              onUpdateStatus={(noteId, isCompleted) =>
                onUpdateStatus(noteId, isCompleted)
              }
            />
          ))
        ) : (
          <p>No notes match the selected filters.</p>
        )}
      </div>
    </div>
  );
}

export default Cards;
