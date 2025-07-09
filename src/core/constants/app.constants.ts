export const APP_CONSTANTS = {
  APP_NAME: 'Zirin',
  APP_DESCRIPTION: 'Contes et Légendes du Mali',
  VERSION: '1.0.0',
  LANGUAGES: {
    FR: 'fr',
    BM: 'bm'
  },
  SUBSCRIPTION: {
    FREE_CONTES_LIMIT: 5,
    FREE_DEVINETTES_LIMIT: 10
  },
  AUDIO: {
    SKIP_DURATION: 10, // seconds
    DEFAULT_VOLUME: 0.5
  }
} as const;

export const API_CONSTANTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.zirin.app',
  ENDPOINTS: {
    CONTES: '/contes',
    DEVINETTES: '/devinettes',
    AUTH: '/auth',
    SUBSCRIPTION: '/subscription'
  }
} as const;