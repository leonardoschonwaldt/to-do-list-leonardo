import React, { useState } from 'react';
import './TaskList.css';

interface TaskListProps {
  tasks: string[];
  editIndex: number;
  editInput: string;
  onEdit: (index: number) => void;
  onSaveEdit: (index: number, updatedValue: string) => void;
  onDelete: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, editIndex, editInput, onEdit, onSaveEdit, onDelete }) => {
  const [localEditInput, setLocalEditInput] = useState(editInput);

  const handleEdit = (index: number) => {
    setLocalEditInput(tasks[index]);
    onEdit(index);
  };

  const handleSaveEdit = (index: number) => {
    onSaveEdit(index, localEditInput);
  };

  return (
    <div className='taskList'>
      {tasks.map((item, index) => (
        <div className='taskContainer' key={index}>
          <div className='taskSection'>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={localEditInput}
                  onChange={(e) => setLocalEditInput(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>☺</button>
              </>
            ) : (
              <>
                <span>{item}</span>
                <button onClick={() => handleEdit(index)}>☺</button>
              </>
            )}
          </div>
          <button onClick={() => onDelete(index)}>☺</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;