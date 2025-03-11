import React, { useState, useEffect } from 'react';
import './davincitestpanel.css';
import { API_BASE_URL } from '../../config';
import { getDiagnostics } from '../../utils/api';

interface ResolveStatus {
  status: boolean;
  version?: string;
  error?: string;
}

interface BasicProjectInfo {
  name: string;
  framerate: string;
  timeline_count: number;
  error?: string;
}

interface TimelineInfo {
  name: string;
  start_frame: number;
  end_frame: number;
  start_timecode: string;
  track_count: {
    video: number;
    audio: number;
    subtitle: number;
  };
  current_timecode?: string;
  error?: string;
}

interface MediaPoolInfo {
  root_folder: string;
  current_folder: string;
  selected_clips: number;
  error?: string;
}

interface RenderJobInfo {
  job_count: number;
  jobs: Array<{
    id: string;
    status: string;
    progress: number;
    name: string;
  }>;
  error?: string;
}

interface Diagnostics {
  system: {
    platform: string;
    python_version: string;
    python_path: string[];
    environment_variables: {
      RESOLVE_SCRIPT_API: string;
      RESOLVE_SCRIPT_LIB: string;
      PYTHONPATH: string;
    };
  };
  backend: {
    status: string;
    api_initialized: boolean;
  };
  davinci_resolve?: ResolveStatus;
  project_info?: BasicProjectInfo;
}

