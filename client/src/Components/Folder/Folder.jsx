import React, { useEffect, useState } from 'react';
import Note from '../Note/Note';
import NotePoper from '../NotePoper/NotePoper';
import './Folder.css';
import { FetchAllNotes, DeleteNote, UpdateNote } from '../../action/notes';
import { useSelector, useDispatch } from 'react-redux';

const Folder = ({ folder, folderDeleter, editStatus }) => {
  const [folderNotes, setFolderNotes] = useState([]);
  const dispatch = useDispatch();
  const notes = useSelector(state => state?.notes?.note?.message);

  useEffect(() => {
    // Fetch all notes only once when the component is mounted
    dispatch(FetchAllNotes());
  }, [dispatch]); // Dependencies for fetching notes

  useEffect(() => {
    // Filter notes based on the current folder
    const filteredNotes = notes?.filter(note => note.folder === folder._id);
    setFolderNotes(filteredNotes);
  }, [folder._id, notes]); // Dependencies for filtering notes

  // Handle note deletion
  const deleteNote = (id) => {
    dispatch(DeleteNote(id)); // Delete note from backend or state
    // Update local state immediately
    setFolderNotes(folderNotes.filter(note => note._id !== id));
  };

  const editNote = (val) => {
    const { _id, title, content, tags, image } = val;
    // Dispatch the update action
    dispatch(UpdateNote(_id, title, content, tags, image));
  
    // Update local state immediately
    setFolderNotes(prevNotes =>
      prevNotes.map(note =>
        note._id === _id ? { ...note, title, content, tags, image } : note
      )
    );
  };
  
  // Handle folder deletion
  const deleteFolder = (id) => {
    folderDeleter(id);
  };

  // Handle folder edit
  const editFolder = (val) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: This makes the scroll smooth
    });
    editStatus(val);
  };

  return (
    <div className="folder-card">
      <div className="folder-header">
        <h3>{folder.name}</h3>
        <div className="folder-actions">
          <button className="edit-btn" onClick={() => editFolder(folder)}>Edit</button>
          <button className="delete-btn" onClick={() => deleteFolder(folder._id)}>Delete</button>
        </div>
      </div>
      <div className="launch-modal-cls">
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#exampleModal-${folder._id}`}>
          Create Notes
        </button>
      </div>

      {/* Show notes if available */}
      {folderNotes?.length > 0 ? (
        <div className="notes-container">
          {folderNotes.map((note) => (
            <Note key={note._id} note={note} deleteNote={deleteNote} editNote={editNote} />
          ))}
        </div>
      ) : (
        <div className="no-notes-available">
        <p>No notes available</p>
        </div>
      )}

      {/* NotePoper Modal */}
      <NotePoper folderId={folder._id} onNoteCreated={() => dispatch(FetchAllNotes())} />
    </div>
  );
};

export default Folder;
