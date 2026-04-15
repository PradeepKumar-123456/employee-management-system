const rawBaseUrl = process.env.REACT_APP_API_BASE_URL || '/api/v1';

export function getApiBaseUrl() {
    if (rawBaseUrl.startsWith('http://') || rawBaseUrl.startsWith('https://') || rawBaseUrl.startsWith('/')) {
        return rawBaseUrl;
    }

    return `https://${rawBaseUrl}/api/v1`;
}