import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full border-t border-white/10 bg-[#111111] text-white">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-10 py-24 xsmall:flex-row">
          <div>
            <LocalizedClientLink
              href="/"
              className="font-[Impact] text-4xl uppercase tracking-[0.14em] text-white transition hover:text-[#ff8b4d]"
            >
              Almost Rolled It
            </LocalizedClientLink>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              Built on Medusa so products, discounts, and checkout can grow
              back in without carrying the overhead of the old stack.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-small-regular md:gap-x-16 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-white">Categories</span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="txt-small flex flex-col gap-2 text-white/60"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "transition hover:text-white",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="transition hover:text-white"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-white">Collections</span>
                <ul
                  className={clx(
                    "txt-small grid grid-cols-1 gap-2 text-white/60",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="transition hover:text-white"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-white">Explore</span>
              <ul className="txt-small grid grid-cols-1 gap-y-2 text-white/60">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-white"
                  >
                    Store
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="transition hover:text-white"
                  >
                    Account
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="transition hover:text-white"
                  >
                    Cart
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full justify-between text-white/45">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Almost Rolled It. All rights reserved.
          </Text>
          <Text className="txt-compact-small uppercase tracking-[0.18em]">
            Built lean. Ready to scale.
          </Text>
        </div>
      </div>
    </footer>
  )
}
