import type { Header as HeaderType } from '@/payload-types'

export type NavSubItems = NonNullable<NonNullable<HeaderType['navItems']>[number]['subItems']>
export type NavSubItem = NavSubItems[number]
type NavLink = NonNullable<NavSubItem['link']>

export function isSubItemCategory(subItem: NavSubItem): boolean {
  if (subItem.itemType === 'link') return false
  if (subItem.itemType === 'category') return true
  // Backward compat: category-only data without itemType
  if (subItem.categoryLabel && subItem.items && subItem.items.length > 0) return true
  return false
}

export function isSubItemLink(subItem: NavSubItem): boolean {
  if (subItem.itemType === 'category') return false
  if (subItem.itemType === 'link') return Boolean(subItem.link?.label)
  // Backward compat: flat link data without itemType
  if (subItem.link?.label) return true
  return false
}

export function hasNavSubItems(subItems: NavSubItems | null | undefined): boolean {
  return (
    subItems?.some(
      (subItem) =>
        isSubItemLink(subItem) ||
        (isSubItemCategory(subItem) && Boolean(subItem.items && subItem.items.length > 0)),
    ) ?? false
  )
}

export function collectSubItemLinks(subItems: NavSubItems | null | undefined): NavLink[] {
  const links: NavLink[] = []

  for (const subItem of subItems ?? []) {
    if (isSubItemLink(subItem) && subItem.link) {
      links.push(subItem.link)
    }
    if (isSubItemCategory(subItem)) {
      for (const nested of subItem.items ?? []) {
        if (nested.link) {
          links.push(nested.link)
        }
      }
    }
  }

  return links
}

export function getLinkHref(
  link: NavLink | NonNullable<NonNullable<HeaderType['navItems']>[number]['link']>,
): string {
  if (!link) return '#'

  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference
    if (typeof value === 'object' && value?.slug) {
      return relationTo === 'pages' ? `/${value.slug}` : `/${relationTo}/${value.slug}`
    }
  }

  if (link.type === 'custom' && link.url) {
    return link.url
  }

  return '#'
}
