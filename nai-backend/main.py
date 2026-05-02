from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents import Runner
from agent import agent
from config import settings
import logging
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="NAI Backend",
    version="1.0.0",
    description="Nahead's AI Portfolio Assistant powered by OpenAI Agents SDK and Gemini",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"
    timezone: str | None = None
    local_hour: int | None = None
    language: str | None = None
    country: str | None = None
    city: str | None = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


# Root endpoint
@app.get("/")
async def root():
    """API information endpoint"""
    return {
        "name": "NAI",
        "status": "online",
        "version": "1.0.0",
        "developer": "Nahead Jokhio",
        "description": "AI Portfolio Assistant powered by Gemini",
    }


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "ok",
        "agent": "NAI",
        "model": settings.gemini_model,
        "environment": settings.environment,
    }


# Chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint for NAI assistant

    Args:
        request: ChatRequest with message and optional session_id

    Returns:
        ChatResponse with AI response and session_id

    Raises:
        HTTPException: If message is empty or API fails
    """
    try:
        # Validate message
        if not request.message or not request.message.strip():
            raise HTTPException(
                status_code=400,
                detail="Message cannot be empty"
            )

        logger.info(f"Received message from session {request.session_id}: {request.message[:50]}...")

        # Build context string for agent
        context_parts = []
        if request.country:
            context_parts.append(f"Visitor from: {request.country}")
            if request.city and request.city != "Unknown":
                context_parts[-1] += f", {request.city}"
        if request.timezone:
            context_parts.append(f"Timezone: {request.timezone}")
        if request.local_hour is not None:
            context_parts.append(f"Local time: {request.local_hour}:00")
        if request.language:
            context_parts.append(f"Language: {request.language}")

        context_info = " | ".join(context_parts) if context_parts else "No context available"

        # Prepare input with context
        agent_input = f"[CONTEXT: {context_info}]\n\nUser message: {request.message}"

        # Run agent with the message using correct Runner pattern
        result = await Runner.run(agent, input=agent_input)

        # Extract response from result
        response_text = result.final_output if hasattr(result, 'final_output') else str(result)

        logger.info(f"Generated response for session {request.session_id}")

        return ChatResponse(
            response=response_text,
            session_id=request.session_id
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Sorry, I encountered an error. Please try again in a moment."
        )


# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {
        "error": "Endpoint not found",
        "message": "The requested endpoint does not exist",
        "available_endpoints": ["/", "/health", "/chat"]
    }


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {str(exc)}", exc_info=True)
    return {
        "error": "Internal server error",
        "message": "Something went wrong. Please try again later."
    }


# Run server
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True if settings.environment == "development" else False,
        log_level="info"
    )

