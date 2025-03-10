import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaSearch, FaSync } from 'react-icons/fa';
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