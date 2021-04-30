import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from './components/navbar'
import { Sidebar } from './components/sidebar'
import { MainPage } from './pages/MainPage'
import { NotesPage } from './pages/NotesPage'
import { NotePage } from './pages/NotePage'
import { inc, dec } from './actions'
import './App.css'

export default function App() {
  const [notes, setNotes] = useState([])
  

  const dispatch = useDispatch()
  const state = useSelector((state) => state.counter)

  console.log('state', state)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setNotes(data))
  }, [])

  const addNote = (note) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: note, body: note})
  })
      .then((response) => response.json())
      .then((data) => setNotes([data, ...notes]))
  }


  const updateNote = (noteId, note) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${noteId}`, {method: 'PUT', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: note, body: note})
  })
      .then((response) => response.json())
      .then((data) => {
        setNotes(notes.map(note => note.id === data.id ? data : note))
      })
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((item) => item.id !== id))
  }

  const decrement = () => dispatch(dec())

  const increment = () => dispatch(inc())

  return (
    <div className='App'>
      <Router>
        <Sidebar />
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='input-group' style={{ width: '120px' }}>
              <button className='btn btn-outline-primary' onClick={decrement}>
                -
              </button>
              <span className='form-control text-center'>{state.counter}</span>
              <button className='btn btn-outline-primary' onClick={increment}>
                +
              </button>
            </div>
          </div>
          <hr />
          <Switch>

            <Route
              path='/note/:id'
              render={(props) => <NotePage id={props.match.params.id} />}
            />

            {/* <Route path='/notes' component={notes} /> */}

            <Route path='/notes'>
              <NotesPage notes={notes} removeNote={deleteNote} addNote={addNote} updateNote={updateNote} />
            </Route>

            <Route path='/about'>
              <h1>About Page</h1>
            </Route>

            <Route path='/'>
              <MainPage />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  )
}
