import { useState, useEffect, useRef } from 'react';

interface BingoSquareProps {
  text: string;
  isMarked: boolean;
  onToggle: () => void;
  onTextChange: (newText: string) => void;
}

function BingoSquare({ text, isMarked, onToggle, onTextChange }: BingoSquareProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [fontSize, setFontSize] = useState(0.9);
  const textRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isEditing && textRef.current && buttonRef.current) {
      const button = buttonRef.current;
      const span = textRef.current;
      
      // Reset to default size
      let size = 0.9;
      span.style.fontSize = `${size}rem`;
      
      // Reduce font size if text overflows
      while (
        (span.scrollHeight > button.clientHeight - 32 || 
         span.scrollWidth > button.clientWidth - 32) && 
        size > 0.5
      ) {
        size -= 0.05;
        span.style.fontSize = `${size}rem`;
      }
      
      setFontSize(size);
    }
  }, [text, isEditing]);

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
      ref={buttonRef}
      className={`bingo-square ${isMarked ? 'marked' : ''}`}
      onClick={onToggle}
      onDoubleClick={handleDoubleClick}
    >
      <span ref={textRef} style={{ fontSize: `${fontSize}rem` }}>
        {text}
      </span>
    </button>
  );
}

export default BingoSquare;
