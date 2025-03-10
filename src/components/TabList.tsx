import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
  component: React.ReactNode;
}

interface TabListProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabList: React.FC<TabListProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tab-list">
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TabList; 