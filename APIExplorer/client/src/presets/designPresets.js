export const designPresets = {
  simple: {
    name: "Simple",
    data: {
      type: 'amazon',
      subtype: 'amazon-square',
      dimension: {
        width: 300,
        height: 300
      },
      prompt: 'Get Free POS Development with your landing page. Claim Now',
      assets: {
        images: [],
        logos: []
      },
      colors: [],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  ecommerceCategory: {
    name: "E-commerce Category",
    data: {
      type: 'website',
      subtype: 'website-large-square',
      dimension: {
        width: 600,
        height: 600
      },
      prompt: 'Naturally Luxurious Skincare. Experience the Skinpro difference today. View Collection',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/photos/se4WDeo0vkA.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          },
          {
            url: 'https://media.hellosivi.com/photos/sM7n56orwHM.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: ['#668135', '#D6DEC1', '#0E1A01'],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  socialMedia: {
    name: "Social Media",
    data: {
      type: 'twitter',
      subtype: 'twitter-post',
      dimension: {
        width: 1024,
        height: 512
      },
      prompt: 'Title: Bask in the Sun, Subtext: Let natural light flood your space with our designs., Button: Get a Quote',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/photos/ssl11TjAFoA.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: ['#00B8A4', '#0679AB', '#FFFFFF'],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  brandAwareness: {
    name: "Brand Awareness",
    data: {
      type: 'displayAds',
      subtype: 'displayAds-half-page-ad',
      dimension: {
        width: 300,
        height: 600
      },
      prompt: 'Navigating Real Estate, Simplified. Your trusted partner for buying and selling property. Learn More',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/photos/sGBdpCxKCqY.jpeg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: [
          {
            url: 'https://media.hellosivi.com/logos/snH2sMMwKoN.png',
            logoStyles: ['direct', 'neutral']
          }
        ]
      },
      colors: ['#C31E2E'],
      fonts: [],
      language: 'english',
      numOfVariants: 4,
      outputFormat: ['jpg']
    }
  },
  
  videoThumbnail: {
    name: "Video Thumbnail",
    data: {
      type: 'youtube',
      subtype: 'youtube-thumbnail-small',
      dimension: {
        width: 640,
        height: 360
      },
      prompt: 'Thumbnails for money management videos',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/photos/sEDpfWhzojS.jpeg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: [],
      fonts: [],
      language: 'english',
      numOfVariants: 4,
      outputFormat: ['jpg']
    }
  },
  
  profileCover: {
    name: "Profile Cover",
    data: {
      type: 'facebook',
      subtype: 'facebook-cover',
      dimension: {
        width: 851,
        height: 315
      },
      prompt: 'Best Movie Clips. Discover unforgettable moments in cinema history.',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/photos/s300YDkgbpa.jpeg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: [],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  }
};
