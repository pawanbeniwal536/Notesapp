import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Folder from '../Folder/Folder';
import FolderForm from '../FolderForm/FolderForm';
import { FetchFolder, DeleteFolder } from '../../action/folder';
import './Home.css';

const Home = () => {
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState(null); // State to hold the folder being edited
  const [searchFolder, setSearchFolder] = useState('');
  const dispatch = useDispatch();

  const cancelFolderForm = () => {
    setShowFolderForm(false);
    setFolderToEdit(null); // Clear the folder to edit when canceling
  };

  const folderDeleter = async (id) => {
    await dispatch(DeleteFolder(id));
    dispatch(FetchFolder()); // Refetch folders after deletion to update the UI
  };

  const editStatus = (folder) => {
    setFolderToEdit(folder); // Set the folder to edit
    setShowFolderForm(true);
  };

  useEffect(() => {
    dispatch(FetchFolder());
  }, [dispatch]);

  const folderData = useSelector((state) => {
    console.log("Folder data:", state.folder.folders?.data?.message);
    return state.folder.folders?.data?.message || [];
  });

  // Ensure folderData is always an array
  const foldersArray = Array.isArray(folderData) ? folderData : [];
  console.log("Folders array:", foldersArray);

  // Filter folders based on the search query
  const filteredFolders = foldersArray.filter((folder) =>
    folder.name.toLowerCase().includes(searchFolder.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="home-content mt-3">
        {!showFolderForm && (
          <div className="create-folder-heading">
            <button className="add-folder-btn" onClick={() => setShowFolderForm(true)}>
              Create New Folder
            </button>
          </div>
        )}
        <form className='form-search-bar'>
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => setSearchFolder(e.target.value)}
          />
        </form>
        <div className="folder-form-cls">
          {showFolderForm && (
            <FolderForm cancelFolderForm={cancelFolderForm} folderEdit={folderToEdit} />
          )}
        </div>
        <div className="folders-container">
          {filteredFolders.length > 0 ? (
            filteredFolders.map((data) => (
              <Folder
                key={data._id}
                folder={data}
                folderDeleter={folderDeleter}
                editStatus={editStatus}
              />
            ))
          ) : (
            <div className="folder-not-available">
              <p>No folders available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
