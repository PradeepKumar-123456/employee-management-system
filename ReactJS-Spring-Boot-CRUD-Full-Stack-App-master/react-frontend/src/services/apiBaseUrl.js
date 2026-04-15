const rawBaseUrl = 'https://employee-management-system-9p2y.onrender.com';

function trimTrailingSlash(value) {
    return value.endsWith('/') ? value.slice(0, -1) : value;
}

export function getApiBaseUrl() {
    const normalized = trimTrailingSlash(rawBaseUrl);

    if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
        return normalized.endsWith('/api/v1') ? normalized : `${normalized}/api/v1`;
    }

    if (normalized.startsWith('/')) {
        return normalized.endsWith('/api/v1') ? normalized : `${normalized}/api/v1`;
    }

    return `https://${normalized}/api/v1`;
}