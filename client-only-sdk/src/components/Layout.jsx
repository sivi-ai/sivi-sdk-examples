import React from 'react'
import layoutDefinitions from './layouts.json'
import './Layout.css'
import { LayoutStateContext } from './LayoutStateContext'
import { LayoutStateProvider } from './LayoutStateProvider'

// Layout Logic Hook
const useLayoutLogic = ({ onVisualClick, layoutDef }) => {
  const context = React.useContext(LayoutStateContext)
  
  if (!context) {
    throw new Error('useLayoutLogic must be used within LayoutStateProvider')
  }

  const { visualShapes, setSelectedVisual, initializeLayout, handleEditImage } = context

  // Initialize layout on mount or when layout changes
  React.useEffect(() => {
    initializeLayout(layoutDef)
  }, [layoutDef, initializeLayout])

  const handleShapeClick = React.useCallback((event, element) => {
    console.log("handleShapeClick:: current element", element)
    setSelectedVisual(element.id)

    const params = {
      prompt: element.prompt,
      dimension: {
        width: element.position.width * 10,
        height: element.position.height * 10
      }
    }
    onVisualClick && onVisualClick(params)
  }, [setSelectedVisual, onVisualClick])

  return { visualShapes, handleShapeClick, handleEditImage }
}

// Layout Renderer Component
const LayoutRenderer = ({ layoutDef, onVisualClick }) => {
  const { visualShapes, handleShapeClick, handleEditImage } = useLayoutLogic({
    onVisualClick,
    layoutDef
  })

  const renderElement = (element, index) => {
    const elementStyle = {
      position: 'absolute',
      left: `${element.position.x}%`,
      top: `${element.position.y}%`,
      width: `${element.position.width}%`,
      height: `${element.position.height}%`
    }
    const visualData = visualShapes[element.id]

    switch (element.type) {
      case 'text':
        return (
          <div
            key={index}
            className={`layout-element text-element ${element.styles}`}
            style={elementStyle}
          >
            {element.content}
          </div>
        )
      
      case 'visual':
        return (
          <div
            key={index}
            className={`layout-element visual-element ${element.styles}`}
            style={elementStyle}
            onClick={(e) => handleShapeClick(e, element)}
          >
            {visualData?.imageUrl ? (
              <div className="visual-image-container">
                <img 
                  src={visualData.imageUrl} 
                  alt="Extracted Image" 
                  className="visual-image"
                />
                <div className="edit-overlay">
                  <button 
                    className="edit-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditImage(visualData.imageUrl)
                    }}
                  >
                    ✏️ Edit Design
                  </button>
                </div>
              </div>
            ) : (
              <div className="visual-placeholder">
                <p>{element.placeholder}</p>
              </div>
            )}
          </div>
        )
      
      case 'logo':
        return (
          <div
            key={index}
            className={`layout-element logo-element ${element.styles}`}
            style={elementStyle}
          >
            <img src={element.content} alt="Logo" className="logo-image" />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`layout-container ${layoutDef.layout}`}>
      {layoutDef.elements.map(renderElement)}
    </div>
  )
}

// Layout Selection Component
export const LayoutSelector = ({ currentLayout, onLayoutChange }) => {
  return (
    <div className="layout-selector">
      <label htmlFor="layoutSelect" className="layout-label">Choose Layout</label>
      <select
        id="layoutSelect"
        className="layout-select"
        value={currentLayout}
        onChange={(e) => onLayoutChange(parseInt(e.target.value, 10))}
      >
        {Object.values(layoutDefinitions).map(layout => (
          <option key={layout.id} value={layout.id}>
            {layout.name}
          </option>
        ))}
      </select>
    </div>
  )
}

// Layout Preview Component
export const LayoutPreview = ({ currentLayout, onVisualClick, registerEventHandler, openDesignVariantEditor }) => {
  const currentLayoutDef = layoutDefinitions[currentLayout]

  return (
    <div className="layout-preview">
      <LayoutStateProvider 
        registerEventHandler={registerEventHandler}
        openDesignVariantEditor={openDesignVariantEditor}
      >
        <LayoutRenderer
          layoutDef={currentLayoutDef}
          onVisualClick={onVisualClick}
        />
      </LayoutStateProvider>
    </div>
  )
}
