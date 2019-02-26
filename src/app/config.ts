let API_URL = 'http://api.thinblock.io/api';
const PAGINATION_LIMIT = 7;
const IS_BROWSER = process.env.BROWSER;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_MS_ID = process.env.FIREBASE_MS_ID;

if (process.env.NODE_ENV === 'production') {
  API_URL = 'http://api.thinblock.io/api';
}

export {
  API_URL,
  PAGINATION_LIMIT,
  IS_BROWSER,
  FIREBASE_API_KEY,
  FIREBASE_MS_ID
}
