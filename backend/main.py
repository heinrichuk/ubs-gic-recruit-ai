
from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uuid
import os
import logging
from datetime import datetime
import httpx
import json

app = FastAPI(title="UBS GIC Recruitment API", description="API for UBS GIC Recruitment application")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class JobTemplate(BaseModel):
    id: str
    name: str

class JobSpecRequest(BaseModel):
    template_id: str
    position: str
    requirements: str

class JobSpecResponse(BaseModel):
    id: str
    job_spec: str
    created_at: str

class QuestionRequest(BaseModel):
    job_spec: str
    cv_text: Optional[str] = None

class Question(BaseModel):
    id: int
    text: str
    category: str

class QuestionResponse(BaseModel):
    questions: List[Question]

# Configuration
AZURE_OPENAI_API_KEY = os.environ.get("AZURE_OPENAI_API_KEY", "")
AZURE_OPENAI_ENDPOINT = os.environ.get("AZURE_OPENAI_ENDPOINT", "")
AZURE_OPENAI_API_VERSION = os.environ.get("AZURE_OPENAI_API_VERSION", "2023-05-15")
AZURE_OPENAI_DEPLOYMENT = os.environ.get("AZURE_OPENAI_DEPLOYMENT", "gpt-4")

# Dependency for Azure OpenAI client
async def get_openai_client():
    return httpx.AsyncClient(
        base_url=AZURE_OPENAI_ENDPOINT,
        headers={
            "api-key": AZURE_OPENAI_API_KEY,
            "Content-Type": "application/json"
        },
        timeout=60.0
    )

# Routes
@app.get("/")
async def root():
    return {"message": "UBS GIC Recruitment API"}

@app.get("/templates", response_model=List[JobTemplate])
async def get_job_templates():
    templates = [
        {"id": "software-engineer", "name": "Software Engineer"},
        {"id": "data-scientist", "name": "Data Scientist"},
        {"id": "product-manager", "name": "Product Manager"},
        {"id": "ux-designer", "name": "UX Designer"},
        {"id": "financial-analyst", "name": "Financial Analyst"},
    ]
    return templates

@app.post("/job-spec/generate", response_model=JobSpecResponse)
async def generate_job_spec(
    request: JobSpecRequest, 
    openai_client: httpx.AsyncClient = Depends(get_openai_client)
):
    try:
        # Prepare prompt for OpenAI
        prompt = f"""
        Create a detailed job specification for a {request.position} role.
        
        Requirements:
        {request.requirements}
        
        The job specification should include:
        1. Overview of the role
        2. Key responsibilities
        3. Required skills and experience
        4. Education and qualifications
        5. Benefits and perks
        
        Format the response in Markdown.
        """
        
        # Call Azure OpenAI
        endpoint = f"/openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={AZURE_OPENAI_API_VERSION}"
        payload = {
            "messages": [
                {"role": "system", "content": "You are a professional HR assistant specializing in creating detailed job specifications for UBS Global Investment Center."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 1000
        }
        
        response = await openai_client.post(endpoint, json=payload)
        response.raise_for_status()
        result = response.json()
        job_spec = result["choices"][0]["message"]["content"]
        
        # Return the generated job spec
        return {
            "id": str(uuid.uuid4()),
            "job_spec": job_spec,
            "created_at": datetime.now().isoformat()
        }
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error occurred: {e}")
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except Exception as e:
        logger.error(f"Error generating job spec: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate job specification: {str(e)}")

@app.post("/job-spec/upload", response_model=JobSpecResponse)
async def upload_job_spec(file: UploadFile = File(...)):
    try:
        # In a real application, you would process and parse the file
        # For this example, we'll just return a simplified response
        content = await file.read()
        
        return {
            "id": str(uuid.uuid4()),
            "job_spec": f"Uploaded job spec: {file.filename}",
            "created_at": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error uploading job spec: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to upload job specification: {str(e)}")

@app.post("/interview-questions/generate", response_model=QuestionResponse)
async def generate_interview_questions(
    request: QuestionRequest,
    openai_client: httpx.AsyncClient = Depends(get_openai_client)
):
    try:
        # Prepare prompt for OpenAI
        cv_context = f"CV details: {request.cv_text}" if request.cv_text else "No CV provided, focus on job requirements only."
        
        prompt = f"""
        Generate 10 interview questions for a candidate based on the following job specification:
        
        {request.job_spec}
        
        {cv_context}
        
        For each question, assign a category from: Technical, Experience, Methodology, Culture Fit, 
        Professional Development, Adaptability, Communication, Problem Solving, Process, or Career Planning.
        
        Format as a JSON array with objects containing 'id', 'text', and 'category' fields.
        """
        
        # Call Azure OpenAI
        endpoint = f"/openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={AZURE_OPENAI_API_VERSION}"
        payload = {
            "messages": [
                {"role": "system", "content": "You are a professional HR assistant specializing in creating tailored interview questions for UBS Global Investment Center."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 1000
        }
        
        response = await openai_client.post(endpoint, json=payload)
        response.raise_for_status()
        result = response.json()
        content = result["choices"][0]["message"]["content"]
        
        # Parse the JSON response
        # Note: In a production environment, add better error handling for JSON parsing
        questions_data = json.loads(content)
        
        # Return the generated questions
        return {"questions": questions_data}
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error occurred: {e}")
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse questions: {str(e)}")
    except Exception as e:
        logger.error(f"Error generating questions: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate interview questions: {str(e)}")

@app.post("/interview-questions/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    try:
        # In a real application, you would process and extract text from the CV
        # For this example, we'll just return a confirmation
        content = await file.read()
        
        return {"message": f"CV uploaded: {file.filename}"}
    except Exception as e:
        logger.error(f"Error uploading CV: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to upload CV: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
