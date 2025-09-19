import { Res } from '@/types/http'
import httpStatus from 'http-status'

export function sendResponse(
  res: Res,
  data: unknown,
  status: number = httpStatus.OK
) {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  })
  return res.end(body)
}
