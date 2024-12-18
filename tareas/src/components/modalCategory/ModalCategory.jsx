import React from "react";
import "../modalCategory/ModalCategory.css";

function ModalCategory({
  onClose,
  handleCreateTag,
  newTagData,
  setNewTagData,
  showModal,
}) {
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="categoryModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!showModal}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Agregar nueva categoría
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="d-flex flex-column form-createNote"
              onSubmit={handleCreateTag}
            >
              <div className="d-flex flex-column">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newTagData.tag_name}
                  onChange={(e) =>
                    setNewTagData({ ...newTagData, tag_name: e.target.value })
                  }
                />
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
              data-bs-dismiss="modal"
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

export default ModalCategory;
