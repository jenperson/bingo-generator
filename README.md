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

## Deploy app to Koyeb

To deploy the app to Koyeb, you can deploy any or all of these three compnents:
- LLM
- Backend API using NestJS
- Frontend using React and Vite

### Deploy the Frontend on Koyeb

The frontend application requires a backend URL as an environment variable, so it's a good idea to [deploy the backend app first](#deploy-the-backend-on-koyeb). Once the backend is deployed, you will have what you need to deploy the frontend.

Use the following button to deploy the frontend:

**When deploying, go to the Environment variables and files section and provide the environment variable value for VITE_API_ENDPOINT**
VITE_API_ENDPOINT: https://<app-name>.koyeb.app/ (replace <app-name> with the value from your *backend* project)

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator&type=git&repository=jenperson%2Fbingo-generator&branch=main&instance_type=small&regions=par&env%5BVITE_API_ENDPOINT%5D=YOUR_ENDPOINT)

### Deploy the Model on Koyeb

To deploy a model on Koyeb, choose a model from the [Available One-Click Deploy Models](https://www.koyeb.com/deploy/category/model). You can also deploy any model that runs on vLLM; you'll just have to set up some configuration yourself.

[Llama 3.1 8B Instruct](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy) works well for this use case. Click the following button to deploy the model:

[![Deploy Llama 3.1 8B Instruct to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy)

Once deployed, use the provided public URL **ie https://<app-name>.koyeb.app/** to access the model.

### Deploy the Backend on Koyeb

To deploy the backend on Koyeb, you need to provide a model URL for the LLM you will be using. 

Click the following button deploy the backend:

**When deploying, go to the Environment variables and files section and provide the environment variable value for MODEL_URL and MODEL_NAME.**
MODEL_URL: https://<app-name>.koyeb.app/ (replace <app-name> with the value from your project)
MODEL_NAME: meta-llama/Llama-3.1-8B-Instruct (change if you use an alternative model)

[![Deploy the Bingo Backend to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator-backend&type=git&repository=jenperson%2Fbingo-generator-backend&branch=main&instance_type=small&regions=par&env%5BMODEL_NAME%5D=meta-llama%2FLlama-3.1-8B-Instruct&env%5BMODEL_URL%5D=YOUR_MODEL_URL%2F&ports=3000%3Bhttp%3B%2F&hc_protocol%5B3000%5D=tcp&hc_grace_period%5B3000%5D=5&hc_interval%5B3000%5D=30&hc_restart_limit%5B3000%5D=3&hc_timeout%5B3000%5D=5&hc_path%5B3000%5D=%2F&hc_method%5B3000%5D=get)

With the backend deployed, take note of the the URL of the backend, and then [deploy the frontend](#deploy-the-frontend-on-koyeb).

## License

[Apache 2.0](LICENSE)