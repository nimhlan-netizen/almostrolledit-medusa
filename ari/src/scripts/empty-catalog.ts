import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  deleteProductCategoriesWorkflow,
  deleteProductsWorkflow,
} from "@medusajs/core-flows"

export default async function emptyCatalog({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  logger.info("Removing seeded catalog data...")

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title"],
  })

  const productIds = (products ?? []).map((product: { id: string }) => product.id)

  if (productIds.length) {
    await deleteProductsWorkflow(container).run({
      input: {
        ids: productIds,
      },
    })

    logger.info(`Deleted ${productIds.length} products.`)
  } else {
    logger.info("No products found to delete.")
  }

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name"],
  })

  const categoryIds = (categories ?? []).map((category: { id: string }) => category.id)

  if (categoryIds.length) {
    await deleteProductCategoriesWorkflow(container).run({
      input: categoryIds,
    })
    logger.info(`Deleted ${categoryIds.length} product categories.`)
  } else {
    logger.info("No product categories found to delete.")
  }

  logger.info("Catalog cleanup finished.")
}
