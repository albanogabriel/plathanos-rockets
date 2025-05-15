import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function Rocket(app: FastifyInstance) {
  // GET ROCKETS
  app.withTypeProvider<ZodTypeProvider>().get(
    '/rocket',
    {
      schema: {
        summary: 'Get Rockets',
        tags: ['rocket'],
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              height: z.number(),
              diameter: z.number(),
              weight: z.number(),
              image_profile: z.string(),
            })
          ),
          404: z.object({
            error: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const rocket = await prisma.rocket.findMany()

      if (!rocket.length) {
        return reply.status(404).send({
          error: 'Nenhum foguete encontrado',
        })
      }

      return reply.status(200).send(rocket)
    }
  )

  // GET ROCKETS BY ID
  app.withTypeProvider<ZodTypeProvider>().get(
    '/rocket/:rocketId',
    {
      schema: {
        summary: 'Get Rocket By ID',
        tags: ['rocket'],
        params: z.object({
          rocketId: z.coerce.number(),
        }),
        response: {
          200: z.object({
            id: z.number(),
            name: z.string(),
            description: z.string(),
            height: z.number(),
            diameter: z.number(),
            weight: z.number(),
            image_profile: z.string(),
          }),
          404: z.object({
            error: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const rocketById = await prisma.rocket.findUnique({
        where: {
          id: req.params.rocketId,
        },
      })

      if (!rocketById) {
        return reply.status(404).send({
          error: 'Foguete não encontrado',
        })
      }

      return reply.status(200).send(rocketById)
    }
  )

  // CREATE ROCKET
  app.withTypeProvider<ZodTypeProvider>().post(
    '/rocket',
    {
      schema: {
        summary: 'Create Rocket',
        tags: ['rocket'],
        body: z.object({
          name: z.string(),
          description: z.string(),
          height: z.number(),
          diameter: z.number(),
          weight: z.number(),
          image_profile: z.string(),
        }),
        response: {
          201: z.object({
            id: z.number(),
          }),
          404: z.object({
            error: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
          422: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const existRocketName = await prisma.rocket.findUnique({
        where: {
          name: req.body.name,
        },
      })

      if (existRocketName) {
        return reply.status(400).send({
          error: 'O nome do foguete já existe.',
        })
      }

      const createdRocket = await prisma.rocket.create({
        data: req.body,
      })

      return reply.status(201).send({
        id: createdRocket.id,
      })
    }
  )

  // DELETE ALL ROCKETS
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/rocket',
    {
      schema: {
        summary: 'Delete All Rockets',
        tags: ['rocket'],
        response: {
          204: z.undefined(),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const rockets = await prisma.rocket.findMany()

      if (!rockets.length) {
        return reply.status(404).send({
          error: 'Não foi encontrado nenhum foguete',
        })
      }

      await prisma.rocket.deleteMany()

      return reply.status(204).send()
    }
  )

  // DELETE ROCKET BY ID
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/rocket/:rocketId',
    {
      schema: {
        summary: 'Delete Rocket By ID',
        tags: ['rocket'],
        params: z.object({
          rocketId: z.coerce.number(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const rocketById = await prisma.rocket.findUnique({
        where: {
          id: req.params.rocketId,
        },
      })

      if (!rocketById) {
        return reply.status(404).send({
          error: 'Nenhum foguete encontrado com o id fornecido.',
        })
      }

      await prisma.rocket.delete({
        where: {
          id: rocketById.id,
        },
      })

      return reply.status(200).send({
        message: `Foguete ${rocketById.name} foi removido com sucesso`,
      })
    }
  )

  // UPDATE ROCKET
  app.withTypeProvider<ZodTypeProvider>().put(
    '/rocket/:rocketId',
    {
      schema: {
        summary: 'Editar Rocket',
        tags: ['rocket'],
        params: z.object({
          rocketId: z.coerce.number(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string(),
          height: z.number(),
          diameter: z.number(),
          weight: z.number(),
          image_profile: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            error: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      // consultar o rocket por id
      const rocketById = await prisma.rocket.findUnique({
        where: {
          id: req.params.rocketId,
        },
      })

      if (!rocketById) {
        return reply.status(404).send({
          error: 'Foguete não encontrado',
        })
      }

      const rocketNameAlreadyExists = await prisma.rocket.findFirst({
        where: {
          name: req.body.name,
        },
      })

      if (rocketNameAlreadyExists) {
        return reply.status(400).send({
          error: 'Este nome do foguete já está sendo utilizado',
        })
      }

      await prisma.rocket.update({
        where: {
          id: rocketById.id,
        },
        data: req.body,
      })

      return reply.status(200).send({
        message: `Foguete ID:${rocketById.id} foi editado com sucesso`,
      })
    }
  )
}
