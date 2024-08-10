import React, { useState } from 'react';
import Note from '../Note/Note'; 
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './NotesList.css';

const NotesList = ({ folderName }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "First Note",
      content: "This is the content of the first note.",
      tags: ["tag1", "tag2"]
    },
    {
      id: 2,
      title: "Second Note",
      content: "This is the content of the second note. This is the contee second note. This is the contee second note. This is the contee second note. This is the contee second note. This is the content of the third note.This is the content of the third note.This is the content of the third note.This is the content of the third note.This is the content of the third note.This is the content of the third note.This is the content of the third note.This is the content of the third note.",
      tags: ["tag2", "tag3"]
    },
    {
      id: 3,
      title: "Third Note",
      content: "This is the content of the third note.",
      tags: ["tag1", "tag3"]
    }
  ]);

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  return (
    <>
    <Navbar/>
    <div className="notes-list-container">
      <h2 className="folder-name">Folder: folder</h2>
      <div className="notes-list">
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        ))}
      </div>
    </div>
<Footer/>
    </>
  );
};

export default NotesList;
