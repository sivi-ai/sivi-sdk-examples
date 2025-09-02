import './App.css'
import React, { useState, useEffect } from 'react'
import DesignForm from './components/DesignForm'
import ApiMonitor from './components/ApiMonitor'
import { designPresets } from './presets/designPresets'
import { getDimensionFromInput } from './utils/dimensionMapping'
import { saveToHistory, getHistory, getHistoryItem, formatHistoryLabel } from './utils/historyStorage'

function App() {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiLogs, setApiLogs] = useState([]);
  const [apiInput, setApiInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [designVariants, setDesignVariants] = useState([]);
  const [isPolling, setIsPolling] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState('');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs(prev => [...prev, { timestamp, message }]);
  };

  const pollDesignStatus = async (requestId, pollCount = 0, originalApiInput = null, allLogs = []) => {
    try {
      const pollingLog = { timestamp: new Date().toLocaleTimeString(), message: `Polling design status (attempt ${pollCount + 1})...` };
      addLog(pollingLog.message);
      allLogs.push(pollingLog);
      
      const response = await fetch(`http://localhost:4000/get-request-status?requestId=${requestId}`);
      const data = await response.json();
      
      const statusLog = { timestamp: new Date().toLocaleTimeString(), message: `Status check response: ${data.body?.status || 'unknown'}` };
      addLog(statusLog.message);
      allLogs.push(statusLog);
      
      // Only update apiResponse if this is the final completed response
      if (data.status === 200 && data.body?.status === 'completed') {
        setApiResponse(data);
      }
      
      if (data.status === 200 && data.body?.status === 'completed') {
        const completedLog = { timestamp: new Date().toLocaleTimeString(), message: 'Design generation completed!' };
        addLog(completedLog.message);
        allLogs.push(completedLog);
        setIsPolling(false);
        setIsLoading(false);
        
        if (data.body.result?.variations) {
          const variants = data.body.result.variations.map(variant => ({
            url: variant.variantImageUrl,
            id: variant.variantId,
            editLink: variant.variantEditLink
          }));
          setDesignVariants(variants);
          
          const variantsLog = { timestamp: new Date().toLocaleTimeString(), message: `Found ${variants.length} design variants` };
          addLog(variantsLog.message);
          allLogs.push(variantsLog);
          
          // Save to history with all accumulated logs
          const inputToSave = originalApiInput || apiInput;
          console.log('Attempting to save to history:', { inputToSave, data, allLogs, variants });
          const historyId = saveToHistory(inputToSave, data, allLogs, variants);
          console.log('History save result:', historyId);
          if (historyId) {
            setHistory(getHistory());
            addLog('Saved to history');
          } else {
            addLog('Failed to save to history');
          }
        }
        
        return;
      }
      
      // Stop polling if there's an error status
      if (data.status !== 200) {
        const errorLog = { timestamp: new Date().toLocaleTimeString(), message: `API error: Status ${data.status}. Stopping polling.` };
        addLog(errorLog.message);
        allLogs.push(errorLog);
        setIsPolling(false);
        setIsLoading(false);
        return;
      }
      
      // Stop polling if status indicates failure
      if (data.body?.status === 'failed' || data.body?.status === 'error') {
        const failedLog = { timestamp: new Date().toLocaleTimeString(), message: `Design generation failed: ${data.body?.status}. Stopping polling.` };
        addLog(failedLog.message);
        allLogs.push(failedLog);
        setIsPolling(false);
        setIsLoading(false);
        return;
      }
      
      // Continue polling with different intervals
      let nextDelay;
      if (pollCount === 1) {
        nextDelay = 45000; // 20 seconds for second poll
      } else if (pollCount === 2) {
        nextDelay = 20000; // 20 seconds for third poll
      } else {
        nextDelay = 10000; // 10 seconds for subsequent polls
      }
      
      const nextCheckLog = { timestamp: new Date().toLocaleTimeString(), message: `Next status check in ${nextDelay/1000} seconds...` };
      addLog(nextCheckLog.message);
      allLogs.push(nextCheckLog);
      
      setTimeout(() => {
        pollDesignStatus(requestId, pollCount + 1, originalApiInput, allLogs);
      }, nextDelay);
      
    } catch (error) {
      addLog(`Polling error: ${error.message}. Stopping polling.`);
      setIsPolling(false);
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setApiResponse(null);
    setDesignVariants([]);
    setApiInput(formData);
    
    const startTime = Date.now();
    addLog('Starting API call to /designs-from-prompt');
    
    try {
      const response = await fetch('http://localhost:4000/designs-from-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      
      const data = await response.json();
      
      addLog(`API call completed in ${timeTaken}ms`);
      addLog(`Response status: ${response.status}`);
      
      setApiResponse(data);
      
      if (data.status === 200 && data.body?.requestId) {
        addLog(`Design request queued. Request ID: ${data.body.requestId}`);
        addLog(`Queue wait time: ${data.body.queueWaitTime || 0} seconds`);
        
        setIsPolling(true);
        
        // Start polling after initial delay
        const pollingStartLog = { timestamp: new Date().toLocaleTimeString(), message: 'Starting status polling in 5 seconds...' };
        addLog(pollingStartLog.message);
        const initialLogs = [...apiLogs, pollingStartLog];
        setTimeout(() => {
          pollDesignStatus(data.body.requestId, 0, formData, initialLogs);
        }, 5000);
        
      } else {
        addLog('Design generation failed or returned error');
        setIsLoading(false);
      }
    } catch (error) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      addLog(`API call failed after ${timeTaken}ms: ${error.message}`);
      setApiResponse({ error: error.message });
    } finally {
      if (!isPolling) {
        setIsLoading(false);
      }
    }
  };

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    setSelectedHistoryId(''); // Clear history selection when preset is selected
    setFormKey(prev => prev + 1); // Force form re-render with new preset
  };

  const handleClearLogs = () => {
    setApiLogs([]);
    setApiResponse(null);
    setApiInput(null);
    setDesignVariants([]);
    setIsPolling(false);
  };

  const handleHistorySelect = (historyId) => {
    if (!historyId) {
      setSelectedHistoryId('');
      setSelectedPreset(''); // Clear preset selection
      return;
    }

    const historyItem = getHistoryItem(historyId);
    if (historyItem) {
      setSelectedHistoryId(historyId);
      setSelectedPreset(''); // Clear preset selection when history is selected
      setApiInput(historyItem.apiInput);
      setApiResponse(historyItem.apiResponse);
      setApiLogs(historyItem.apiLogs || []);
      setDesignVariants(historyItem.designVariants || []);
      setFormKey(prev => prev + 1); // Force form re-render with history data
      addLog(`Loaded history: ${historyItem.prompt.substring(0, 50)}...`);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Marketing Campaign</h1>
        <div className="header-controls">
          <div className="preset-selector">
            <label htmlFor="preset-dropdown" className="preset-label">Load Example:</label>
            <select 
              id="preset-dropdown"
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="preset-dropdown"
            >
              <option value="">Select a preset...</option>
              {Object.entries(designPresets).map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="history-selector">
            <label htmlFor="history-dropdown" className="preset-label">History:</label>
            <select 
              id="history-dropdown"
              value={selectedHistoryId}
              onChange={(e) => handleHistorySelect(e.target.value)}
              className="preset-dropdown"
            >
              <option value="">Select from history...</option>
              {history.map((item) => (
                <option key={item.id} value={item.id}>
                  {formatHistoryLabel(item)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          <div className="control-panel">
            <DesignForm 
              key={formKey}
              onSubmit={handleFormSubmit} 
              initialData={selectedPreset ? designPresets[selectedPreset].data : (selectedHistoryId ? getHistoryItem(selectedHistoryId)?.apiInput : null)}
            />
          </div>
        </aside>
        
        <main className="main-content">
          <div className="variants-section">
            <h2>Generated Design Variations</h2>
            {isLoading || isPolling ? (
              <div className="loading-state">
                {isPolling ? (
                  <p>Design is being generated, please wait... (Checking for status)</p>
                ) : (
                  <p>Generating design...</p>
                )}
              </div>
            ) : designVariants.length > 0 ? (
              <div className="variants-list">
                {designVariants.map((variant, index) => {
                  const dimensions = getDimensionFromInput(apiInput);
                  
                  // Calculate scaled dimensions with max height of 400px
                  const maxHeight = 400;
                  const aspectRatio = dimensions.width / dimensions.height;
                  
                  let displayWidth = dimensions.width;
                  let displayHeight = dimensions.height;
                  
                  if (displayHeight > maxHeight) {
                    displayHeight = maxHeight;
                    displayWidth = maxHeight * aspectRatio;
                  }
                  
                  return (
                    <div key={index} className="variant-row">
                      <div className="variant-image">
                        <img 
                          src={variant.url} 
                          alt={`Variant ${index + 1}`}
                          style={{
                            width: `${displayWidth}px`,
                            height: `${displayHeight}px`,
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <div className="variant-details">
                        <span className="variant-label">Variant {index + 1}</span>
                        <span className="variant-size">{dimensions.width} × {dimensions.height}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="variant-empty-state">
                <p>Design variants will appear here after generation</p>
              </div>
            )}
          </div>
          
          <ApiMonitor 
            apiLogs={apiLogs}
            apiResponse={apiResponse}
            apiInput={apiInput}
            designVariants={designVariants}
            onClearLogs={handleClearLogs}
          />
        </main>
      </div>
    </div>
  )
}

export default App
