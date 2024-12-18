import React, { useState, useEffect } from "react";
import "../menu/Menu.css";
import ModalCategory from "../modalCategory/ModalCategory";
import { MdOutlineArrowRight } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { fetchTags, createTag, deleteTag } from "../../store/actions/api";

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [tags, setTags] = useState([]);
  const [newTagData, setNewTagData] = useState({ tag_name: "" });

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    try {
      const newTag = await createTag(newTagData);
      setTags((prevTags) => [...prevTags, newTag]);
      setNewTagData({ tag_name: "" });
      handleModalToggle(); 
    } catch (error) {
      console.error("Error creating new tag:", error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      const res = await deleteTag(tagId);
      if (res && res.success) {
        setTags((prevTags) => prevTags.filter((tag) => tag.tag_id !== tagId));
      } else {
        console.error("Error al eliminar la tag");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const result = await fetchTags();
        setTags(result);
      } catch (error) {
        console.error("Error getting tags:", error);
      }
    };

    getTags();
  }, []);

  useEffect(() => {
    const updateTags = async () => {
      const result = await fetchTags();
      setTags(result);
    };
    updateTags();
  }, [newTagData]);

  return (
    <div className="menu-container">
      <button
        className={`btn-menu ${menuOpen ? "menu-opened" : "menu-closed"}`}
        type="button"
        onClick={handleOpenMenu}
      >
        <MdOutlineArrowRight
          style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div className={`menu ${menuOpen ? "menu-visible" : "menu-hidden"}`}>
        <div className="menu-overlay">
          <div className="d-flex flex-column options">
            <div className="icon">
              <h1>TAREAS</h1>
            </div>
            <ul className="category">
              {tags.map((tag) => (
                <li key={tag.tag_id}>
                  {tag.tag_name}
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteTag(tag.tag_id)}
                  >
                    <FiTrash2 />
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="btn-tag d-flex"
                  data-bs-toggle="modal"
                  data-bs-target="#categoryModal"
                  onClick={handleModalToggle}
                >
                  <GoPlus /> Agregar categoría
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ModalCategory
        onClose={handleModalToggle}
        handleCreateTag={handleCreateTag}
        newTagData={newTagData}
        setNewTagData={setNewTagData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default Menu;
