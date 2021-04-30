import { getNodeText } from '@testing-library/dom'
import React from 'react'
import { useHistory } from 'react-router-dom'

export function Note({ note, handleClick, setCurrentNodeId }) {
  const history = useHistory()
  const getNote = (id) => {
    history.push(`./note/${id}`)
  }
  return (
    <li className='list-group-item d-flex justify-content-between'>
      <div onClick={() => getNote(note.id)}>{note.title}</div>
      <div>
        <button
          className='btn btn-sm btn-outline-danger'
          onClick={() => handleClick(note.id)}
        >
          x
        </button>

        <button onClick={() => setCurrentNodeId(note.id)}>Edit</button>
      </div>
    </li>
  )
}
