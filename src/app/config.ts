let API_URL = 'http://api.thinblock.io/api';
const PAGINATION_LIMIT = 7;
const IS_BROWSER = process.env.BROWSER;

if (process.env.NODE_ENV === 'production') {
  API_URL = 'http://api.thinblock.io/api';
}

export {
  API_URL,
  PAGINATION_LIMIT,
  IS_BROWSER,
}
