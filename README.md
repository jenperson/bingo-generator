# Bingo Board Generator

An interactive web application for creating, customizing, and sharing Bingo boards. Built with React, TypeScript, and Vite. This project accompanies the [Bingo Generator Backend](https://github.com/jenperson/bingo-generator-backend).

The project can be run locally or easily [deployed on Koyeb](#deploy-to-koyeb).

## Features

- **AI-Powered Generation**: Generate custom Bingo boards using AI based on any theme or topic
- **Interactive Board**: Click squares to mark them, double-click to edit text
- **PDF Export**: Download your board as a high-quality PDF (A1 size)
- **Persistent Storage**: Your boards are automatically saved to localStorage
- **Free Space**: Traditional center square is always marked as "FREE SPACE"
- **Default AI Engineer Board**: Pre-loaded with tasks to level up as an AI Engineer

## Setup

### Environment Variables

Create a `.env` file in the root directory with the following variable:

```env
VITE_API_ENDPOINT=http://localhost:3000
```

Replace `http://localhost:3000` with your actual API endpoint URL.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

**Note**: After adding or modifying the `.env` file, restart the dev server for changes to take effect.

### Build for Production

```bash
npm run build
```
## Usage

## Deploy to Koyeb

To deploy the complete application stack to Koyeb, deploy the following components in order:

1. [LLM Model](#1-deploy-the-model)
2. [Backend API](#2-deploy-the-backend)
3. [Frontend](#3-deploy-the-frontend)

### 1. Deploy the Model

Deploy an LLM from Koyeb's [Available One-Click Deploy Models](https://www.koyeb.com/deploy/category/model). [Llama 3.1 8B Instruct](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy) works well for this use case.

[![Deploy Llama 3.1 8B Instruct to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy)

Once deployed, copy the public URL (e.g., `https://<app-name>.koyeb.app/`) for the next step.

### 2. Deploy the Backend

Deploy the backend API using the button below. You'll need the model URL from step 1.

[![Deploy the Bingo Backend to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator-backend&type=git&repository=jenperson%2Fbingo-generator-backend&branch=main&instance_type=small&regions=par&env%5BMODEL_NAME%5D=meta-llama%2FLlama-3.1-8B-Instruct&env%5BMODEL_URL%5D=YOUR_MODEL_URL%2F&ports=3000%3Bhttp%3B%2F&hc_protocol%5B3000%5D=tcp&hc_grace_period%5B3000%5D=5&hc_interval%5B3000%5D=30&hc_restart_limit%5B3000%5D=3&hc_timeout%5B3000%5D=5&hc_path%5B3000%5D=%2F&hc_method%5B3000%5D=get)

**Environment Variables:**
- `MODEL_URL`: The URL from your deployed model (e.g., `https://<model-app-name>.koyeb.app/`)
- `MODEL_NAME`: `meta-llama/Llama-3.1-8B-Instruct` (or your chosen model)

Copy the backend public URL for the next step.

### 3. Deploy the Frontend

Deploy the frontend using the button below. You'll need the backend URL from step 2.

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator&type=git&repository=jenperson%2Fbingo-generator&branch=main&instance_type=small&regions=par&env%5BVITE_API_ENDPOINT%5D=YOUR_ENDPOINT)

**Environment Variable:**
- `VITE_API_ENDPOINT`: The URL from your deployed backend (e.g., `https://<backend-app-name>.koyeb.app/`)

Your Bingo Generator is now fully deployed!

The app will be served on `http://localhost:8000/`

## License

[Apache 2.0](LICENSE)