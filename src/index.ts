import { createServer } from '@/server'
import { PORT } from './config'

const server = createServer()

server.listen(PORT, () => {
  console.info(`Server running on http://localhost:${Number(PORT)}`)
})

/**
 * Graceful shutdown
 * This is important to make sure the resources are released, in-flight requests are finished, internal process are complete etc.
 */
process.on('SIGINT', () => {
  console.info('SIGINT received, shutting down...')
  server.close(() => {
    console.info('Server closed')
    process.exit(0)
  })
})
