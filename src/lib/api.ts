export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();

    try {
      const parsedError = JSON.parse(errorBody) as { message?: string; error?: string };
      throw new Error(parsedError.message || parsedError.error || `Request failed with status ${response.status}`);
    } catch {
      throw new Error(errorBody || `Request failed with status ${response.status}`);
    }
  }

  return (await response.json()) as T;
}
