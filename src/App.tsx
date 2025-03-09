import { useState } from 'react'
import './App.css'

// Define the Tab interface
interface Tab {
  id: string;
  label: string;
  icon: string;
  content: string;
}

function App() {
  // Define tabs with icons, labels and content
  const tabs: Tab[] = [
    { 
      id: 'version-control', 
      label: 'Version Control & Workflow History', 
      icon: '🔄', 
      content: 'Provide an interface similar to Git for video projects. Features include timeline-based versioning, branching & merging, history & diff views, and revert & rollback functionality.'
    },
    { 
      id: 'asset-management', 
      label: 'Asset Management & Metadata', 
      icon: '🗂️', 
      content: 'Centralize the management of all project assets (video clips, audio, images, effects) with robust tagging and search features. Includes automated tagging, smart search & filtering, versioning of assets, and integration with cloud storage.'
    },
    { 
      id: 'review-collaboration', 
      label: 'Review & Collaboration', 
      icon: '👥', 
      content: 'Enhance the review process with real-time feedback, annotations, and collaborative commenting. Features include live review sessions, annotation tools, feedback aggregation, and approval workflows.'
    },
    { 
      id: 'ai-assistance', 
      label: 'AI Assistance & Automation', 
      icon: '🤖', 
      content: 'Leverage AI to automate routine tasks and provide creative suggestions. Features include auto-editing suggestions, smart color grading, noise reduction & enhancement, content-aware reframing, and predictive asset matching.'
    },
    { 
      id: 'project-pipeline', 
      label: 'Project Pipeline & Task Management', 
      icon: '📋', 
      content: 'Provide oversight of the entire production pipeline, integrating scheduling and task tracking. Features include task dashboards, render queue management, pipeline visualization, and notifications & alerts.'
    },
    { 
      id: 'quality-assurance', 
      label: 'Quality Assurance & Consistency', 
      icon: '✅', 
      content: 'Ensure that all creative outputs meet technical and artistic quality standards. Features include automated quality checks, error flagging, and style consistency monitoring.'
    },
    { 
      id: 'analytics', 
      label: 'Analytics & Insights', 
      icon: '📊', 
      content: 'Provide data and insights to help creatives refine their workflows and understand project performance. Features include usage metrics, performance dashboards, and feedback analytics.'
    }
  ];

  // State to track the active tab
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="app-container">
      <div className="tab-panel">
        <div className="tab-list">
          {tabs.map(tab => (
            <div 
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </div>
          ))}
        </div>
        
        <div className="content-area">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  )
}

export default App
