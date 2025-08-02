// Simple test function to verify Netlify functions are working
exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ 
            message: 'Netlify function is working!',
            timestamp: new Date().toISOString()
        })
    };
}; 