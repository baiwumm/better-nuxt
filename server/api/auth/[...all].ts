import { toNodeHandler } from 'better-auth/node'
import { auth } from '#server/utils/auth'

export default toNodeHandler(auth)
