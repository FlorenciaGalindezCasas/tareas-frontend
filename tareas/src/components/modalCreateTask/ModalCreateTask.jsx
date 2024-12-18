import React, { useEffect } from "react";
import "./ModalcreateTask.css";

function ModalcreateTask({
  onClose,
  handlecreateTask,
  newNoteData,
  setNewNoteData,
  showModal,
  availableTags,
}) {
  useEffect(() => {
    if (!showModal) {
      const modal = document.getElementById("createTaskModal");
      if (modal) {
        const modalInstance = new window.bootstrap.Modal(modal);
        modalInstance.hide();
      }
    }
  }, [showModal]);

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="createTaskModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!showModal}
      style={{ display: showModal ? "block" : "none" }} 
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Crear nueva tarea
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="d-flex flex-column form-createTask"
              onSubmit={handlecreateTask}
            >
              <div className="d-flex flex-column mb-3">
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Titulo"
                  value={newNoteData.note_title}
                  onChange={(e) =>
                    setNewNoteData({
                      ...newNoteData,
                      note_title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  placeholder="Descripcion"
                  value={newNoteData.note_description}
                  onChange={(e) =>
                    setNewNoteData({
                      ...newNoteData,
                      note_description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="form-label">Fecha</label>
                <input
                  type="datetime-local"
                  placeholder="Date"
                  value={newNoteData.note_date}
                  onChange={(e) =>
                    setNewNoteData({
                      ...newNoteData,
                      note_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="form-label">Categoría</label>
                <select
                  className="form-control"
                  id="tag_id"
                  name="tag_id"
                  value={newNoteData.tag_id || ""}
                  onChange={(e) =>
                    setNewNoteData({
                      ...newNoteData,
                      tag_id: parseInt(e.target.value, 10),
                    })
                  }
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {availableTags && availableTags.length > 0 ? (
                    availableTags.map((tag) => (
                      <option key={tag.tag_id} value={tag.tag_id}>
                        {tag.tag_name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No hay categorías disponibles
                    </option>
                  )}
                </select>
              </div>

              <button type="submit" className="btn btn-outline-success">
                Guardar
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onClose} 
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalcreateTask;
