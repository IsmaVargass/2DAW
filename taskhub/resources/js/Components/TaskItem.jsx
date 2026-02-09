import React, { useState, useRef, useEffect } from 'react';

export default function TaskItem({ task, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditValue(task.title);
  };

  const handleBlur = () => {
    if (editValue.trim().length > 0) {
      onUpdate(task.id, editValue);
    } else {
      setEditValue(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group">
      {/* Checkbox */}
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        />
      </div>

      {/* Título de la tarea */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            className="w-full px-3 py-2 border border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        ) : (
          <p
            onClick={handleTitleClick}
            className={`cursor-pointer px-3 py-2 rounded-md transition-all ${
              task.completed
                ? 'line-through text-slate-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {task.title}
          </p>
        )}
      </div>

      {/* Indicador visual para edición */}
      {!isEditing && (
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-slate-400 italic">Click para editar</span>
        </div>
      )}
    </div>
  );
}
