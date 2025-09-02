import React from 'react'

const IFRAME_CONTAINER_ID = 'sivi-container'

const defaultOptions = {
  type: "custom",
  subtype: "custom",
  dimension: {
    width: 1080,
    height: 1080
  },
  prompt: "Create a modern social media post for a coffee restaurant",
  language: "english",
  colors: ["#5662EC", "#EF9AB2"],
  numOfVariants: 3,
  outputFormat: "png",
  config: {
    enableLoginUI: true, // For Standard SDK will be always true
    enableDesignEditor: true,
  }
}

const useSiviSDK = () => {
  const paramsRef = React.useRef(null)
  const [isAIStudioOpen, setIsAIStudioOpen] = React.useState(false)
  const eventHandlersRef = React.useRef(new Set())

  const handleVisualClick = React.useCallback((params) => {
    paramsRef.current = params
    if (!isAIStudioOpen) {
      setIsAIStudioOpen(true)
    } else {
      // Already Widget is open, so just set the options  
      const options = Object.assign({}, defaultOptions, params)
      window.SIVI?.setOptions(options)
    }
  }, [isAIStudioOpen])

  const hideAIStudio = React.useCallback(() => {
    window.SIVI?.hide()
    setIsAIStudioOpen(false)
  }, [])

  const showAIStudio = React.useCallback(() => {
    setIsAIStudioOpen(true)
  }, [])


  const openDesignVariantEditor = React.useCallback((params) => {
    window.SIVI?.openDesignVariantEditor(params)
  }, [])


  const registerEventHandler = React.useCallback((handler) => {
    eventHandlersRef.current.add(handler)
    return () => {
      eventHandlersRef.current.delete(handler)
    }
  }, [])

  const unregisterEventHandler = React.useCallback((handler) => {
    eventHandlersRef.current.delete(handler)
  }, [])

  // Handle SIVI SDK initialization ///////////////////////////////
  React.useEffect(() => {
    if (isAIStudioOpen) {
      const options = Object.assign({}, defaultOptions, paramsRef.current)
      window.SIVI?.show(options, IFRAME_CONTAINER_ID)
    }
  }, [isAIStudioOpen])

  //////////////// Handle SIVI SDK events ////////////////////////
  React.useEffect(() => {
    const handleSiviEvents = async (event, responseCallback) => {
      // Call all registered event handlers
      const handlers = Array.from(eventHandlersRef.current)
      
      // Execute all handlers in parallel
      const handlerPromises = handlers.map(async (handler) => {
        try {
          await handler(event, responseCallback)
        } catch (error) {
          console.error('Error in event handler:', error)
        }
      })
      
      await Promise.all(handlerPromises)
    }

    window.SIVI?.events(handleSiviEvents)
    
    return () => {
      window.SIVI?.removeEventsCallback()
    }
  }, [])

  return {
    isAIStudioOpen,
    handleVisualClick,
    openDesignVariantEditor,
    showAIStudio,
    hideAIStudio,
    registerEventHandler,
    unregisterEventHandler,
    IFRAME_CONTAINER_ID
  }
}

export default useSiviSDK
