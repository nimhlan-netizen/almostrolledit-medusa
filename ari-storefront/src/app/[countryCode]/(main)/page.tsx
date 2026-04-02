import { Metadata } from "next"

import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import AlmostRolledItHome from "@modules/home/templates/almost-rolled-it-home"

export const metadata: Metadata = {
  title: "Almost Rolled It",
  description:
    "A lean Medusa storefront for Almost Rolled It with trail content, partner codes, and merch ready to scale back up.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 3,
    },
  })

  if (!region) {
    return null
  }

  return <AlmostRolledItHome region={region} products={products} />
}
