import { useState } from 'react'
import './App.css'

// Import panel components
import {
  VersionControlPanel,
  AssetManagementPanel,
  ReviewCollaborationPanel,
  AIAssistancePanel,
  ProjectPipelinePanel,
  QualityAssurancePanel,
  AnalyticsPanel
} from './components/panels';

// Define the Tab interface
interface Tab {
  id: string;
  label: string;
  icon: string;
  component: React.ReactNode;
}

function App() {
  // Define tabs with icons, labels and components
  const tabs: Tab[] = [
    { 
      id: 'version-control', 
      label: 'Version Control & Workflow History', 
      icon: '🔄',
      component: <VersionControlPanel />
    },
    { 
      id: 'asset-management', 
      label: 'Asset Management & Metadata', 
      icon: '🗂️',
      component: <AssetManagementPanel />
    },
    { 
      id: 'review-collaboration', 
      label: 'Review & Collaboration', 
      icon: '👥',
      component: <ReviewCollaborationPanel />
    },
    { 
      id: 'ai-assistance', 
      label: 'AI Assistance & Automation', 
      icon: '🤖',
      component: <AIAssistancePanel />
    },
    { 
      id: 'project-pipeline', 
      label: 'Project Pipeline & Task Management', 
      icon: '📋',
      component: <ProjectPipelinePanel />
    },
    { 
      id: 'quality-assurance', 
      label: 'Quality Assurance & Consistency', 
      icon: '✅',
      component: <QualityAssurancePanel />
    },
    { 
      id: 'analytics', 
      label: 'Analytics & Insights', 
      icon: '📊',
      component: <AnalyticsPanel />
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
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  )
}

export default App
