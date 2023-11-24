import { useEffect, useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([""]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('@storagekey')

    if(savedTasks){
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  function handleRegister() {
    if (!input) {
      alert('Preencha o campo de adicionar tarefa');
      return;
    }

    const updatedTasks = [input, ...tasks];
    setTasks(updatedTasks);
    setInput('');

    localStorage.setItem('@storagekey', JSON.stringify(updatedTasks));
  }

  function handleDelete(index: number) {
    const updatedTasks = tasks.filter((_task, i) => i !== index);
    setTasks(updatedTasks);

    localStorage.setItem('@storagekey', JSON.stringify(updatedTasks));
  }

  function handleEdit(index: number) {
    setEditIndex(index);
    setEditInput(tasks[index]);
  }

  function handleSaveEdit(index: number, updatedValue: string) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? updatedValue : task
    );
    setTasks(updatedTasks);
    setEditIndex(-1);

    localStorage.setItem('@storagekey', JSON.stringify(updatedTasks));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (editIndex !== -1) {
        handleSaveEdit(editIndex, editInput);
      } else {
        handleRegister();
      }
    }
  }

  return (
    <div className='container'>
      <h1>To-do List</h1>
      <input
        placeholder='Add tasks...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleRegister}>+</button>

      {tasks.map((item, index) => (
        <section key={index}>
          {editIndex === index ? (
            <>
              <input
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveEdit(index, editInput);
                  }
                }}
              />
              <button onClick={() => handleSaveEdit(index, editInput)}>Save</button>
            </>
          ) : (
            <>
              <span>{item}</span>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>-</button>
            </>
          )}
        </section>
      ))}

      <h4>"Made" by Leonardo.</h4>
    </div>
  );
}

export default App;
