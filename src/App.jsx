import { useState, useEffect, useRef } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!todo.trim()) return;
    setTodos([
      ...todos,
      { id: uuidv4(), todo: todo.trim(), isCompleted: false }
    ]);
    setTodo("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
    console.log(e.target.value)
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos(
      todos.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleEdit = (id) => {
    const t = todos.find(item => item.id === id);
    setTodo(t.todo);
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleDelete = (id) => {
    let val = confirm("Are u sure, You want to delete this Task");
    if (val) {
      setTodos(todos.filter(item => item.id !== id));
    }
  };
  
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <div className="bg-gray-600 w-full h-screen flex justify-center">
      <div className="max-lg:w-10/10 lg:w-6/10 border-2 my-20 max-lg:mx-10 rounded-2xl p-3 bg-blue-200 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:w-0">

        <h1 className="font-bold text-2xl text-center">
          iTask - Manage your todos
        </h1>

        <h2 className="font-bold mt-2">Add a Todo</h2>

        <div className="flex gap-2">
          <input
            value={todo}
            onChange={handleChange}
            onKeyDown={handleEnter}
            type="text"
            className="border-2 rounded-sm w-full p-1 outline-0"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 1}
            className="border-2 rounded-sm px-3 bg-blue-300 hover:bg-blue-500 disabled:opacity-50 cursor-pointer"
          >
            Save
          </button>
        </div>

        <div className="bg-black w-11/12 mx-auto opacity-25 mt-3"></div>

        <div className="flex justify-between mt-2">
          <h2 className="font-bold">Your Todos</h2>
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={toggleFinished}
            />
            <span className="font-bold">
              {showFinished ? "Show Completed" : "Show Pending"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">

          {todos.filter(item => item.isCompleted === showFinished).length === 0 && (
            <div className="text-center font-bold">
              No todos found.
            </div>
          )}

          {todos
            .filter(item => item.isCompleted === showFinished)
            .map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center border-2 p-1 rounded-sm bg-cyan-200"
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    onChange={handleCheckbox}
                    className='cursor-pointer'
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="border-2 rounded-sm px-2 py-1 bg-green-100 hover:bg-blue-400 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border-2 rounded-sm px-2 py-1 bg-red-100 hover:bg-red-500 cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App
