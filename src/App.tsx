import { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([""]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('@storagekey')

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const handleRegister = (newTask: string) => {
    if (!newTask) {
      alert('Fill in the task add field.');
      return;
    }

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('@storagekey', JSON.stringify(updatedTasks));
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_task, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('@storagekey', JSON.stringify(updatedTasks));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditInput(tasks[index]);
  };

  const handleSaveEdit = (index: number, updatedValue: string) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? updatedValue : task));
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditInput('');
    localStorage.setItem('@storagekey', JSON.stringify(updatedTasks));
  };

  return (
    <div className='container'>
      <h1>To-do List</h1>
      <TaskInput onAddTask={handleRegister} />

      <TaskList
        tasks={tasks}
        editIndex={editIndex}
        editInput={editInput}
        onEdit={handleEdit}
        onSaveEdit={handleSaveEdit}
        onDelete={handleDelete}
      />

      <h4>"Made" by Leonardo.</h4>
    </div>
  );
}

export default App;