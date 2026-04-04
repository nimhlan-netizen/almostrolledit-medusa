import LocalizedClientLink from "@modules/common/components/localized-client-link"

type EmptyProductStateProps = {
  title: string
  description: string
}

export default function EmptyProductState({
  title,
  description,
}: EmptyProductStateProps) {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-ui-border-base bg-white p-8 shadow-elevation-card-rest"
      data-testid="empty-product-state"
    >
      <div className="space-y-2">
        <p className="text-ui-fg-muted text-sm uppercase tracking-[0.2em]">
          Inventory Update
        </p>
        <h2 className="text-2xl-semi">{title}</h2>
        <p className="text-base-regular text-ui-fg-subtle max-w-2xl">
          {description}
        </p>
      </div>
      <div>
        <LocalizedClientLink
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-ui-fg-base"
        >
          Back to home
        </LocalizedClientLink>
      </div>
    </div>
  )
}
