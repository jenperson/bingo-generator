import { useState } from 'react';

interface BingoGeneratorProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

function BingoGenerator({ onGenerate, isLoading }: BingoGeneratorProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      await onGenerate(prompt.trim());
    }
  };

  return (
    <div className="bingo-generator">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a theme for your bingo board..."
          className="generator-input"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="generator-button"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate Board'}
        </button>
      </form>
      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Generating...</p>
        </div>
      )}
    </div>
  );
}

export default BingoGenerator;
