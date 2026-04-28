/**
 * Secure logging utility that respects NODE_ENV
 * Prevents sensitive data from being logged in production
 */

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Sensitive field patterns to redact from logs
 */
const SENSITIVE_PATTERNS = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'secret',
  'apiKey',
  'privateKey',
];

/**
 * Check if a key contains sensitive information
 */
const isSensitiveKey = (key: string): boolean => {
  const lowerKey = key.toLowerCase();
  return SENSITIVE_PATTERNS.some(pattern => lowerKey.includes(pattern));
};

/**
 * Redact sensitive data from objects
 */
const redactSensitiveData = (data: unknown): unknown => {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => redactSensitiveData(item));
  }

  const redacted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (isSensitiveKey(key)) {
      redacted[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      redacted[key] = redactSensitiveData(value);
    } else {
      redacted[key] = value;
    }
  }

  return redacted;
};

/**
 * Safe console.log that respects production environment
 * In production, logs are suppressed
 */
export const log = (...args: unknown[]): void => {
  if (!isProduction) {
    console.log(...args);
  }
};

/**
 * Safe console.error that redacts sensitive data
 * Errors are logged in all environments but sensitive data is redacted in production
 */
export const logError = (message: string, data?: unknown): void => {
  if (isProduction) {
    // In production, redact sensitive data
    const safeData = data ? redactSensitiveData(data) : undefined;
    console.error(message, safeData);
  } else {
    // In development, log everything for debugging
    console.error(message, data);
  }
};

/**
 * Safe console.warn that respects production environment
 */
export const logWarn = (...args: unknown[]): void => {
  if (!isProduction) {
    console.warn(...args);
  }
};

/**
 * Log API errors safely
 * Automatically redacts sensitive information from error objects
 */
export const logApiError = (context: string, error: unknown): void => {
  const errorInfo: Record<string, unknown> = {
    context,
    message: error instanceof Error ? error.message : 'Unknown error',
  };

  const errorWithResponse = error as { 
    response?: { 
      status?: number; 
      statusText?: string; 
      data?: unknown 
    };
    config?: {
      url?: string;
      method?: string;
    };
  };

  if (errorWithResponse.response) {
    errorInfo.status = errorWithResponse.response.status;
    errorInfo.statusText = errorWithResponse.response.statusText;
    
    // Redact sensitive data from response
    if (errorWithResponse.response.data) {
      errorInfo.data = redactSensitiveData(errorWithResponse.response.data);
    }
  }

  if (errorWithResponse.config) {
    errorInfo.url = errorWithResponse.config.url;
    errorInfo.method = errorWithResponse.config.method;
    // Never log request data as it may contain passwords
  }

  logError('API Error:', errorInfo);
};

/**
 * Development-only logging
 * Only logs in development environment
 */
export const devLog = (...args: unknown[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEV]', ...args);
  }
};

export default {
  log,
  logError,
  logWarn,
  logApiError,
  devLog,
} as const;
