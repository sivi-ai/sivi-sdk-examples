export const designTypes = {
  // Social Media Designs
  instagram: {
    label: "Instagram",
    subtypes: {
      "instagram-post": { label: "Post (1080×1080)", width: 1080, height: 1080 },
      "instagram-post-small": { label: "Post Small (800×800)", width: 800, height: 800 },
      "instagram-ad": { label: "Ad (1080×1080)", width: 1080, height: 1080 }
    }
  },
  
  facebook: {
    label: "Facebook",
    subtypes: {
      "facebook-post": { label: "Post (1200×900)", width: 1200, height: 900 },
      "facebook-ad": { label: "Ad (1200×628)", width: 1200, height: 628 },
      "facebook-cover": { label: "Cover (851×315)", width: 851, height: 315 }
    }
  },
  
  twitter: {
    label: "Twitter",
    subtypes: {
      "twitter-post": { label: "Post (1024×512)", width: 1024, height: 512 },
      "twitter-ad": { label: "Ad (1200×675)", width: 1200, height: 675 },
      "twitter-cover": { label: "Cover (1500×500)", width: 1500, height: 500 }
    }
  },
  
  linkedin: {
    label: "LinkedIn",
    subtypes: {
      "linkedIn-post": { label: "Post (1200×628)", width: 1200, height: 628 },
      "linkedIn-ad": { label: "Ad (1080×1080)", width: 1080, height: 1080 },
      "linkedIn-banner": { label: "Banner (1584×396)", width: 1584, height: 396 }
    }
  },
  
  pinterest: {
    label: "Pinterest",
    subtypes: {
      "pinterest-pin-small": { label: "Pin Small (400×600)", width: 400, height: 600 }
    }
  },
  
  whatsapp: {
    label: "WhatsApp",
    subtypes: {
      "whatsapp-post": { label: "Post (800×800)", width: 800, height: 800 },
      "whatsapp-wide-post": { label: "Wide Post (800×400)", width: 800, height: 400 },
      "whatsapp-business-cover": { label: "Business Cover (1211×681)", width: 1211, height: 681 }
    }
  },
  
  youtube: {
    label: "YouTube",
    subtypes: {
      "youtube-thumbnail-small": { label: "Thumbnail (640x360)", width: 640, height: 360 },
      "youtube-shorts-thumbnail-small": { label: "Shorts Thumbnail (540×960)", width: 540, height: 960 },
    }
  },
  
  // Display & Web Advertising
  displayAds: {
    label: "Display Ads",
    subtypes: {
      // Standard Display Ads
      "displayAds-half-page-ad": { label: "Half Page Ad (300×600)", width: 300, height: 600 },
      "displayAds-large-rectangle": { label: "Large Rectangle (336×280)", width: 336, height: 280 },
      "displayAds-inline-rectangle": { label: "Inline Rectangle (300×250)", width: 300, height: 250 },
      
      // Skyscraper Display Ads
      "displayAds-fat-skyscraper": { label: "Fat Skyscraper (240×400)", width: 240, height: 400 }
    }
  },
  
  // Amazon Ads
  amazon: {
    label: "Amazon",
    subtypes: {
      "amazon-ad": { label: "Ad (300×250)", width: 300, height: 250 },
      "amazon-fullscreen": { label: "Fullscreen (727×356)", width: 727, height: 356 },
      "amazon-large-square": { label: "Large Square (727×727)", width: 727, height: 727 },
      "amazon-rectangle": { label: "Rectangle (970×600)", width: 970, height: 600 },
      "amazon-square": { label: "Square (300×300)", width: 300, height: 300 }
    }
  },
  
  // Website Elements
  website: {
    label: "Website",
    subtypes: {
      "website-large-rectangle": { label: "Large Rectangle (500×780)", width: 500, height: 780 },
      "website-medium-rectangle": { label: "Medium Rectangle (450×580)", width: 450, height: 580 },
      "website-rectangle": { label: "Rectangle (420×330)", width: 420, height: 330 },
      "website-wide-rectangle": { label: "Wide Rectangle (610×210)", width: 610, height: 210 },
      "website-tall-rectangle": { label: "Tall Rectangle (380×520)", width: 380, height: 520 },
      "website-square": { label: "Square (450×450)", width: 450, height: 450 },
      "website-small-square": { label: "Small Square (300×300)", width: 300, height: 300 },
      "website-large-square": { label: "Large Square (600×600)", width: 600, height: 600 },
      "website-standard": { label: "Standard (1280×400)", width: 1280, height: 400 }
    }
  },
  
  // Email Marketing
  email: {
    label: "Email",
    subtypes: {
      "square": { label: "Square (600×600)", width: 600, height: 600 },
      "tall": { label: "Tall (600×800)", width: 600, height: 800 },
      "rectangle": { label: "Rectangle (600×450)", width: 600, height: 450 },
      "wide": { label: "Wide (600×250)", width: 600, height: 250 },
      "small": { label: "Small (300×450)", width: 300, height: 450 },
      "small-square": { label: "Small Square (300×300)", width: 300, height: 300 }
    }
  },
  
  // Custom Dimensions
  custom: {
    label: "Custom",
    subtypes: {
      "custom": { label: "Custom Dimensions", width: null, height: null }
    }
  }
};

// Helper function to get subtypes for a given type
export const getSubtypesForType = (type) => {
  return designTypes[type]?.subtypes || {};
};

// Helper function to get dimensions for a type/subtype combination
export const getDimensionsForSubtype = (type, subtype) => {
  const subtypeData = designTypes[type]?.subtypes?.[subtype];
  return subtypeData ? { width: subtypeData.width, height: subtypeData.height } : null;
};

// Helper function to check if a type/subtype requires custom dimensions
export const requiresCustomDimensions = (type, subtype) => {
  return type === 'custom' || subtype === 'custom-dimensions';
};
