import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CreateFolder, FetchFolder, UpdateFolder } from '../../action/folder';
import './FolderForm.css';

const FolderForm = ({ cancelFolderForm, folderEdit }) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (folderEdit) {
      setName(folderEdit.name); // Pre-fill the input if editing a folder
    }
  }, [folderEdit]);

  const handleCancelNotes = () => {
    cancelFolderForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (folderEdit) {
      await dispatch(UpdateFolder(folderEdit._id, name)); // Use the UpdateFolder action
    } else {
      await dispatch(CreateFolder(name));
    }
    cancelFolderForm();
    dispatch(FetchFolder()); // Refresh the folder list immediately after creating or updating a folder
  };

  return (
    <div className="folder-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="folder-name-heading">
          Folder Name :
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{folderEdit ? 'Update' : 'Save'}</button>
        <p className="text-center pt-2 folder-cancel-button" onClick={handleCancelNotes}>
          Cancel
        </p>
      </form>
    </div>
  );
};

export default FolderForm;
