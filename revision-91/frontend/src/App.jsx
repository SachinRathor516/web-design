import { useEffect, useState } from 'react'
import axios from 'axios'



function App() {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //get api
  function fetchNotes() {
    console.log("hello");

    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setNotes(res.data.note)
  
      })
  }
  useEffect(() => {
    fetchNotes()
  }, [])


  //post api
  function submitHndeler(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    axios.post('http://localhost:3000/notes',
      {
        title: title.value,
        description: description.value
      })
      .then((res) => {
        fetchNotes()
        setTitle('')
        setDesc('')
      })
  }

  //delete api
  function deleteHandle(noteId) {

    axios.delete('http://localhost:3000/notes/' + noteId)

      .then((res) => {
        console.log(res.data);
        fetchNotes()
        setTitle('')
        setDesc('')
      })
  }
  

  function updateHandleTitle(noteId ,newTitle){
    
    axios.patch('http://localhost:3000/notes/' + noteId , 
      {
        title :newTitle,
      })
    .then((res)=>{
      fetchNotes()
      setTitle('')
      setDesc('')
      console.log(res.data.note);
    })
  }
  function updateHandleDesc(noteId ,newDesc){
    
    axios.patch('http://localhost:3000/notes/' + noteId , 
      {
        description :newDesc,
      })
    .then((res)=>{
      fetchNotes()
      setTitle('')
      setDesc('')
      console.log(res.data.note);
    })
  }

 
  


  return (
    <>
      <form className='note-form' onSubmit={submitHndeler}>
        <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className='form-input' name='title' type="text" placeholder='Enter title' />
        <input value={desc} onChange={(e)=>{setDesc(e.target.value)}} className='form-input' name='description' type="text" placeholder='Enter description' />
        <button className='btn' >Submit</button>
      </form>

      <div className='notes'>
        {notes.map((note) => {
          return <div className='note'>
            <h1>{note.title}</h1>
            <h3>{note.description}</h3>
            <button className='btn' onClick={() => {
              deleteHandle(note._id)
            }}>Delete</button>
            <button className='btn' onClick={()=>{
              updateHandleTitle(note._id ,title)
            }}>Update title</button>
            <button className='btn' onClick={()=>{
              updateHandleDesc(note._id ,desc)
            }}>Update Description</button>
          </div>


        })}
      </div>

    </>
  )
}

export default App
