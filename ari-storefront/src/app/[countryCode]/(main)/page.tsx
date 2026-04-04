import { Metadata } from "next"

import { getHomepageContent, getHomepageSeo } from "@lib/cms/loaders"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import AlmostRolledItHome from "@modules/home/templates/almost-rolled-it-home"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getHomepageSeo()

  return {
    title: seo.title || "Almost Rolled It",
    description:
      seo.description ||
      "A lean Medusa storefront for Almost Rolled It with trail content, partner codes, and merch ready to scale back up.",
    openGraph: seo.imageUrl
      ? {
          images: [{ url: seo.imageUrl }],
        }
      : undefined,
  }
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

  const homepageContent = await getHomepageContent()

  return (
    <AlmostRolledItHome
      region={region}
      products={products}
      content={homepageContent}
    />
  )
}
