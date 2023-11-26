import React, { useState } from 'react';

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
    <div>
      <input
        placeholder='Add tasks...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => { onAddTask(input); setInput(''); }}>+</button>
    </div>
  );
};

export default TaskInput;