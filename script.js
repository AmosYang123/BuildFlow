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
        <div class="custom-idea-step">
            <div class="step-header">
                <div class="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                        <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                    </svg>
                </div>
                <h1>Let's Bring Your Idea to Life!</h1>
                <p>First, let's understand what you want to build. This will help us create the perfect workflow for your project.</p>
            </div>
            
            <div class="idea-form-card">
                <h2>Step 1: Define Your Project</h2>
                
                <div class="form-group">
                    <label for="project-name">What's your project called?</label>
                    <input type="text" id="project-name" placeholder="e.g., My Portfolio, Recipe App, Travel Blog..." class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="project-description">Describe what you want to build</label>
                    <textarea id="project-description" placeholder="Tell us about your idea... What's the main purpose? Who is it for? What features do you envision?" class="form-textarea" rows="4"></textarea>
                </div>
                
                <div class="form-group">
                    <label>What type of project is this?</label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="project-type" value="personal" checked>
                            <span class="radio-custom"></span>
                            <div class="radio-content">
                                <div class="radio-icon">👤</div>
                                <div>
                                    <div class="radio-title">Personal Project</div>
                                    <div class="radio-description">Portfolio, blog, hobby site, or personal experiment</div>
                                </div>
                            </div>
                        </label>
                        
                        <label class="radio-option">
                            <input type="radio" name="project-type" value="business">
                            <span class="radio-custom"></span>
                            <div class="radio-content">
                                <div class="radio-icon">💼</div>
                                <div>
                                    <div class="radio-title">Business Project</div>
                                    <div class="radio-description">Company website, startup, or commercial application</div>
                                </div>
                            </div>
                        </label>
                        
                        <label class="radio-option">
                            <input type="radio" name="project-type" value="community">
                            <span class="radio-custom"></span>
                            <div class="radio-content">
                                <div class="radio-icon">🌍</div>
                                <div>
                                    <div class="radio-title">Community Project</div>
                                    <div class="radio-description">Non-profit, educational, or community-focused site</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button onclick="goBack()" class="btn-secondary">
                        ← Back
                    </button>
                    <button onclick="continueToNextStep()" class="btn-primary">
                        Continue →
                    </button>
                </div>
            </div>
            
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 25%"></div>
                </div>
                <div class="progress-text">Step 1 of 4</div>
            </div>
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

function continueToNextStep() {
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectType = document.querySelector('input[name="project-type"]:checked').value;
    
    if (!projectName.trim()) {
        alert('Please enter a project name');
        return;
    }
    
    if (!projectDescription.trim()) {
        alert('Please describe your project');
        return;
    }
    
    // Store the form data (we'll use this in the next step)
    window.projectData = {
        name: projectName,
        description: projectDescription,
        type: projectType
    };
    
    // For now, just show a success message
    showProjectSummary();
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