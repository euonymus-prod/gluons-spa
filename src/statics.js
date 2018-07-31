let api_host       = 'ja.api.gluons.link';
let api_scheme     = 'https'
let api_key        = 'euonymus';
if (process.env.NODE_ENV === 'development') {
    api_host       = 'ja.localhost:8765';
    api_scheme     = 'http'
    api_key        = 'euonymus';
}

export const API_HOST      = api_host;
export const API_URI       = api_scheme + '://' + api_host
export const API_KEY_QUERY = 'api_key='  + api_key

