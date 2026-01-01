import { useState } from 'react';

interface BingoSquareProps {
  text: string;
  isMarked: boolean;
  onToggle: () => void;
  onTextChange: (newText: string) => void;
}

function BingoSquare({ text, isMarked, onToggle, onTextChange }: BingoSquareProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditText(text);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editText.trim()) {
      onTextChange(editText.trim());
    } else {
      setEditText(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(text);
    }
  };

  if (isEditing) {
    return (
      <div className={`bingo-square ${isMarked ? 'marked' : ''} editing`}>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bingo-square-input"
        />
      </div>
    );
  }

  return (
    <button
      className={`bingo-square ${isMarked ? 'marked' : ''}`}
      onClick={onToggle}
      onDoubleClick={handleDoubleClick}
    >
      {text}
    </button>
  );
}

export default BingoSquare;
