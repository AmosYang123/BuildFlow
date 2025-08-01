let selectedProject = null;

function selectProject(projectId) {
    // Remove previous selection
    if (selectedProject) {
        const prevCard = document.querySelector(`[onclick="selectProject('${selectedProject}')"]`);
        const prevIndicator = document.getElementById(`${selectedProject}-indicator`);
        if (prevCard) prevCard.classList.remove('selected');
        if (prevIndicator) prevIndicator.style.display = 'none';
    }
    
    // Add new selection
    selectedProject = projectId;
    const card = document.querySelector(`[onclick="selectProject('${projectId}')"]`);
    const indicator = document.getElementById(`${projectId}-indicator`);
    
    if (card) card.classList.add('selected');
    if (indicator) indicator.style.display = 'flex';
    
    // Show feedback
    showFeedback(projectId);
    
    // Simulate transition to next step after 2 seconds
    setTimeout(() => {
        showNextStep(projectId);
    }, 2000);
}

function showFeedback(projectId) {
    const feedback = document.getElementById('selection-feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    // Get project title
    const card = document.querySelector(`[onclick="selectProject('${projectId}')"]`);
    const title = card.querySelector('h3').textContent;
    
    feedbackText.textContent = `${title} selected`;
    feedback.classList.add('show');
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 3000);
}

function showNextStep(projectId) {
    // Create next step content
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

function getProjectTitle(projectId) {
    const card = document.querySelector(`[onclick="selectProject('${projectId}')"]`);
    return card ? card.querySelector('h3').textContent : 'Project';
}

function goBack() {
    location.reload();
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