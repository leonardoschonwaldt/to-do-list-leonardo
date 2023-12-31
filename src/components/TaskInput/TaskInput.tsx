import React, { useState } from 'react';
import './TaskInput.css'

interface TaskInputProps {
  onAddTask: (newTask: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAddTask(input);
      setInput('');
    }
  };
  
  return (
    <div className='addTaskInput'>
      <input
        placeholder='Add tasks...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => { onAddTask(input); setInput(''); }}>☺</button>
    </div>
  );
};

export default TaskInput;