let selectedProject = null;

function selectProject(projectId) {
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
}

function getProjectTitle(projectId) {
    const card = document.querySelector(`[onclick="selectProject('${projectId}')"]`);
    return card ? card.querySelector('h3').textContent : 'Project';
}

function goBack() {
    location.reload();
}

function sendMessage() {
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
    
    // Simulate AI processing (in real app, this would call an AI API)
    setTimeout(() => {
        hideTypingIndicator();
        const aiResponse = analyzeProject(message);
        addMessage(aiResponse, 'ai');
    }, 1500);
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

function analyzeProject(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based analysis (in real app, this would use AI)
    if (message.includes('portfolio') || message.includes('personal') || message.includes('resume')) {
        return `I understand! You want to build a <strong>Personal Portfolio</strong> website. This is perfect for showcasing your work, skills, and experience. 

Let me help you create a professional portfolio. What kind of work do you want to showcase? (e.g., design, development, photography, writing, etc.)`;
    }
    
    if (message.includes('blog') || message.includes('blog') || message.includes('article')) {
        return `Great! You're looking to build a <strong>Blog</strong> website. This is excellent for sharing your thoughts, expertise, or stories.

What will your blog be about? (e.g., cooking, travel, technology, lifestyle, etc.)`;
    }
    
    if (message.includes('business') || message.includes('company') || message.includes('startup') || message.includes('ecommerce') || message.includes('shop')) {
        return `Perfect! You want to build a <strong>Business Website</strong>. This could be a company site, startup landing page, or e-commerce store.

What type of business is this? (e.g., service-based, product sales, SaaS, etc.)`;
    }
    
    if (message.includes('restaurant') || message.includes('cafe') || message.includes('food') || message.includes('menu')) {
        return `Excellent! You're building a <strong>Restaurant or Food Business</strong> website. This is great for showcasing your menu, location, and services.

Do you want to include online ordering, reservations, or just information about your restaurant?`;
    }
    
    if (message.includes('nonprofit') || message.includes('charity') || message.includes('community') || message.includes('education')) {
        return `Wonderful! You're creating a <strong>Community or Nonprofit</strong> website. This is perfect for making a positive impact.

What's the main purpose of your organization? (e.g., education, charity, community service, etc.)`;
    }
    
    // Default response for unrecognized projects
    return `Interesting project idea! I can help you build this. 

To better understand your needs, could you tell me:
• What's the main purpose of your website?
• Who is your target audience?
• What features do you envision?

This will help me create the perfect workflow for your project!`;
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