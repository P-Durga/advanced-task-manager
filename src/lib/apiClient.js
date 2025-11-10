// API client with error handling

export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'APIError';
  }
}

export const apiClient = {
  async request(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);

      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new APIError(
          data.message || `HTTP error! status: ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      // Network errors
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new APIError(
          'Network error. Please check your connection.',
          0,
          null
        );
      }

      // Timeout errors
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408, null);
      }

      throw new APIError(error.message, 500, null);
    }
  },

  get(url, options) {
    return this.request(url, { ...options, method: 'GET' });
  },

  post(url, data, options) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put(url, data, options) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(url, options) {
    return this.request(url, { ...options, method: 'DELETE' });
  },
};