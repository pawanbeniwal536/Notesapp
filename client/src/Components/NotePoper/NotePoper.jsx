import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateNotes } from '../../action/notes';
import './NotePoper.css';

const NotePoper = ({ folderId, onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null); // This will hold the Base64 string
  const [error, setError] = useState(''); // For error messages

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (image) {
      // If an image is already uploaded, show an error message
      setError('You cannot upload more than one image.');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the Base64 string
        setError(''); // Clear any previous error message
      };
      reader.readAsDataURL(file); // Convert the image file to a Base64 string
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the uploaded image
    setError(''); // Clear any error message
  };

  const handleSaveNote = () => {
    // Check if the title is empty
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    dispatch(CreateNotes(folderId, title, content, tags, image)).then(() => {
      // Notify parent component to refetch notes
      onNoteCreated();
    });

    // Clear the form fields
    setTitle('');
    setContent('');
    setTags([]);
    setImage(null);
  };

  return (
    <div>
      <div className="modal fade" id={`exampleModal-${folderId}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="noteTitle">Title</label>
                <input
                  type="text"
                  id="noteTitle"
                  name="title"
                  className="form-control-2"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="noteContent">Content</label>
                <textarea
                  id="noteContent"
                  name="content"
                  className="form-control-2"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="noteTags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="noteTags"
                  name="tags"
                  className="form-control-2"
                  placeholder="Tags (comma separated)"
                  value={tags.join(',')}
                  onChange={(e) => setTags(e.target.value.split(','))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="noteImage">Upload Image</label>
                <input
                  type="file"
                  id="noteImage"
                  className="form-control-file"
                  onChange={handleImageChange}
                  disabled={image !== null} // Disable input if an image is already uploaded
                />
                {image && (
                  <div className="image-preview image-preview-cls">
                    <img src={image} alt="Uploaded" className="uploaded-image" />
                    <button type="button" className="btn btn-danger btn-sm rm-btn" onClick={handleRemoveImage}>Remove Image</button>
                    <p>Only One image can store</p>
                  </div>
                )}
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveNote}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePoper;
