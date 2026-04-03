import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
} from "@medusajs/core-flows"
import { ApiKey } from "../../.medusa/types/query-entry-points"

export default async function bootstrapAdminAndKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const userService = container.resolve(Modules.USER) as any
  const authService = container.resolve(Modules.AUTH) as any
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL) as any

  const adminEmail = process.env.MEDUSA_ADMIN_EMAIL
  const adminPassword = process.env.MEDUSA_ADMIN_PASSWORD

  logger.info("Bootstrapping admin user and publishable API key...")

  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id", "title", "type", "token"],
    filters: {
      type: "publishable",
    },
  })

  let publishableApiKey = data?.[0] as ApiKey | undefined

  if (!publishableApiKey) {
    logger.info("No publishable API key found. Creating one now.")

    const defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
      name: "Default Sales Channel",
    })

    const {
      result: [createdPublishableKey],
    } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Webshop",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    })

    publishableApiKey = createdPublishableKey as ApiKey

    if (defaultSalesChannel?.[0]?.id) {
      await linkSalesChannelsToApiKeyWorkflow(container).run({
        input: {
          id: publishableApiKey.id,
          add: [defaultSalesChannel[0].id],
        },
      })
    }
  }

  if (publishableApiKey?.token) {
    logger.info(`MEDUSA_PUBLISHABLE_API_KEY=${publishableApiKey.token}`)
  } else {
    logger.warn("Publishable API key token is not available in query response.")
  }

  if (!adminEmail || !adminPassword) {
    logger.warn("MEDUSA_ADMIN_EMAIL or MEDUSA_ADMIN_PASSWORD is missing. Skipping admin bootstrap.")
    return
  }

  const existingUsers = await userService.listUsers({
    email: adminEmail,
  })

  if (existingUsers?.length) {
    logger.info(`Admin user already exists for ${adminEmail}.`)
    return
  }

  const user = await userService.createUsers({
    email: adminEmail,
  })

  const { authIdentity, error } = await authService.register("emailpass", {
    body: {
      email: adminEmail,
      password: adminPassword,
    },
  })

  if (error) {
    throw error
  }

  await authService.updateAuthIdentities({
    id: authIdentity.id,
    app_metadata: {
      user_id: user.id,
    },
  })

  logger.info(`Admin user created for ${adminEmail}.`)
}