const DavinciTestPanel: React.FC = () => {
  const [resolveStatus, setResolveStatus] = useState<ResolveStatus | null>(null);
  const [projectInfo, setProjectInfo] = useState<BasicProjectInfo | null>(null);
  const [timelineInfo, setTimelineInfo] = useState<TimelineInfo | null>(null);
  const [mediaPoolInfo, setMediaPoolInfo] = useState<MediaPoolInfo | null>(null);
  const [renderJobs, setRenderJobs] = useState<RenderJobInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('project');

  const fetchResolveStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/davinci/status`);
      const data = await response.json();
      setResolveStatus(data);
    } catch (error) {
      console.error('Error fetching Resolve status:', error);
      setError('Failed to connect to backend server. Is it running?');
      setResolveStatus({ status: false, error: 'Connection error' });
    }
  };

  const fetchProjectInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/davinci/project`);
      const data = await response.json();
      setProjectInfo(data);
    } catch (error) {
      console.error('Error fetching project info:', error);
      setError('Failed to fetch project information');
      setProjectInfo(null);
    }
  };

  const fetchTimelineInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/davinci/timeline`);
      const data = await response.json();
      setTimelineInfo(data);
    } catch (error) {
      console.error('Error fetching timeline info:', error);
      setTimelineInfo(null);
    }
  };

  const fetchMediaPoolInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/davinci/mediapool`);
      const data = await response.json();
      setMediaPoolInfo(data);
    } catch (error) {
      console.error('Error fetching media pool info:', error);
      setMediaPoolInfo(null);
    }
  };

  const fetchRenderJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/davinci/renderjobs`);
      const data = await response.json();
      setRenderJobs(data);
    } catch (error) {
      console.error('Error fetching render jobs:', error);
      setRenderJobs(null);
    }
  };

  const fetchDiagnostics = async () => {
    try {
      const data = await getDiagnostics();
      setDiagnostics(data);
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
      setError('Failed to fetch diagnostic information');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    await fetchResolveStatus();
    await fetchProjectInfo();
    await fetchTimelineInfo();
    await fetchMediaPoolInfo();
    await fetchRenderJobs();
    await fetchDiagnostics();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // Setup periodic refresh (every 10 seconds)
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  if (loading && !resolveStatus && !projectInfo) {
    return (
      <div className="panel-container">
        <h2>Loading DaVinci Resolve data...</h2>
      </div>
    );
  }

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h2 className="panel-title">DaVinci Resolve Info</h2>
        <div>
          <button 
            className="diagnostic-button" 
            onClick={() => setShowDiagnostics(!showDiagnostics)}
          >
            {showDiagnostics ? 'Hide Diagnostics' : 'Show Diagnostics'}
          </button>
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="resolve-status">
        <div className={`status-indicator ${resolveStatus?.status ? 'connected' : 'disconnected'}`}></div>
        <div>
          {resolveStatus?.status ? (
            <span>Connected to DaVinci Resolve {resolveStatus.version}</span>
          ) : (
            <span>Not connected to DaVinci Resolve: {resolveStatus?.error}</span>
          )}
        </div>
      </div>

      {resolveStatus?.status && (
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'project' ? 'active' : ''}`} 
            onClick={() => setActiveTab('project')}
          >
            Project
          </button>
          <button 
            className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`} 
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
          <button 
            className={`tab-button ${activeTab === 'mediapool' ? 'active' : ''}`} 
            onClick={() => setActiveTab('mediapool')}
          >
            Media Pool
          </button>
          <button 
            className={`tab-button ${activeTab === 'render' ? 'active' : ''}`} 
            onClick={() => setActiveTab('render')}
          >
            Render
          </button>
        </div>
      )}

      {/* Project Tab */}
      {activeTab === 'project' && projectInfo && !projectInfo.error ? (
        <div className="info-card">
          <h3 className="info-title">Project Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="label">Project Name</div>
              <div className="value">{projectInfo.name}</div>
            </div>
            <div className="info-item">
              <div className="label">Framerate</div>
              <div className="value">{projectInfo.framerate}</div>
            </div>
            <div className="info-item">
              <div className="label">Timeline Count</div>
              <div className="value">{projectInfo.timeline_count}</div>
            </div>
          </div>
        </div>
      ) : activeTab === 'project' && (
        <div className="info-card">
          <h3 className="info-title">Project Information</h3>
          <p>{projectInfo?.error || "No project information available"}</p>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && timelineInfo && !timelineInfo.error ? (
        <div className="info-card">
          <h3 className="info-title">Timeline Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="label">Timeline Name</div>
              <div className="value">{timelineInfo.name}</div>
            </div>
            <div className="info-item">
              <div className="label">Start Frame</div>
              <div className="value">{timelineInfo.start_frame}</div>
            </div>
            <div className="info-item">
              <div className="label">End Frame</div>
              <div className="value">{timelineInfo.end_frame}</div>
            </div>
            <div className="info-item">
              <div className="label">Start Timecode</div>
              <div className="value">{timelineInfo.start_timecode}</div>
            </div>
            <div className="info-item">
              <div className="label">Current Timecode</div>
              <div className="value">{timelineInfo.current_timecode || "N/A"}</div>
            </div>
            <div className="info-item">
              <div className="label">Video Tracks</div>
              <div className="value">{timelineInfo.track_count.video}</div>
            </div>
            <div className="info-item">
              <div className="label">Audio Tracks</div>
              <div className="value">{timelineInfo.track_count.audio}</div>
            </div>
            <div className="info-item">
              <div className="label">Subtitle Tracks</div>
              <div className="value">{timelineInfo.track_count.subtitle}</div>
            </div>
          </div>
        </div>
      ) : activeTab === 'timeline' && (
        <div className="info-card">
          <h3 className="info-title">Timeline Information</h3>
          <p>{timelineInfo?.error || "No timeline information available"}</p>
        </div>
      )}

      {/* Media Pool Tab */}
      {activeTab === 'mediapool' && mediaPoolInfo && !mediaPoolInfo.error ? (
        <div className="info-card">
          <h3 className="info-title">Media Pool Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="label">Root Folder</div>
              <div className="value">{mediaPoolInfo.root_folder}</div>
            </div>
            <div className="info-item">
              <div className="label">Current Folder</div>
              <div className="value">{mediaPoolInfo.current_folder}</div>
            </div>
            <div className="info-item">
              <div className="label">Selected Clips</div>
              <div className="value">{mediaPoolInfo.selected_clips}</div>
            </div>
          </div>
        </div>
      ) : activeTab === 'mediapool' && (
        <div className="info-card">
          <h3 className="info-title">Media Pool Information</h3>
          <p>{mediaPoolInfo?.error || "No media pool information available"}</p>
        </div>
      )}

      {/* Render Tab */}
      {activeTab === 'render' && renderJobs && !renderJobs.error ? (
        <div className="info-card">
          <h3 className="info-title">Render Jobs ({renderJobs.job_count})</h3>
          {renderJobs.job_count > 0 ? (
            <div className="render-jobs-list">
              {renderJobs.jobs.map(job => (
                <div key={job.id} className="render-job-item">
                  <div className="render-job-name">{job.name}</div>
                  <div className="render-job-status">
                    <span className={`status-badge status-${job.status.toLowerCase()}`}>
                      {job.status}
                    </span>
                    {job.status === 'Rendering' && (
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${job.progress}%` }}
                        ></div>
                        <span className="progress-text">{job.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No render jobs in queue</p>
          )}
        </div>
      ) : activeTab === 'render' && (
        <div className="info-card">
          <h3 className="info-title">Render Jobs</h3>
          <p>{renderJobs?.error || "No render job information available"}</p>
        </div>
      )}

      {showDiagnostics && diagnostics && (
        <div className="info-card">
          <h3 className="info-title">Diagnostics</h3>
          <div className="diagnostic-section">
            <h4>System</h4>
            <div className="info-grid">
              <div className="info-item">
                <div className="label">Platform</div>
                <div className="value">{diagnostics.system.platform}</div>
              </div>
              <div className="info-item">
                <div className="label">Python Version</div>
                <div className="value">{diagnostics.system.python_version}</div>
              </div>
            </div>
            
            <h4>Environment Variables</h4>
            <div className="info-grid">
              <div className="info-item">
                <div className="label">RESOLVE_SCRIPT_API</div>
                <div className="value">{diagnostics.system.environment_variables.RESOLVE_SCRIPT_API}</div>
              </div>
              <div className="info-item">
                <div className="label">RESOLVE_SCRIPT_LIB</div>
                <div className="value">{diagnostics.system.environment_variables.RESOLVE_SCRIPT_LIB}</div>
              </div>
            </div>
            
            <h4>Backend Status</h4>
            <div className="info-grid">
              <div className="info-item">
                <div className="label">Status</div>
                <div className="value">{diagnostics.backend.status}</div>
              </div>
              <div className="info-item">
                <div className="label">API Initialized</div>
                <div className="value">{diagnostics.backend.api_initialized ? 'Yes' : 'No'}</div>
              </div>
            </div>
            
            <h4>Python Path (hover to see full list)</h4>
            <div className="python-path" title={diagnostics.system.python_path.join('\n')}>
              {diagnostics.system.python_path.length} entries...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DavinciTestPanel;


