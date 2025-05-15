import { env } from './env'

import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { Rocket } from './routes/rocket'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'ROCKETS/BACK-END',
      description: 'API Documentation for Plathanos Technical Test',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler) // validar compilers(request.body das rotas, assim como o .parse() do zod - definir tais parametros e devolver tais parametros)
app.setSerializerCompiler(serializerCompiler) // validar compilers(request.body das rotas como o .parse() do zod - definir tais parametros e devolver tais parametros)

app.register(Rocket)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => console.log(`Server is running on PORT ${env.PORT} 🧪`))
