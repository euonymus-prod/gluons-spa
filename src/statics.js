let api_host       = 'api.gluons.link';
let api_scheme     = 'https'
let api_key        = 'euonymus';
if (process.env.NODE_ENV === 'development') {
    api_host       = 'localhost:8765';
    api_scheme     = 'http'
    api_key        = 'euonymus';
}

// NOTE: This expects index.js sets locale in localStorage
let locale = JSON.parse(localStorage.getItem('locale'));
if (locale) {
    api_host = locale + '.' + api_host
}

export const API_HOST      = api_host;
export const API_URI       = api_scheme + '://' + api_host
export const API_KEY_QUERY = 'api_key='  + api_key

