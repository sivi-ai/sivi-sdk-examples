const HISTORY_KEY = 'sivi_api_history';
const MAX_HISTORY_ITEMS = 50;

export const saveToHistory = (apiInput, apiResponse, apiLogs, designVariants) => {
  try {
    // Only save if we have valid apiInput data
    if (!apiInput) {
      console.warn('Cannot save to history: apiInput is null or undefined', { apiInput, apiResponse, apiLogs, designVariants });
      return null;
    }
    
    console.log('Saving to history with data:', { apiInput, apiResponse, apiLogs, designVariants });

    const historyItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      prompt: apiInput?.prompt || 'No prompt',
      dimensions: apiInput?.dimension || { width: 300, height: 300 },
      type: apiInput?.type || 'unknown',
      subtype: apiInput?.subtype || 'unknown',
      apiInput,
      apiResponse,
      apiLogs,
      designVariants
    };

    const existingHistory = getHistory();
    const newHistory = [historyItem, ...existingHistory].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    return historyItem.id;
  } catch (error) {
    console.error('Failed to save to history:', error);
    return null;
  }
};

export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
};

export const getHistoryItem = (id) => {
  try {
    const history = getHistory();
    return history.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Failed to get history item:', error);
    return null;
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};

export const formatHistoryLabel = (item) => {
  const date = new Date(item.timestamp);
  const timeStr = date.toLocaleString();
  const promptPreview = item.prompt.length > 30 
    ? item.prompt.substring(0, 30) + '...' 
    : item.prompt;
  const dimensions = `${item.dimensions.width}×${item.dimensions.height}`;
  
  return `${promptPreview} | ${dimensions} | ${timeStr}`;
};
