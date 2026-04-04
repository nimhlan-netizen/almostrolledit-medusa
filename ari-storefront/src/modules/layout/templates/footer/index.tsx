import { getSiteSettings } from "@lib/cms/loaders"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const [{ collections }, productCategories, siteSettings] = await Promise.all([
    listCollections({
      fields: "*products",
    }),
    listCategories(),
    getSiteSettings(),
  ])

  return (
    <footer className="w-full border-t border-white/10 bg-[#111111] text-white">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-10 py-24 xsmall:flex-row">
          <div>
            <LocalizedClientLink
              href="/"
              className="font-[Impact] text-4xl uppercase tracking-[0.14em] text-white transition hover:text-[#ff8b4d]"
            >
              {siteSettings.brandName}
            </LocalizedClientLink>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              {siteSettings.footerDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {siteSettings.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-[#ff6b1a] hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
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
                {siteSettings.navLinks.map((link) => (
                  <li key={link.href}>
                    <LocalizedClientLink
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full justify-between text-white/45">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Almost Rolled It. All rights reserved.
          </Text>
          <Text className="txt-compact-small uppercase tracking-[0.18em]">
            {siteSettings.footerTagline}
          </Text>
        </div>
      </div>
    </footer>
  )
}
