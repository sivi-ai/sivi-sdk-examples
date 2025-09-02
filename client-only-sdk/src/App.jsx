import './App.css'
import React from 'react'
import { LayoutSelector, LayoutPreview } from './components/Layout'
import useSiviSDK from './hooks/useSiviSDK'

function App() {
  const [currentLayout, setCurrentLayout] = React.useState(1)
  
  const {
    isAIStudioOpen,
    handleVisualClick,
    hideAIStudio,
    showAIStudio,
    openDesignVariantEditor,
    registerEventHandler,
    IFRAME_CONTAINER_ID
  } = useSiviSDK()

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Web Editor</h1>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          {isAIStudioOpen ? ( 
            <div className="visual-panel">
              <div id={IFRAME_CONTAINER_ID} className="iframe-container">
                {/* Iframe placeholder */}
              </div>
              <button className="back-button" onClick={hideAIStudio}>
                Back to Home
              </button>
            </div>
          ) : (
            <div className="control-panel">
              <div className="control-content">
                <LayoutSelector 
                  currentLayout={currentLayout}
                  onLayoutChange={setCurrentLayout}
                />
              </div>
              <button 
                onClick={showAIStudio} 
                className="ai-studio-button"
              >
                AI Design Studio
              </button>
            </div>
          )}
        </aside>
        
        <main className="main-content">
          <LayoutPreview 
            currentLayout={currentLayout}
            onVisualClick={handleVisualClick}
            registerEventHandler={registerEventHandler}
            openDesignVariantEditor={openDesignVariantEditor}
          />
        </main>
      </div>
    </div>
  )
}

export default App
