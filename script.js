let selectedProject = null;

function selectProject(projectId) {
    console.log('Card clicked! Project ID:', projectId);
    // Go directly to next step without delay or feedback
    showNextStep(projectId);
}



function showNextStep(projectId) {
    if (projectId === 'custom-idea') {
        showCustomIdeaStep();
    } else {
        // For other project types, show the generic next step
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="next-step">
                <div class="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                </div>
                <h1>Great Choice!</h1>
                <p>You've selected <span class="highlight">${getProjectTitle(projectId)}</span></p>
                
                <div class="next-step-card">
                    <h2>Next Steps</h2>
                    <p>We're now customizing your workflow based on your project type. You'll be guided through specialized questions and tools to bring your vision to life.</p>
                    
                    <div class="progress-indicators">
                        <div class="progress-item completed">
                            <div class="progress-dot"></div>
                            <span>Project Selected</span>
                        </div>
                        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <div class="progress-item active">
                            <div class="progress-dot"></div>
                            <span>Customizing Workflow</span>
                        </div>
                    </div>
                </div>
                
                <button onclick="goBack()" class="back-button">
                    ← Back to Project Selection
                </button>
            </div>
        `;
    }
}

function showCustomIdeaStep() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="ai-chat-interface">
            <div class="chat-header">
                <div class="ai-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                        <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                    </svg>
                </div>
                <div class="chat-title">
                    <h1>BuildFlow AI Assistant</h1>
                    <p>Tell me about your project idea and I'll help you build it</p>
                </div>
            </div>
            
            <div class="chat-messages" id="chat-messages">
                <div class="message ai-message">
                    <div class="message-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"/>
                            <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                            <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                        </svg>
                    </div>
                    <div class="message-content">
                        <p>Hi! I'm here to help you build your website. Tell me about your project idea - what do you want to create? You can describe it however you'd like!</p>
                    </div>
                </div>
            </div>
            
            <div class="chat-input-container">
                <div class="chat-input-wrapper">
                    <textarea 
                        id="chat-input" 
                        placeholder="Describe your project idea... (e.g., 'I want to build a portfolio website for my photography business' or 'I need a blog for my cooking recipes')"
                        class="chat-input"
                        rows="1"
                    ></textarea>
                    <button id="send-button" class="send-button" onclick="sendMessage()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    </button>
                </div>
                <div class="input-hint">
                    Press Enter to send • Shift+Enter for new line
                </div>
            </div>
            
            <div class="chat-actions">
                <button onclick="goBack()" class="btn-secondary">
                    ← Back to Project Selection
                </button>
            </div>
        </div>
    `;
    
    // Focus on input and set up enter key handling
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    
    chatInput.focus();
    
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Test if Netlify functions are working
    testNetlifyFunction();
}

async function testNetlifyFunction() {
    try {
        const response = await fetch('/.netlify/functions/test');
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Netlify functions are working:', data);
        } else {
            console.log('❌ Netlify function test failed:', response.status);
        }
    } catch (error) {
        console.log('❌ Netlify function test error:', error);
    }
}
}

function getProjectTitle(projectId) {
    const card = document.querySelector(`[onclick="selectProject('${projectId}')"]`);
    return card ? card.querySelector('h3').textContent : 'Project';
}

function goBack() {
    location.reload();
}

async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get AI response
        const aiResponse = await analyzeProject(message);
        hideTypingIndicator();
        addMessage(aiResponse, 'ai');
    } catch (error) {
        hideTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    }
}

