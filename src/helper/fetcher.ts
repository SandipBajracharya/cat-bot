import { GEMINI_API_KEY } from '@/config'

const sharedHeaders = {
  'Content-Type': 'application/json',
  'x-goog-api-key': GEMINI_API_KEY,
}

export function postFetcher(
  url: string,
  body: Record<string, string | object>,
  customHeaders?: Record<string, string>
) {
  return fetch(url, {
    method: 'POST',
    headers: {
      ...sharedHeaders,
      ...customHeaders,
    },
    body: JSON.stringify(body),
  })
}
