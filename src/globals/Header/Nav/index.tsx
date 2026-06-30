'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Link } from '@/i18n/routing'
import { usePathname } from '@/i18n/routing'

import type { Header as HeaderType } from '@/payload-types'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utilities/ui'
import { LayoutGrid } from 'lucide-react'
import {
  type NavSubItems,
  getLinkHref,
  hasNavSubItems,
  isSubItemCategory,
  isSubItemLink,
} from '../subItems'

type NavItems = HeaderType['navItems']

const menuItemClassName = cn(
  'cursor-pointer rounded-none px-7 py-3 text-base font-normal font-work-sans',
  'hover:bg-[#FFF8F3] focus:bg-[#FFF8F3] hover:text-black focus:text-black',
  'transition-colors duration-150 w-full flex items-center gap-4',
)

// Nav item with sub-items dropdown (flat links and/or categories with flyout)
const NavItemWithDropdown: React.FC<{
  link: NonNullable<NavItems>[number]['link']
  subItems: NavSubItems
  isLinkActive: (href: string) => boolean
}> = ({ link, subItems, isLinkActive }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setActiveCategoryIndex(null)
    }, 150)
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center"
      >
        <DropdownMenuTrigger asChild>
          <button className="text-black tracking-[17%] font-normal md:text-xs lg:text-sm xl:text-base font-work-sans hover:opacity-70 transition-opacity">
            {link?.label}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={12}
          className="min-w-0 bg-transparent text-black rounded-none border-0 shadow-none p-0 overflow-visible"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative min-w-[240px] bg-white rounded-md shadow-lg overflow-visible">
            {subItems?.map((subItem, subIndex) => {
              if (isSubItemLink(subItem) && subItem.link) {
                const subHref = getLinkHref(subItem.link)
                const isSubActive = isLinkActive(subHref)

                return (
                  <Link
                    key={subIndex}
                    href={subHref}
                    onMouseEnter={() => setActiveCategoryIndex(null)}
                    className={cn(
                      menuItemClassName,
                      isSubActive && 'bg-[#FFF8F3] font-medium',
                    )}
                  >
                    <LayoutGrid className="w-5 h-5 shrink-0" />
                    <span>{subItem.link.label}</span>
                  </Link>
                )
              }

              if (!isSubItemCategory(subItem)) return null

              const isActive = activeCategoryIndex === subIndex
              const hasItems = (subItem.items ?? []).length > 0

              return (
                <div
                  key={subIndex}
                  onMouseEnter={() => {
                    if (hasItems) setActiveCategoryIndex(subIndex)
                  }}
                >
                  <div className={cn(menuItemClassName, isActive && 'bg-[#FFF8F3]')}>
                    <LayoutGrid className="w-5 h-5 shrink-0" />
                    <span>{subItem.categoryLabel}</span>
                  </div>
                </div>
              )
            })}

            {/* Flyout poziționat relativ la panoul 1, mereu de sus */}
            {activeCategoryIndex !== null && (() => {
              const activeSubItem = subItems?.[activeCategoryIndex]
              if (!activeSubItem || !isSubItemCategory(activeSubItem)) return null
              const items = activeSubItem.items ?? []
              if (items.length === 0) return null
              return (
                <div className="absolute left-full top-0 min-w-[240px] bg-white rounded-md shadow-lg overflow-hidden z-50">
                  {items.map(({ link: nestedLink }, nestedIndex) => {
                    const nestedHref = getLinkHref(nestedLink)
                    const isNestedActive = isLinkActive(nestedHref)
                    return (
                      <Link
                        key={nestedIndex}
                        href={nestedHref}
                        className={cn(
                          menuItemClassName,
                          isNestedActive && 'bg-[#FFF8F3] font-medium',
                        )}
                      >
                        <LayoutGrid className="w-5 h-5 shrink-0" />
                        <span>{nestedLink?.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )
            })()}
          </div>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}

export const HeaderNav: React.FC<{ navItems?: NavItems }> = ({ navItems = [] }) => {
  const pathname = usePathname()

  if (!navItems || navItems.length === 0) {
    return null
  }

  const isLinkActive = (href: string): boolean => {
    if (href === '#') return false
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && (pathname === href || pathname.startsWith(href + '/'))) return true
    return false
  }

  return (
    <nav className="flex items-center gap-5">
      {navItems.map((item, i) => {
        const { link, subItems } = item
        const itemHref = getLinkHref(link)

        if (hasNavSubItems(subItems)) {
          return (
            <NavItemWithDropdown
              key={i}
              link={link}
              subItems={subItems!}
              isLinkActive={isLinkActive}
            />
          )
        }

        return (
          <Link
            key={i}
            href={itemHref}
            className="text-black tracking-[17%] font-normal md:text-xs lg:text-sm xl:text-base font-work-sans hover:opacity-70 transition-opacity"
          >
            {link?.label}
          </Link>
        )
      })}
    </nav>
  )
}
