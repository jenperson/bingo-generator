# Bingo Board Generator

An interactive web application for creating, customizing, and sharing Bingo boards. Built with React, TypeScript, and Vite.

## Features

- **AI-Powered Generation**: Generate custom Bingo boards using AI based on any theme or topic
- **Interactive Board**: Click squares to mark them, double-click to edit text
- **PDF Export**: Download your board as a high-quality PDF (A1 size)
- **Persistent Storage**: Your boards are automatically saved to localStorage
- **Free Space**: Traditional center square is always marked as "FREE SPACE"
- **Default AI Engineer Board**: Pre-loaded with tasks to level up as an AI Engineer

## API Requirements

The application expects a POST endpoint at `/generate-bingo` that:
- Accepts a JSON payload with a `prompt` field
- Returns either:
  - An array of 24 strings (FREE SPACE is automatically inserted at position 12)
  - An object with a `squares` property containing 25 strings

Example API response:
```json
[
  "Item 1",
  "Item 2",
  ...
  "Item 24"
]
```

## Usage

1. **Generate a Board**: Enter a theme in the text field and click "Generate Board"
2. **Mark Squares**: Click any square to mark it as complete
3. **Edit Squares**: Double-click any square (except FREE SPACE) to edit its text
4. **Download**: Click "Download My Board" to save as PDF

## Technologies

- React 18
- TypeScript
- Vite
- html2canvas
- jsPDF


## License

[Apache 2.0](LICENSE)