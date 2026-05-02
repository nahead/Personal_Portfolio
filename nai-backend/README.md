# NAI Backend — Nahead's AI Portfolio Assistant

Production-ready FastAPI backend powered by OpenAI Agents SDK and Google Gemini.

## 🚀 Features

- **Intelligent AI Agent**: Built with OpenAI Agents SDK
- **Powered by Gemini**: Uses Google's Gemini 2.0 Flash model
- **Bilingual Support**: Responds in English or Urdu based on user input
- **Production Ready**: Error handling, logging, CORS configured
- **Fast & Scalable**: FastAPI with async support

## 📦 Local Development

### Prerequisites

- Python 3.10 or higher
- Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Setup

1. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Edit .env and add your Gemini API key
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the server**
   ```bash
   python main.py
   ```

   Server will start at `http://localhost:8000`

5. **Test the API**
   ```bash
   # Health check
   curl http://localhost:8000/health
   
   # Chat test
   curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What can Nahead build?"}'
   ```

## 🌐 Deploy to Render.com

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the repository containing this code

### Step 3: Configure Build Settings

**Basic Settings:**
- **Name**: `nai-backend` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `nai-backend`

**Build & Deploy:**
- **Runtime**: `Python 3`
- **Build Command**: 
  ```bash
  pip install -r requirements.txt
  ```
- **Start Command**: 
  ```bash
  uvicorn main:app --host 0.0.0.0 --port $PORT
  ```

### Step 4: Add Environment Variables

Click **"Environment"** tab and add:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Your Gemini API key from Google AI Studio |
| `GEMINI_BASE_URL` | `https://generativelanguage.googleapis.com/v1beta/openai/` |
| `GEMINI_MODEL` | `gemini-2.0-flash-exp` |
| `ENVIRONMENT` | `production` |
| `ALLOWED_ORIGINS` | `["*"]` (or your frontend URL for security) |

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Your backend will be live at: `https://your-service-name.onrender.com`

### Step 6: Get Your Backend URL

After deployment completes:
1. Copy the URL from Render dashboard (e.g., `https://nai-backend-xyz.onrender.com`)
2. Test it: `https://your-url.onrender.com/health`
3. You should see: `{"status":"ok","agent":"NAI","model":"gemini-2.0-flash-exp"}`

### Step 7: Update Frontend Environment Variable

In your Next.js project (Vercel):

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/Update:
   ```
   NEXT_PUBLIC_NAI_BACKEND_URL=https://your-render-url.onrender.com
   ```
3. Redeploy your frontend

## 📡 API Endpoints

### GET `/`
Returns API information
```json
{
  "name": "NAI",
  "status": "online",
  "version": "1.0.0",
  "developer": "Nahead Jokhio"
}
```

### GET `/health`
Health check endpoint
```json
{
  "status": "ok",
  "agent": "NAI",
  "model": "gemini-2.0-flash-exp"
}
```

### POST `/chat`
Main chat endpoint

**Request:**
```json
{
  "message": "What can Nahead build?",
  "session_id": "user-123"
}
```

**Response:**
```json
{
  "response": "Nahead specializes in AI-powered full-stack applications...",
  "session_id": "user-123"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Gemini API key (required) | - |
| `GEMINI_BASE_URL` | Gemini OpenAI-compatible endpoint | `https://generativelanguage.googleapis.com/v1beta/openai/` |
| `GEMINI_MODEL` | Model to use | `gemini-2.0-flash-exp` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `["*"]` |
| `ENVIRONMENT` | Environment mode | `development` |

### Getting Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click **"Create API Key"**
4. Copy the key and add to your `.env` file

## 🐛 Troubleshooting

### "Module not found" error
```bash
pip install -r requirements.txt
```

### "GEMINI_API_KEY not found"
Make sure `.env` file exists and contains your API key:
```bash
GEMINI_API_KEY=your_key_here
```

### CORS errors in browser
Update `ALLOWED_ORIGINS` in `.env` to include your frontend URL:
```bash
ALLOWED_ORIGINS=["https://your-frontend.vercel.app"]
```

### Render deployment fails
- Check build logs in Render dashboard
- Verify `requirements.txt` is in `nai-backend` folder
- Ensure Python version is 3.10+

### API returns 500 error
- Check Render logs for detailed error
- Verify Gemini API key is valid
- Test locally first: `python main.py`

## 📊 Monitoring

### Render Dashboard
- View logs: Render Dashboard → Your Service → Logs
- Monitor metrics: CPU, Memory, Response times
- Set up alerts for downtime

### Health Check
Set up monitoring with:
- UptimeRobot (free)
- Pingdom
- StatusCake

Monitor: `https://your-url.onrender.com/health`

## 🔒 Security Best Practices

1. **API Key Security**
   - Never commit `.env` to git
   - Use environment variables in production
   - Rotate keys periodically

2. **CORS Configuration**
   - In production, set specific origins instead of `["*"]`
   - Example: `["https://naheadjokhio.vercel.app"]`

3. **Rate Limiting**
   - Consider adding rate limiting for production
   - Use FastAPI middleware or Cloudflare

## 📝 License

MIT License - Built by Nahead Jokhio

## 🤝 Support

For issues or questions:
- GitHub Issues: [Your repo URL]
- Email: nahead.jokhio@example.com

---

**Built with:**
- FastAPI
- OpenAI Agents SDK
- Google Gemini API
- Python 3.10+

