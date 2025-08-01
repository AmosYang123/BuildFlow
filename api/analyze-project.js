// This would be deployed as a serverless function (Vercel, Netlify, etc.)
// For now, this is a placeholder showing how to integrate with OpenAI

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, conversationHistory } = req.body;

        // OpenAI API configuration
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        
        if (!OPENAI_API_KEY) {
            return res.status(500).json({ 
                error: 'OpenAI API key not configured',
                response: 'I understand you want to build something! To help you better, could you tell me more about what you want to create?'
            });
        }

        // Prepare conversation for OpenAI
        const messages = [
            {
                role: 'system',
                content: `You are BuildFlow AI, a helpful assistant that helps users build websites and applications. 

Your role is to:
1. Understand what type of project the user wants to build
2. Ask relevant follow-up questions to gather requirements
3. Provide helpful guidance and suggestions
4. Keep responses conversational and friendly
5. Use HTML formatting for emphasis (like <strong>bold</strong>)

Project types you can help with:
- Personal portfolios
- Business websites
- Blogs and content sites
- E-commerce stores
- SaaS applications
- Restaurant/food websites
- Nonprofit/community sites
- Landing pages
- Directory websites

Be conversational, ask follow-up questions, and help users clarify their project requirements.`
            },
            ...conversationHistory,
            {
                role: 'user',
                content: message
            }
        ];

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error('OpenAI API request failed');
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        return res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            response: 'I understand you want to build something! To help you better, could you tell me more about what you want to create?'
        });
    }
} 