import React, { useState, useEffect } from "react";
import "../card/Card.css";
import { fetchTags } from "../../store/actions/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { format } from "date-fns";

function Card({ note, onDelete, onEdit, onUpdateStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const result = await fetchTags();
        setAvailableTags(result);
      } catch (error) {
        console.error("Error getting tags:", error);
      }
    };

    getTags();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const convertedValue = name === "tag_id" ? Number(value) : value;

    if (name === "tag_id") {
      const selectedTag = availableTags.find(
        (tag) => tag.tag_id === convertedValue
      );
      setEditedNote((prevNote) => ({
        ...prevNote,
        tag_id: convertedValue,
        tag_name: selectedTag?.tag_name,
      }));
    } else {
      setEditedNote((prevNote) => ({ ...prevNote, [name]: convertedValue }));
    }
  };

  const handleEditSubmit = () => {
    const { tag_name, ...editedNoteWithoutTagName } = editedNote;
    onEdit(editedNoteWithoutTagName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedNote({ ...note });
  };

  const handleStatusToggle = () => {
    onUpdateStatus(note.note_id, !note.completed); 
  };

  useEffect(() => {
    setEditedNote({ ...note });
  }, [note]);

  return (
    <div className={`card ${note.completed ? 'completed' : ''}`}>
      <div className="card-body">
        {isEditing ? (
          <>
            <div className="mb-3">
              <label htmlFor="note_title" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                id="note_title"
                name="note_title"
                value={editedNote.note_title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="note_description" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="note_description"
                name="note_description"
                value={editedNote.note_description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="note_date" className="form-label">
                Fecha
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="note_date"
                name="note_date"
                value={editedNote.note_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag_id" className="form-label">
                Categoría
              </label>
              <select
                className="form-control"
                id="tag_id"
                name="tag_id"
                value={editedNote.tag_id}
                onChange={handleInputChange}
              >
                {availableTags.map((tag) => (
                  <option key={tag.tag_id} value={tag.tag_id}>
                    {tag.tag_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex btns-edit">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleEditSubmit}
              >
                Guardar
              </button>
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column cardBody">
            <div className="tag d-flex">
              <h6>{note?.tag_name}</h6>
            </div>
            <div>
              <h5 className="card-title">
                <b>{note?.note_title}</b>
              </h5>
              <p className="card-text">{note?.note_description}</p>
              <h6 className="time d-flex">
                <MdAccessTime />
                {(() => {
                  const dateValue = new Date(note?.note_date);
                  return isNaN(dateValue)
                    ? "Fecha inválida"
                    : format(dateValue, "yyyy-MM-dd HH:mm:ss");
                })()}
              </h6>
            </div>
            <div className="d-flex btns-edit">
              <button onClick={() => setIsEditing(true)}>
                <FiEdit />
              </button>
              <button className="btn-delete" onClick={() => onDelete()}>
                <FiTrash2 />
              </button>
              <button onClick={handleStatusToggle}>
                {note.completed
                  ? "Marcar como pendiente"
                  : "Marcar como completada"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;