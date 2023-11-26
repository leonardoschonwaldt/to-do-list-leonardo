import React, { useState } from 'react';

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
    <div>
      {tasks.map((item, index) => (
        <section key={index}>
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={localEditInput}
                onChange={(e) => setLocalEditInput(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(index)}>Save</button>
            </>
          ) : (
            <>
              <span>{item}</span>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>-</button>
            </>
          )}
        </section>
      ))}
    </div>
  );
};

export default TaskList;