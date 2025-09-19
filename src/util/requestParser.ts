import { Req } from '@/types/http'

export function parseJsonBody(req: Req): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk.toString()))
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'))
      } catch (err) {
        reject(err)
      }
    })
  })
}
