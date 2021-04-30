import React, {useEffect, useState} from 'react'
import { Notes } from '../components/notes'

export function NotesPage(props) {
  const {addNote, updateNote,notes } = props;
  const [currentNoteId, setCurrentNodeId] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if(currentNoteId) {
      const note = notes.find(item => item.id === currentNoteId);
      setNote(note.title);
    }
  }, [currentNoteId])

  const handleChange = (event) => {
    setNote(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(currentNoteId) {
      updateNote(currentNoteId, note);
      setCurrentNodeId(null);
    }else {
      addNote(note);
    }

    setNote('');
  }

  return (
    <>

      <form onSubmit={handleSubmit} style={{marginBottom:'8px'}}>
        <input onChange={handleChange} value={note} style={{padding:'8px'}} />
        <button onClick={handleSubmit}>Save Note</button>
      </form>


      <Notes
        notes={props.notes}
        removeNote={props.removeNote}
        getNote={props.getNote}
        setCurrentNodeId={setCurrentNodeId}
      />

    </>
  )
}
