const ONET = {
  API_URL: 'https://',
  USERNAME: '',
  PASSWORD: '',
};

const LOCAL_DEV_CONFIG = {
  API_URL: 'http://localhost:5000/',
  SWAPI_URL: 'http://swapi.dev/',
  REDIRECT_URI: 'http://localhost:3000',
  ONET,
};

const DEV_CONFIG = {
  API_URL: 'https://',
  SWAPI_URL: 'http://swapi.dev/',
  REDIRECT_URI: 'https://',
  ONET,
};

const STAGE_CONFIG = {
  API_URL: 'https://',
  SWAPI_URL: 'http://swapi.dev/',
  REDIRECT_URI: 'https://',
  ONET,
};

const PRODUCTION_CONFIG = {
  API_URL: 'https://',
  SWAPI_URL: 'http://swapi.dev/',
  REDIRECT_URI: 'https://',
  ONET,
};

const UAT_CONFIG = {
  API_URL: 'https://',
  SWAPI_URL: 'http://swapi.dev/',
  REDIRECT_URI: 'https://',
  ONET,
};

export const isUAT = () => {
  return window.location.hostname.includes('-ui-uat');
};

export const isDev = () => {
  return window.location.hostname.includes('-ui-dev');
};

const isStage = () => {
  return window.location.hostname.includes('-staging');
};

export const isProd = () => {
  return !isStage() && process.env.NODE_ENV === 'production';
};

const getEnvironment = () => {
  if (isStage()) {
    return STAGE_CONFIG;
  } else if (isDev()) {
    return DEV_CONFIG;
  } else if (isUAT()) {
    return UAT_CONFIG;
  } else if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_CONFIG;
  }
  return LOCAL_DEV_CONFIG;
};

export const ENV = getEnvironment();
