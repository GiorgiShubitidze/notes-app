import React from 'react'
import { Note } from '../note'
import './style.css'

export function Notes({ notes, removeNote, setCurrentNodeId }) {
  return (
    <div className='container some-style'>
      <ul className='list-group'>
        {notes.map((item) => (
          <Note key={item.id} note={item} handleClick={removeNote} setCurrentNodeId={setCurrentNodeId} />
        ))}
      </ul>
    </div>
  )
}

//z.revazishvili@live.com
