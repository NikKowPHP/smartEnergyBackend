import * as validator from 'validator';

export function sanitizeInput(input: string): string {
  if (!input) return input;
  
  // Convert to string if not already
  let sanitized = String(input);
  
  // Remove any HTML/script tags
  sanitized = validator.escape(sanitized);
  
  // Remove any potential SQL injection patterns
  sanitized = validator.blacklist(sanitized, ';\'"<>');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}