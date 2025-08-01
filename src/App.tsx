import React, { useState } from 'react';
import { 
  Package, 
  User, 
  BookOpen, 
  Rocket, 
  Calendar, 
  ShoppingCart, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Coffee, 
  FileText, 
  Users,
  ArrowRight,
  Check,
  Lightbulb
} from 'lucide-react';

interface ProjectType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  featured?: boolean;
}

const projectTypes: ProjectType[] = [
  {
    id: 'custom-idea',
    title: 'Start with Your Own Idea',
    description: 'Build something unique! Whether it\'s a hobby project, creative experiment, or personal passion - bring your vision to life.',
    icon: Lightbulb,
    featured: true
  },
  {
    id: 'manufactured-product',
    title: 'Manufactured Product Website',
    description: 'Showcase your physical product with detailed features, images, and easy purchase options.',
    icon: Package
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    description: 'Highlight your skills, projects, and experience with a sleek, customizable portfolio.',
    icon: User
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Share stories, ideas, or news with a clean, readable blogging platform.',
    icon: BookOpen
  },
  {
    id: 'saas-product',
    title: 'SaaS/Product Website',
    description: 'Present your software solution with compelling features, pricing, and user testimonials.',
    icon: Rocket
  },
  {
    id: 'event-landing',
    title: 'Event or Landing Page',
    description: 'Create focused, high-converting pages for events, campaigns, or product launches.',
    icon: Calendar
  },
  {
    id: 'ecommerce-store',
    title: 'E-commerce Store',
    description: 'Build a complete online store with product catalogs, shopping cart, and payment processing.',
    icon: ShoppingCart
  },
  {
    id: 'nonprofit-charity',
    title: 'Nonprofit or Charity Website',
    description: 'Inspire action with compelling stories, donation systems, and volunteer opportunities.',
    icon: Heart
  },
  {
    id: 'freelancer-agency',
    title: 'Freelancer or Agency Showcase',
    description: 'Display your services, case studies, and client testimonials to attract new business.',
    icon: Briefcase
  },
  {
    id: 'educational-course',
    title: 'Educational Course Site',
    description: 'Deliver online learning with course materials, progress tracking, and student engagement.',
    icon: GraduationCap
  },
  {
    id: 'restaurant-cafe',
    title: 'Restaurant or Cafe Website',
    description: 'Showcase your menu, ambiance, and location with online reservations and ordering.',
    icon: Coffee
  },
  {
    id: 'resume-cv',
    title: 'Resume/CV Website',
    description: 'Create a professional online presence that stands out to employers and clients.',
    icon: FileText
  },
  {
    id: 'membership-subscription',
    title: 'Membership or Subscription Site',
    description: 'Build exclusive content platforms with user authentication and subscription management.',
    icon: Users
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'selection' | 'next'>('selection');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    setIsTransitioning(true);
    
    // Simulate transition delay for smooth animation
    setTimeout(() => {
      setCurrentStep('next');
      setIsTransitioning(false);
    }, 600);
  };

  const selectedProjectData = projectTypes.find(p => p.id === selectedProject);

  if (currentStep === 'next') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/25">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Great Choice!
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              You've selected <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{selectedProjectData?.title}</span>
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/20">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Next Steps
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We're now customizing your workflow based on your project type. 
              You'll be guided through specialized questions and tools to bring your vision to life.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span>Project Selected</span>
              </div>
              <ArrowRight className="w-4 h-4" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
                <span>Customizing Workflow</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setCurrentStep('selection');
              setSelectedProject(null);
            }}
            className="mt-8 text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:scale-105"
          >
            ← Back to Project Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              BuildFlow AI Assistant
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            What type of website would you like to build?
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose from our curated project types to get started with a personalized, AI-powered workflow designed specifically for your needs
          </p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="font-medium">Step 1 of 4</span>
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="px-6 pb-16">
        <div className={`max-w-6xl mx-auto transition-all duration-500 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          {/* Featured Custom Project Card */}
          <div className="flex justify-center mb-12">
            {(() => {
              const customProject = projectTypes.find(p => p.featured);
              if (!customProject) return null;
              
              const Icon = customProject.icon;
              const isSelected = selectedProject === customProject.id;
              const isOtherSelected = selectedProject && selectedProject !== customProject.id;
              
              return (
                <div
                  className={`group cursor-pointer transition-all duration-300 ${
                    isOtherSelected ? 'opacity-20 scale-95' : 'opacity-100 scale-100'
                  } ${isSelected ? 'ring-2 ring-purple-500 ring-offset-4' : ''}`}
                  style={{ 
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                  onClick={() => handleProjectSelect(customProject.id)}
                >
                  <div className={`
                    bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-10 shadow-xl border-2 border-purple-200/30
                    group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-3
                    transition-all duration-400 ease-out relative overflow-hidden max-w-md
                    ${isSelected ? 'bg-gradient-to-br from-purple-100/80 to-pink-100/80 border-purple-300/50 shadow-2xl scale-105 -translate-y-3' : ''}
                  `}>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    
                    {/* Sparkle effect */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-8 right-8 w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className={`
                        w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto
                        ${isSelected ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/25' : 'bg-gradient-to-br from-purple-100 to-pink-200 group-hover:from-purple-500 group-hover:to-pink-600 group-hover:shadow-lg group-hover:shadow-purple-500/25'}
                        transition-all duration-400
                      `}>
                        <Icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-purple-600 group-hover:text-white'} transition-colors duration-400`} />
                      </div>
                      
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent mb-4 leading-tight">
                        {customProject.title}
                      </h3>
                      
                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {customProject.description}
                      </p>
                      
                      {isSelected && (
                        <div className="flex items-center justify-center text-purple-600 text-sm font-semibold">
                          <Check className="w-5 h-5 mr-2" />
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          
          {/* Divider */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="px-6 text-sm text-gray-500 font-medium">Or choose from popular templates</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projectTypes.filter(p => !p.featured).map((project, index) => {
              const Icon = project.icon;
              const isSelected = selectedProject === project.id;
              const isOtherSelected = selectedProject && selectedProject !== project.id;
              
              return (
                <div
                  key={project.id}
                  className={`group cursor-pointer transition-all duration-300 ${
                    isOtherSelected ? 'opacity-20 scale-95' : 'opacity-100 scale-100'
                  } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-4' : ''}`}
                  style={{ 
                    animationDelay: `${index * 40}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                  onClick={() => handleProjectSelect(project.id)}
                >
                  <div className={`
                    bg-white/80 backdrop-blur-sm rounded-3xl p-8 h-full shadow-lg border border-white/20
                    group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-2
                    transition-all duration-400 ease-out relative overflow-hidden
                    ${isSelected ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50 shadow-2xl scale-105 -translate-y-2' : ''}
                  `}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    
                    <div className="relative z-10">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                      ${isSelected ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25' : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:shadow-lg group-hover:shadow-blue-500/25'}
                      transition-all duration-400
                    `}>
                      <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-600 group-hover:text-white'} transition-colors duration-400`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {isSelected && (
                      <div className="flex items-center text-blue-600 text-sm font-semibold">
                        <Check className="w-5 h-5 mr-2" />
                        Selected
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selection Feedback */}
      {selectedProject && !isTransitioning && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-slide-up z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border border-white/20 flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 font-medium">
              {selectedProjectData?.title} selected
            </span>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;