function addMessage(content, sender) {
    const chatMessages = document.getElementById('chat-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                </svg>
            </div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function analyzeProject(userMessage) {
    try {
        // Show loading state
        const sendButton = document.getElementById('send-button');
        const originalContent = sendButton.innerHTML;
        sendButton.innerHTML = '<div class="loading-spinner"></div>';
        sendButton.disabled = true;
        
        // Test if Netlify function exists first
        console.log('Attempting to call Netlify function...');
        
        // Call Groq API via Netlify function
        const response = await fetch('/.netlify/functions/analyze-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                conversationHistory: getConversationHistory()
            })
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Restore button
        sendButton.innerHTML = originalContent;
        sendButton.disabled = false;
        
        return data.response;
        
    } catch (error) {
        console.error('AI API Error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        
        // Restore button
        const sendButton = document.getElementById('send-button');
        sendButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
        sendButton.disabled = false;
        
        // Fallback to smart keyword analysis
        return getSmartFallbackResponse(userMessage);
    }
}

function getConversationHistory() {
    const messages = document.querySelectorAll('.message');
    const history = [];
    
    messages.forEach(message => {
        if (message.classList.contains('user-message')) {
            const content = message.querySelector('.message-content p').textContent;
            history.push({ role: 'user', content });
        } else if (message.classList.contains('ai-message') && !message.classList.contains('typing-indicator')) {
            const content = message.querySelector('.message-content p').innerHTML;
            history.push({ role: 'assistant', content });
        }
    });
    
    return history;
}

function getSmartFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // More sophisticated keyword analysis as fallback
    const projectTypes = {
        portfolio: ['portfolio', 'personal', 'resume', 'cv', 'showcase', 'work', 'projects'],
        blog: ['blog', 'article', 'content', 'writing', 'publish', 'share'],
        business: ['business', 'company', 'startup', 'ecommerce', 'shop', 'store', 'commercial'],
        restaurant: ['restaurant', 'cafe', 'food', 'menu', 'dining', 'kitchen'],
        nonprofit: ['nonprofit', 'charity', 'community', 'education', 'volunteer', 'donation'],
        saas: ['saas', 'software', 'app', 'application', 'platform', 'tool'],
        landing: ['landing', 'marketing', 'conversion', 'sales', 'lead'],
        directory: ['directory', 'listing', 'catalog', 'database', 'search']
    };
    
    for (const [type, keywords] of Object.entries(projectTypes)) {
        if (keywords.some(keyword => message.includes(keyword))) {
            return getTypeSpecificResponse(type, userMessage);
        }
    }
    
    // If no specific type detected, ask clarifying questions
    return `I see you want to build something interesting! To help you better, could you tell me more about:

• **What's the main purpose** of your website?
• **Who is your target audience**?
• **What key features** do you envision?

This will help me create the perfect workflow for your project!`;
}

function getTypeSpecificResponse(type, userMessage) {
    const responses = {
        portfolio: `I understand! You want to build a <strong>Personal Portfolio</strong> website. This is perfect for showcasing your work, skills, and experience.

What kind of work do you want to showcase? (e.g., design, development, photography, writing, etc.)`,
        
        blog: `Great! You're looking to build a <strong>Blog</strong> website. This is excellent for sharing your thoughts, expertise, or stories.

What will your blog be about? (e.g., cooking, travel, technology, lifestyle, etc.)`,
        
        business: `Perfect! You want to build a <strong>Business Website</strong>. This could be a company site, startup landing page, or e-commerce store.

What type of business is this? (e.g., service-based, product sales, SaaS, etc.)`,
        
        restaurant: `Excellent! You're building a <strong>Restaurant or Food Business</strong> website. This is great for showcasing your menu, location, and services.

Do you want to include online ordering, reservations, or just information about your restaurant?`,
        
        nonprofit: `Wonderful! You're creating a <strong>Community or Nonprofit</strong> website. This is perfect for making a positive impact.

What's the main purpose of your organization? (e.g., education, charity, community service, etc.)`,
        
        saas: `Awesome! You're building a <strong>SaaS Application</strong>. This is great for creating software solutions.

What problem does your SaaS solve? (e.g., project management, analytics, communication, etc.)`,
        
        landing: `Perfect! You want to build a <strong>Landing Page</strong>. This is excellent for marketing and conversions.

What are you promoting? (e.g., product launch, service, event, etc.)`,
        
        directory: `Great! You're creating a <strong>Directory Website</strong>. This is perfect for organizing and displaying listings.

What type of listings will you have? (e.g., businesses, people, products, services, etc.)`
    };
    
    return responses[type] || responses.portfolio;
}

function showProjectSummary() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="custom-idea-step">
            <div class="step-header">
                <div class="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                </div>
                <h1>Perfect! Here's Your Project</h1>
                <p>We've captured your project details. Let's review and move to the next step.</p>
            </div>
            
            <div class="idea-form-card">
                <h2>Project Summary</h2>
                
                <div class="project-summary">
                    <div class="summary-item">
                        <strong>Project Name:</strong> ${window.projectData.name}
                    </div>
                    <div class="summary-item">
                        <strong>Type:</strong> ${window.projectData.type.charAt(0).toUpperCase() + window.projectData.type.slice(1)} Project
                    </div>
                    <div class="summary-item">
                        <strong>Description:</strong> ${window.projectData.description}
                    </div>
                </div>
                
                <div class="form-actions">
                    <button onclick="goBack()" class="btn-secondary">
                        ← Back
                    </button>
                    <button onclick="startBuilding()" class="btn-primary">
                        Start Building →
                    </button>
                </div>
            </div>
            
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%"></div>
                </div>
                <div class="progress-text">Step 2 of 4</div>
            </div>
        </div>
    `;
}

function startBuilding() {
    // This will be the next step - we'll implement this later
    alert('Building functionality coming soon! This would take you to the next step in the workflow.');
}

// Add CSS for next step
const nextStepCSS = `
.next-step {
    text-align: center;
    padding: 4rem 0;
    animation: fadeIn 0.6s ease-out;
}

.success-icon {
    width: 6rem;
    height: 6rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
}

.success-icon svg {
    width: 3rem;
    height: 3rem;
    color: white;
}

.next-step h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #111827 0%, #374151 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
}

.next-step > p {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 3rem;
}

.highlight {
    font-weight: 600;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.next-step-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    border-radius: 1.5rem;
    padding: 2.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-width: 32rem;
    margin: 0 auto 2rem;
}

.next-step-card h2 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1.5rem;
}

.next-step-card p {
    color: #6b7280;
    margin-bottom: 2rem;
    font-size: 1.125rem;
    line-height: 1.7;
}

.progress-indicators {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    font-size: 0.875rem;
    color: #6b7280;
}

.progress-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.progress-item.completed .progress-dot {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

.progress-item.active .progress-dot {
    background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%);
    animation: pulse 2s infinite;
}

.arrow {
    width: 1rem;
    height: 1rem;
    color: #9ca3af;
}

.back-button {
    color: #3b82f6;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
}

.back-button:hover {
    color: #2563eb;
    transform: scale(1.05);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(1rem); }
    to { opacity: 1; transform: translateY(0); }
}
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = nextStepCSS;
document.head.appendChild(style); 