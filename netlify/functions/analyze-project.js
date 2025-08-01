// Netlify function for Groq AI integration
// This file should be placed in: netlify/functions/analyze-project.js

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { message, conversationHistory } = JSON.parse(event.body);

        // Groq API configuration
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        
        if (!GROQ_API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    error: 'Groq API key not configured',
                    response: 'I understand you want to build something! To help you better, could you tell me more about what you want to create?'
                })
            };
        }

        // Prepare conversation for Groq
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

        // Call Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192', // Fast and cost-effective
                messages: messages,
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error('Groq API request failed');
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ response: aiResponse })
        };

    } catch (error) {
        console.error('API Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ 
                error: 'Internal server error',
                response: 'I understand you want to build something! To help you better, could you tell me more about what you want to create?'
            })
        };
    }
}; 