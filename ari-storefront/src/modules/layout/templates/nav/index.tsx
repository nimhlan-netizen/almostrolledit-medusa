import { Suspense } from "react"

import { getSiteSettings } from "@lib/cms/loaders"
import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale, siteSettings] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    getSiteSettings(),
  ])

  return (
    <div className="group sticky inset-x-0 top-0 z-50">
      <header className="relative mx-auto h-16 border-b border-white/10 bg-[#0b0b0b]/90 text-white backdrop-blur-xl duration-200">
        <nav className="content-container flex h-full w-full items-center justify-between text-small-regular text-white/65">
          <div className="flex h-full flex-1 basis-0 items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          <div className="flex h-full items-center">
            <LocalizedClientLink
              href="/"
              className="font-[Impact] text-2xl uppercase tracking-[0.18em] text-white transition hover:text-[#ff8b4d]"
              data-testid="nav-store-link"
            >
              {siteSettings.brandName}
            </LocalizedClientLink>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
            <div className="hidden h-full items-center gap-x-6 small:flex">
              {siteSettings.navLinks.slice(0, 2).map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  className="uppercase tracking-[0.18em] transition hover:text-white"
                  href={link.href}
                  data-testid={
                    link.href === "/account" ? "nav-account-link" : undefined
                  }
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2 uppercase tracking-[0.18em] transition hover:text-white"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
