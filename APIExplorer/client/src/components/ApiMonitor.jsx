import React, { useState } from 'react';
import './ApiMonitor.css';
import { getDimensionFromInput } from '../utils/dimensionMapping';

const ApiMonitor = ({ apiLogs, apiResponse, apiInput, designVariants, onClearLogs }) => {
  const [activeTab, setActiveTab] = useState('logs');

  return (
    <div className="api-monitor">
      <div className="api-monitor-header">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            API Logs ({apiLogs.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'response' ? 'active' : ''}`}
            onClick={() => setActiveTab('response')}
          >
            API Response
          </button>
          <button 
            className={`tab-button ${activeTab === 'input' ? 'active' : ''}`}
            onClick={() => setActiveTab('input')}
          >
            API Input
          </button>
        </div>
        
        <button 
          onClick={onClearLogs} 
          className="clear-logs-btn"
          disabled={apiLogs.length === 0 && !apiResponse}
        >
          Clear All
        </button>
      </div>
      
      <div className="api-monitor-content">
        {activeTab === 'logs' && (
          <div className="logs-tab">
            <div className="logs-content">
              {apiLogs.length === 0 ? (
                <div className="empty-state">
                  <p>No API logs yet. Make an API call to see logs here.</p>
                </div>
              ) : (
                apiLogs.map((log, index) => (
                  <div key={index} className="log-entry">
                    <span className="log-timestamp">[{log.timestamp}]</span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'response' && (
          <div className="response-tab">
            <div className="response-content">
              {!apiResponse ? (
                <div className="empty-state">
                  <p>No API response yet. Make an API call to see response here.</p>
                </div>
              ) : (
                <pre className="response-json">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'input' && (
          <div className="input-tab">
            <div className="input-content">
              {!apiInput ? (
                <div className="empty-state">
                  <p>No API input yet. Make an API call to see input here.</p>
                </div>
              ) : (
                <div className="input-display">
                  <div className="input-json">
                    <pre>{JSON.stringify(apiInput, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiMonitor;
