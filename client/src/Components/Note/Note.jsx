import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Note.css';

const Note = ({ note, deleteNote, editNote }) => {
  const [show, setShow] = useState(false);
  const [newImage, setNewImage] = useState(null); // State to store the new image (Base64)
  const fileInputRef = useRef(null); // Ref to access the file input element

  const handleClose = () => {
    setShow(false);
    setNewImage(null); // Reset new image state when closing
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input value
    }
  };

  const handleShow = () => setShow(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // Convert image to Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const newTitle = document.getElementById(`modal-title-${note.id}`).value;
    const newContent = document.getElementById(`modal-content-${note.id}`).value;
    const finalImage = newImage || note.image; // Use new image if available, else keep old image

    if (newTitle) {
      editNote({
        ...note,
        title: newTitle,
        content: newContent,
        image: finalImage // Update with the new image or keep the old one
      });
      handleClose();
    }
  };

  const handleImageRemover = () => {
    editNote({ ...note, image: '' });
  };

  const handleCancelImage = () => {
    setNewImage(null); // Clear new image state
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input value
    }
  };

  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div className="note-tags">
        {note.tags && note.tags.map((tag, index) => (
          <span key={index} className="note-tag">{tag}</span>
        ))}
      </div>
      <div className="note-img">
        {(newImage || note.image) && <img src={newImage || note.image} alt={note.title} className="note-image" />}
      </div>
      <div className="note-actions">
        {note.image && !newImage && (
          <button onClick={handleImageRemover} id="remove-image-button">
            Remove Image
          </button>
        )}
        <Button variant="dark" onClick={handleShow}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => deleteNote(note._id)} id="delete-note-btn">
          Delete
        </Button>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor={`modal-title-${note.id}`} className="form-label">Title</label>
              <input
                type="text"
                className="form-control-2"
                id={`modal-title-${note.id}`}
                defaultValue={note.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`modal-content-${note.id}`} className="form-label">Content</label>
              <textarea
                className="form-control"
                id={`modal-content-${note.id}`}
                rows="3"                
                defaultValue={note.content}
              ></textarea>
            </div>
            {(newImage || note.image) && (
              <div className="mb-3">
                <div className="image-preview">
                  <img src={newImage || note.image} alt="Preview" className="image-preview-img" />
                </div>
                {newImage && (
                  <>
                  <Button variant="secondary" onClick={handleCancelImage} className='cancel-image-btn'>
                    Remove
                  </Button>
                  <p className='image-not-store-update'>Only One image can store</p>
                  </>
                )}
              </div>
            )}
            {!newImage && !note.image && (
              <div className="mb-3">
                <label htmlFor={`modal-image-${note.id}`} className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id={`modal-image-${note.id}`}
                  onChange={handleImageChange}
                  ref={fileInputRef} // Attach ref to file input
                />
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Note;
