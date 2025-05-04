
# UBS GIC Recruitment

A web application for UBS Global Investment Center's recruitment process that allows users to generate job specifications from templates and create interview questions based on job specs and CVs.

## Features

- Job specification generation from templates
- Upload of existing job specifications
- Resume/CV upload
- Interview question generation based on job specs and CVs
- UBS-styled UI components

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Webpack

### Backend
- FastAPI (Python)
- Azure OpenAI API integration

## Project Structure

```
├── src/
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── lib/                # Utility functions
│   └── hooks/              # Custom React hooks
├── backend/                # FastAPI backend
└── public/                 # Static assets
```

## Getting Started

### Frontend

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set environment variables:

```bash
export AZURE_OPENAI_API_KEY=your_key_here
export AZURE_OPENAI_ENDPOINT=your_endpoint_here
export AZURE_OPENAI_DEPLOYMENT=your_deployment_here
export AZURE_OPENAI_API_VERSION=2023-05-15
```

5. Start the backend server:

```bash
python main.py
```

## API Endpoints

- `GET /templates` - Get job templates
- `POST /job-spec/generate` - Generate a job specification
- `POST /job-spec/upload` - Upload an existing job specification
- `POST /interview-questions/generate` - Generate interview questions
- `POST /interview-questions/upload-cv` - Upload a CV

## Deployment

The application can be deployed to any environment that supports:
1. Node.js (for the React frontend)
2. Python (for the FastAPI backend)
3. Access to Azure OpenAI services

## License

This project is proprietary and confidential. Unauthorized copying, transferring, or reproduction of the contents of this project is strictly prohibited.

© 2025 UBS Global Investment Center. All rights reserved.
