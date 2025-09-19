import z from 'zod'

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const methodSchema = z.enum(Object.values(RequestMethods))
export type MethodType = z.infer<typeof methodSchema>

export const methodValidator = (
  allowedMethods: MethodType[],
  method?: MethodType
) => {
  if (!method || !allowedMethods.includes(method)) {
    throw new Error('Method not allowed')
  }
}
