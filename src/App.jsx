import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleEnter = (e) => {

    if (e.key === "Enter" && todo !== "") {
      handleAdd();
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
  }
  const handleDelete = (e, id) => {
      let newTodos = todos.filter(item => {        
        return item.id !== id;
      })      
      setTodos(newTodos)
  }

  return (
    <>
      <div className=" bg-gray-600 w-full min-h-screen flex justify-center">
        <div className="md:w-2/5 min-h-2/3 border-2 my-20 rounded-md p-2 bg-blue-200">
          <h1 className='font-bold text-2xl text-center'>iTask - Manage your todos at one place</h1>
          <h2 className='font-bold'>Add a Todo</h2>
          <div className="flex gap-2">
            <input onChange={handleChange} onKeyDown={handleEnter} value={todo} type="text" className='border-2 rounded-sm w-full p-1 px-0.5 outline-0' />
            <button className='border-2 rounded-sm p-0.5 px-2 cursor-pointer bg-blue-300  hover:bg-blue-500' onClick={handleAdd} disabled={todo.length <= 1} >Save</button>
          </div>
          <div className='bg-black w-11/12 mx-auto opacity-25 mt-2'></div>
          <div className='flex justify-between'>
            <h2 className='font-bold'>Your Todos</h2>
            <div className='flex gap-1'>
              <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
              <span className='font-bold'>Show Finished</span>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            {todos.length === 0 && <div className='text-center font-bold'>Todo list empty.</div>}
            {todos.map(item => {

              return (showFinished || !item.isCompleted) && <div key={item.id} className='flex gap-1 justify-between items-center border-2 p-1 rounded-sm bg-cyan-200'>
                <div className='flex gap-1'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" className='' />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className='flex gap-1 justify-center h-min'>
                  <button onClick={(e) => handleEdit(e, item.id)} className='border-2 rounded-sm p-0.5 px-2 cursor-pointer bg-green-100 hover:bg-green-300'><FaEdit /></button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='border-2 rounded-sm p-0.5 px-2 cursor-pointer bg-red-100 hover:bg-red-500'><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
