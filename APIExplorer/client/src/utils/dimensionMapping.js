export const dimensionMapping = {
  amazon: {
    'amazon-square': { width: 300, height: 300 },
    'amazon-rectangle': { width: 600, height: 300 },
    'amazon-large': { width: 1200, height: 628 }
  },
  website: {
    'website-large-square': { width: 600, height: 600 },
    'website-banner': { width: 1200, height: 400 },
    'website-hero': { width: 1920, height: 1080 }
  },
  twitter: {
    'twitter-post': { width: 1024, height: 512 },
    'twitter-header': { width: 1500, height: 500 },
    'twitter-card': { width: 800, height: 418 }
  },
  displayAds: {
    'displayAds-half-page-ad': { width: 300, height: 600 },
    'displayAds-banner': { width: 728, height: 90 },
    'displayAds-large-rectangle': { width: 336, height: 280 }
  },
  youtube: {
    'youtube-thumbnail-small': { width: 640, height: 360 },
    'youtube-thumbnail-large': { width: 1280, height: 720 },
    'youtube-banner': { width: 2560, height: 1440 }
  },
  facebook: {
    'facebook-cover': { width: 851, height: 315 },
    'facebook-post': { width: 1200, height: 630 },
    'facebook-story': { width: 1080, height: 1920 }
  },
  instagram: {
    'instagram-post': { width: 1080, height: 1080 },
    'instagram-story': { width: 1080, height: 1920 },
    'instagram-reel': { width: 1080, height: 1920 }
  }
};

export const getDimensionFromInput = (apiInput) => {
  if (!apiInput) return { width: 300, height: 300 };
  
  // If custom dimension is provided, use it
  if (apiInput.dimension && apiInput.dimension.width && apiInput.dimension.height) {
    return apiInput.dimension;
  }
  
  // Otherwise, get from mapping based on type and subtype
  const typeMapping = dimensionMapping[apiInput.type];
  if (typeMapping && typeMapping[apiInput.subtype]) {
    return typeMapping[apiInput.subtype];
  }
  
  // Fallback to default
  return { width: 300, height: 300 };
};
