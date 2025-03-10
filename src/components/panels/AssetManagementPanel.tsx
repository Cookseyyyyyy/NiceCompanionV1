import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronRight, FaSearch, FaSync, FaCircle, FaCodeBranch } from 'react-icons/fa';
import './AssetManagementPanel.css';

type AssetCategory = {
  name: string;
  files: string[];
  expanded: boolean;
};

const AssetManagementPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [assetCategories, setAssetCategories] = useState<AssetCategory[]>([
    {
      name: 'Stills',
      expanded: false,
      files: [
        'Background_Forest_4K.jpg',
        'Portrait_Subject1_Studio.png',
        'ProductShot_Device_White.tif',
        'Texture_Concrete_Seamless.jpg',
        'Logo_Client_Transparent.png'
      ]
    },
    {
      name: 'Moving',
      expanded: false,
      files: [
        'Drone_Cityscape_Sunset.mp4',
        'GreenScreen_Actor_Take3.mov',
        'TimeLapse_Clouds_4K.mp4',
        'Animation_Logo_Intro.mov',
        'BRoll_Office_Handheld.mp4'
      ]
    },
    {
      name: 'Audio',
      expanded: false,
      files: [
        'Interview_Subject_Clean.wav',
        'Ambience_Forest_Morning.mp3',
        'SFX_Explosion_Layered.wav',
        'Foley_Footsteps_Wood.mp3',
        'Dialogue_Scene5_Take2.wav'
      ]
    },
    {
      name: 'Music',
      expanded: false,
      files: [
        'Soundtrack_Main_Theme.wav',
        'BackgroundMusic_Upbeat.mp3',
        'Tension_Strings_Loop.wav',
        'Cinematic_Buildup_60s.mp3',
        'Acoustic_Guitar_Melody.wav'
      ]
    },
    {
      name: 'Rushes',
      expanded: false,
      files: [
        'Scene3_Take1_A001.mxf',
        'Scene3_Take2_A002.mxf',
        'Scene5_Take1_A003.mxf',
        'Scene5_Take2_A004.mxf',
        'Scene7_Take1_A005.mxf'
      ]
    },
    {
      name: 'Playouts',
      expanded: false,
      files: [
        'Client_Review_v1.mp4',
        'Client_Review_v2.mp4',
        'Internal_Review_Cut.mp4',
        'Social_Media_Teaser.mp4',
        'Broadcast_Master.mxf'
      ]
    },
    {
      name: 'Renders',
      expanded: false,
      files: [
        'Timeline_Full_ProRes.mov',
        'Scene3_VFX_Composite.exr',
        'ColorGrade_Final.mov',
        'Export_YouTube_H264.mp4',
        'Export_Instagram_Square.mp4'
      ]
    }
  ]);

  const projectFiles = [
    'TeodoraVP.proj',
    'TeodoraGFX.aep',
  ];

  const [activeTooltip, setActiveTooltip] = useState<{id: number, x: number, y: number} | null>(null);

  // Toggle expand/collapse for an asset category
  const toggleAssetCategory = (categoryIndex: number) => {
    setAssetCategories(prevCategories => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex] = {
        ...newCategories[categoryIndex],
        expanded: !newCategories[categoryIndex].expanded
      };
      return newCategories;
    });
  };

  // Filter files based on search term
  const getFilteredFiles = (files: string[]) => {
    if (!searchTerm) return files;
    return files.filter(file => 
      file.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Sample version control nodes
  const versionNodes = [
    { id: 1, type: 'main', message: 'Initial project setup', date: '2023-10-01' },
    { id: 2, type: 'main', message: 'Import raw footage', date: '2023-10-02' },
    { id: 3, type: 'branch', message: 'Start VFX compositing', date: '2023-10-03' },
    { id: 4, type: 'main', message: 'Fix audio sync issues', date: '2023-10-03' },
    { id: 5, type: 'branch', message: 'Add particle effects to scene 3', date: '2023-10-04' },
    { id: 6, type: 'main', message: 'Color grading pass 1', date: '2023-10-05' },
    { id: 7, type: 'merge', message: 'Merge VFX elements into main timeline', date: '2023-10-06' },
    { id: 8, type: 'main', message: 'Finalize sound design', date: '2023-10-07' },
    { id: 9, type: 'branch', message: 'Create motion graphics intro', date: '2023-10-08' },
    { id: 10, type: 'main', message: 'Export client review v1.0', date: '2023-10-10' },
    { id: 11, type: 'hotfix', message: 'Fix rendering artifacts in scene 5', date: '2023-10-15' },
    { id: 12, type: 'branch', message: 'Add 3D camera tracking to shot 12', date: '2023-10-18' },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate node positions based on dates
  const getNodeStyle = (date: string, index: number) => {
    // Base case: first node is at 0
    if (index === 0) return { left: '20px' };
    
    // If this is the last node, ensure it's far enough right for scrolling
    // if (index === versionNodes.length - 1) {
    //   return { 
    //     position: 'absolute' as 'absolute',
    //     left: '1900px' // Position last node near the end of the timeline
    //   };
    // }
    
    // Parse dates
    const startDate = new Date(versionNodes[0].date);
    const currentDate = new Date(date);
    
    // Calculate days difference
    const diffDays = Math.round((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Scale factor to convert days to pixels
    const pixelsPerDay = 50; // Increased for more spacing
    
    // Calculate left offset
    const leftOffset = diffDays * pixelsPerDay + 20;
    
    return { 
      position: 'absolute' as 'absolute',
      left: `${leftOffset}px` 
    };
  };

  // Add horizontal scroll wheel handler with smooth scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer) {
        e.preventDefault();
        
        // Smoother scrolling with animation
        const scrollAmount = e.deltaY;
        const targetScrollLeft = scrollContainer.scrollLeft + scrollAmount;
        
        scrollContainer.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    };
    
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
    }
    
    // Cleanup
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Existing useEffect for initial scroll
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  // Handle mouse events for tooltips
  const handleNodeMouseEnter = (e: React.MouseEvent, node: {id: number, message: string, date: string}) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      id: node.id,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };
  
  const handleNodeMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="panel-container asset-management-panel">
      {/* <h2>Asset Management</h2> */}
      
      {/* Search Box */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      {/* Asset Browser */}
      <div className="asset-browser">
        {/* Projects Section */}
        <div className="section">
          <div className="section-header">
            <span>Projects</span>
          </div>
          
          <ul className="file-list">
            {getFilteredFiles(projectFiles).map((file, fileIndex) => (
              <li key={fileIndex} className="file-item">{file}</li>
            ))}
          </ul>
        </div>

        {/* Assets Section (contains all categories) */}
        <div className="section">
          <div className="section-header">
            <span>Assets</span>
          </div>
          
          <div className="section-content">
            {assetCategories.map((category, index) => (
              <div key={category.name} className="category">
                <div 
                  className="category-header" 
                  onClick={() => toggleAssetCategory(index)}
                >
                  {category.expanded ? <FaChevronDown /> : <FaChevronRight />}
                  <span>{category.name}</span>
                </div>
                
                {category.expanded && (
                  <ul className="file-list">
                    {getFilteredFiles(category.files).map((file, fileIndex) => (
                      <li key={fileIndex} className="file-item">{file}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Version Control Visualization */}
      <div className="version-control-section">
        <div className="version-control-header">
          <span>Version History</span>
        </div>
        
        <div className="version-visualization-container" ref={scrollContainerRef}>
          <div className="version-timeline">
            {versionNodes.map((node, index) => (
              <div 
                key={node.id} 
                className={`version-node ${node.type}`}
                style={getNodeStyle(node.date, index)}
                onMouseEnter={(e) => handleNodeMouseEnter(e, node)}
                onMouseLeave={handleNodeMouseLeave}
              >
                <div className="node-connector"></div>
                <div className="node-circle">
                  {node.type === 'merge' ? <FaCodeBranch /> : <FaCircle />}
                </div>
                <div className="node-label">{node.id}</div>
              </div>
            ))}
          </div>
          
          {activeTooltip && (
            <div 
              className="version-tooltip"
              style={{
                left: `${activeTooltip.x}px`,
                top: `${activeTooltip.y}px`,
                position: 'fixed',
                transform: 'translate(-50%, -100%)'
              }}
            >
              {versionNodes.find(node => node.id === activeTooltip.id)?.message}
              <div className="tooltip-date">
                {versionNodes.find(node => node.id === activeTooltip.id)?.date}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sync Button */}
      <div className="sync-button-container">
        <button className="sync-button">
          <FaSync className="sync-icon" /> Sync
        </button>
      </div>
    </div>
  );
};

export default AssetManagementPanel; 