import { useState } from 'react'
import './App.css'

// Import TabList component
import TabList from './components/TabList';

// Import panel components
import {
  VersionControlPanel,
  AssetManagementPanel,
  ReviewCollaborationPanel,
  AIAssistancePanel,
  ProjectPipelinePanel,
  QualityAssurancePanel,
  AnalyticsPanel,
  DavinciTestPanel
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
      id: 'asset-management', 
      label: 'Asset Management & History', 
      icon: '🗂️',
      component: <AssetManagementPanel />
    },
    // { 
    //   id: 'version-control', 
    //   label: 'Version Control & Workflow History', 
    //   icon: '🔄',
    //   component: <VersionControlPanel />
    // },  
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
    // { 
    //   id: 'project-pipeline', 
    //   label: 'Project Pipeline & Task Management', 
    //   icon: '📋',
    //   component: <ProjectPipelinePanel />
    // },
    { 
      id: 'quality-assurance', 
      label: 'Quality Assurance & Consistency', 
      icon: '✅',
      component: <QualityAssurancePanel />
    },
    // { 
    //   id: 'analytics', 
    //   label: 'Analytics & Insights', 
    //   icon: '📊',
    //   component: <AnalyticsPanel />
    // }
    { 
      id: 'davinci-test', 
      label: 'Davinci Test', 
      icon: '📼',
      component: <DavinciTestPanel />
    }
  ];

  // State to track the active tab
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="app-container">
      <div className="tab-panel">
        <TabList 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="content-area">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  )
}

export default App
