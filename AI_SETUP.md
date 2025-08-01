# AI Integration Setup Guide

## Current Status
The BuildFlow project now has the infrastructure for real AI integration, but needs to be deployed with a backend service to work with OpenAI.

## What's Implemented

✅ **Frontend AI Chat Interface** - Bolt.new-style chat UI  
✅ **API Integration Code** - Ready to call OpenAI API  
✅ **Conversation History** - Maintains context across messages  
✅ **Smart Fallback** - Works even if AI is unavailable  
✅ **Loading States** - Shows spinner during AI processing  

## To Enable Real AI

### Option 1: Deploy to Vercel (Recommended)

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Vercel will automatically detect it as a static site

3. **Add OpenAI API Key**:
   - In Vercel dashboard, go to your project settings
   - Add environment variable: `OPENAI_API_KEY`
   - Set value to your OpenAI API key

4. **Create API Route**:
   - Create `api/analyze-project.js` in your repository
   - Vercel will automatically deploy it as a serverless function

### Option 2: Deploy to Netlify

1. **Fork this repository**
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Import your repository
   - Set build command: `echo "Static site"`
   - Set publish directory: `.`

3. **Add OpenAI API Key**:
   - In Netlify dashboard, go to Site settings → Environment variables
   - Add: `OPENAI_API_KEY` with your API key

4. **Create Netlify Function**:
   - Create `netlify/functions/analyze-project.js`
   - Use the same code as the API file

### Option 3: Use a Different AI Service

You can easily swap OpenAI for other AI services:

- **Anthropic Claude** - Replace OpenAI API calls
- **Google Gemini** - Use Google's AI API
- **Local AI** - Run AI models locally
- **Custom AI** - Your own trained model

## API Key Setup

1. **Get OpenAI API Key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Sign up/login and go to API Keys
   - Create a new API key

2. **Add to Environment**:
   - Set as environment variable: `OPENAI_API_KEY`
   - Never commit API keys to code

## Testing

Once deployed with API key:

1. **Visit your deployed site**
2. **Click "Start with Your Own Idea"**
3. **Type any project description**
4. **AI will respond intelligently** with follow-up questions

## Current Fallback

If AI is not available, the system uses:
- **Smart keyword analysis** for common project types
- **Contextual responses** based on detected project type
- **Graceful degradation** - still works without AI

## Cost Considerations

- **OpenAI GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **Typical conversation**: 50-200 tokens per message
- **Estimated cost**: $0.01-0.05 per user session

## Next Steps

1. **Deploy with backend** (Vercel/Netlify)
2. **Add your OpenAI API key**
3. **Test the AI responses**
4. **Customize the AI prompts** for better responses
5. **Add more project types** and workflows

The foundation is ready - just needs deployment with a backend service! 