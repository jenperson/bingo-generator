import { useState, useEffect } from 'react';
import BingoSquare from './BingoSquare';

interface BingoSquare {
  id: number;
  text: string;
  isMarked: boolean;
}

interface BingoBoardProps {
  squares: string[];
}

function BingoBoard({ squares }: BingoBoardProps) {
  const [bingoSquares, setBingoSquares] = useState<BingoSquare[]>(
    squares.map((text, index) => ({
      id: index,
      text: index === 12 ? 'FREE SPACE' : text,
      isMarked: index === 12,
    }))
  );

  // Update board when new squares are generated, preserving user edits
  useEffect(() => {
    setBingoSquares((prevSquares) =>
      squares.map((text, index) => {
        const prevSquare = prevSquares[index];
        // Always keep FREE SPACE at position 12
        if (index === 12) {
          return {
            id: index,
            text: 'FREE SPACE',
            isMarked: true,
          };
        }
        // If the square text hasn't been edited by user, update it with new generated text
        // Otherwise keep the user's edited text
        return {
          id: index,
          text: text,
          isMarked: prevSquare?.isMarked || false,
        };
      })
    );
  }, [squares]);

  const toggleSquare = (id: number) => {
    // Don't allow toggling the free space
    if (id === 12) return;
    
    setBingoSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.id === id ? { ...square, isMarked: !square.isMarked } : square
      )
    );
  };

  const updateSquareText = (id: number, newText: string) => {
    // Don't allow editing the free space text
    if (id === 12) return;
    
    setBingoSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.id === id ? { ...square, text: newText } : square
      )
    );
  };

  return (
    <div className="bingo-board">
      {bingoSquares.map((square) => (
        <BingoSquare
          key={square.id}
          text={square.text}
          isMarked={square.isMarked}
          onToggle={() => toggleSquare(square.id)}
          onTextChange={(newText) => updateSquareText(square.id, newText)}
        />
      ))}
    </div>
  );
}

export default BingoBoard;
