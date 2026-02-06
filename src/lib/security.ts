import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 */
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html);
}

/**
 * Basic string sanitization for input fields.
 */
export function sanitizeString(str: string): string {
  if (!str) return '';
  return str.replace(/[<>]/g, '').trim();
}

/**
 * Validate if a string is a valid CPF (simple check).
 */
export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  // Could add full validation algorithm here
  return true;
}
