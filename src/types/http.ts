import { IncomingMessage, ServerResponse } from 'http'

export type Req = IncomingMessage & {
  body?: any
  params?: Record<string, string>
}
export type Res = ServerResponse
export type Next = (err?: Error) => void
