import { useState, useEffect, useRef } from 'react'
import './App.css'
import BingoBoard from './components/BingoBoard'
import BingoGenerator from './components/BingoGenerator'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const DEFAULT_SQUARES = [
  'Deploy a model on Koyeb',
  'Build a RAG system',
  'Deploy a model to production',
  'Implement prompt engineering',
  'Create an AI agent',
  'Use vector databases',
  'Optimize model inference',
  'Build a chatbot',
  'Implement few-shot learning',
  'Work with embeddings',
  'Use LangChain framework',
  'Experiment with GPT-4',
  'FREE SPACE',
  'Build multimodal AI',
  'Implement retrieval systems',
  'Use model quantization',
  'Create synthetic datasets',
  'Build evaluation pipelines',
  'Deploy with FastAPI',
  'Use AI observability tools',
  'Implement function calling',
  'Build streaming responses',
  'Use semantic search',
  'Create AI workflows',
  'Contribute to AI open source'
];

function App() {
  const [bingoSquares, setBingoSquares] = useState<string[]>(() => {
    const saved = localStorage.getItem('bingoSquares');
    return saved ? JSON.parse(saved) : DEFAULT_SQUARES;
  });
  const [isLoading, setIsLoading] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Persist bingoSquares to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bingoSquares', JSON.stringify(bingoSquares));
  }, [bingoSquares]);

  const handleDownloadPDF = async () => {
    if (!boardRef.current) return;

    try {
      // Get the actual bingo board element (child of the ref)
      const boardElement = boardRef.current.querySelector('.bingo-board') as HTMLElement;
      if (!boardElement) return;

      console.log('Board element dimensions:', {
        offsetWidth: boardElement.offsetWidth,
        offsetHeight: boardElement.offsetHeight,
        scrollWidth: boardElement.scrollWidth,
        scrollHeight: boardElement.scrollHeight,
      });

      const canvas = await html2canvas(boardElement, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        width: boardElement.scrollWidth,
        height: boardElement.scrollHeight,
      });

      console.log('Canvas dimensions:', {
        width: canvas.width,
        height: canvas.height,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a1',
      });

      const pdfWidth = 594; // A1 width in mm
      const pdfHeight = 841; // A1 height in mm

      // Calculate scaling to fit image within PDF with padding
      const padding = 50; // padding on each side
      const availableWidth = pdfWidth - (padding * 2);
      const availableHeight = pdfHeight - (padding * 2);
      
      const imgRatio = canvas.width / canvas.height;
      const availableRatio = availableWidth / availableHeight;
      
      let scaledWidth, scaledHeight;
      
      if (imgRatio > availableRatio) {
        // Image is wider, fit to width
        scaledWidth = availableWidth;
        scaledHeight = availableWidth / imgRatio;
      } else {
        // Image is taller, fit to height
        scaledHeight = availableHeight;
        scaledWidth = availableHeight * imgRatio;
      }

      console.log('PDF positioning:', {
        scaledWidth,
        scaledHeight,
        xOffset: (pdfWidth - scaledWidth) / 2,
        yOffset: (pdfHeight - scaledHeight) / 2,
      });

      // Center the image
      const xOffset = (pdfWidth - scaledWidth) / 2;
      const yOffset = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);
      pdf.save('bingo-board.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}generate-bingo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate bingo board');
        }

        const data = await response.json();
        console.log(`API Response (attempt ${attempts + 1}):`, data);
        console.log('Data type:', typeof data);
        console.log('Is array?:', Array.isArray(data));
        
        if (data.squares && Array.isArray(data.squares) && data.squares.length === 25) {
          console.log('Setting squares from data.squares:', data.squares);
          setBingoSquares(data.squares);
          setIsLoading(false);
          return; // Success, exit the function
        } else if (Array.isArray(data) && data.length === 24) {
          console.log('Setting squares from data array:', data);
          // Insert FREE SPACE at position 12
          const squaresWithFreeSpace = [
            ...data.slice(0, 12),
            'FREE SPACE',
            ...data.slice(12)
          ];
          console.log('Squares with FREE SPACE inserted:', squaresWithFreeSpace);
          setBingoSquares(squaresWithFreeSpace);
          setIsLoading(false);
          return; // Success, exit the function
        } else {
          console.log(`Data format not recognized on attempt ${attempts + 1}. Expected 25 or 24 squares, got ${Array.isArray(data) ? data.length : 'non-array'}.`);
          attempts++;
          
          if (attempts >= maxAttempts) {
            alert(`Failed to generate a valid bingo board after ${maxAttempts} attempts. The API returned an incorrect number of squares. Please try again.`);
          }
        }
      } catch (error) {
        console.error(`Error generating bingo board (attempt ${attempts + 1}):`, error);
        attempts++;
        
        if (attempts >= maxAttempts) {
          alert('Failed to generate bingo board after multiple attempts. Please check your connection and try again.');
        }
      }
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <h1>Bingo Game</h1>
      <BingoGenerator onGenerate={handleGenerate} isLoading={isLoading} />
      <div ref={boardRef}>
        <BingoBoard squares={bingoSquares} />
      </div>
      <button onClick={handleDownloadPDF} className="download-button">
        Download My Board
      </button>
    </>
  )
}

export default App
