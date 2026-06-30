import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

const isSubItemLinkType = (_: unknown, siblingData?: { itemType?: string | null }) =>
  siblingData?.itemType === 'link'

const isSubItemCategoryType = (_: unknown, siblingData?: { itemType?: string | null }) =>
  siblingData?.itemType === 'category'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Logo',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              required: false,
            },
          ],
        },
        {
          label: 'Nav Items',
          fields: [
            {
              name: 'menuLabel',
              type: 'text',
              label: 'Menu Label',
              localized: true,
              defaultValue: 'Meniu',
              admin: {
                description: 'The text displayed on the menu button (e.g., "Meniu", "Menu")',
              },
            },
            {
              name: 'navItems',
              type: 'array',
              label: 'Navigation Menu Items',
              defaultValue: [],
              admin: {
                description:
                  'Add navigation items with optional submenu items.',
                initCollapsed: false,
                components: {
                  RowLabel: '@/globals/Header/NavItemRowLabel',
                },
              },
              fields: [
                link({
                  appearances: false,
                  disableLabel: false,
                }),
                {
                  name: 'subItems',
                  type: 'array',
                  label: 'Sub Menu Items (Dropdown)',
                  admin: {
                    description:
                      'Add direct links or category groups (e.g. Epilare → Epilare cu laser, Electroepilare).',
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Header/SubCategoryRowLabel',
                    },
                  },
                  fields: [
                    {
                      name: 'itemType',
                      type: 'select',
                      label: 'Item Type',
                      defaultValue: 'link',
                      options: [
                        { label: 'Link', value: 'link' },
                        { label: 'Category', value: 'category' },
                      ],
                      validate: (value) => (value ? true : 'Item type is required'),
                    },
                    {
                      type: 'collapsible',
                      label: 'Link',
                      admin: {
                        initCollapsed: false,
                        condition: isSubItemLinkType,
                      },
                      fields: [
                        link({
                          appearances: false,
                          disableLabel: false,
                          required: false,
                        }),
                      ],
                    },
                    {
                      type: 'collapsible',
                      label: 'Category',
                      admin: {
                        initCollapsed: false,
                        condition: isSubItemCategoryType,
                      },
                      fields: [
                        {
                          name: 'categoryLabel',
                          type: 'text',
                          label: 'Category Label',
                          localized: true,
                          validate: (value, { siblingData }) => {
                            if (
                              (siblingData as { itemType?: string })?.itemType === 'category' &&
                              !value
                            ) {
                              return 'Category label is required'
                            }
                            return true
                          },
                        },
                        {
                          name: 'items',
                          type: 'array',
                          label: 'Menu Items',
                          admin: {
                            description: 'Links that appear when hovering this category.',
                            initCollapsed: true,
                            components: {
                              RowLabel: '@/globals/Header/NavItemRowLabel',
                            },
                          },
                          fields: [
                            link({
                              appearances: false,
                              disableLabel: false,
                            }),
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
              maxRows: 15,
            },
          ],
        },
        {
          label: 'CTA Button',
          fields: [
            {
              name: 'ctaButton',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  label: 'Button Label',
                  required: true,
                },
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        for (const navItem of data?.navItems ?? []) {
          for (const subItem of navItem.subItems ?? []) {
            if (subItem.itemType === 'link') {
              const linkData = subItem.link
              if (!linkData?.label) {
                throw new Error('Sub menu link items require a label.')
              }
              if (linkData.type === 'reference' && !linkData.reference) {
                throw new Error('Sub menu link items require a page reference.')
              }
              if (linkData.type === 'custom' && !linkData.url) {
                throw new Error('Sub menu link items require a custom URL.')
              }
            }
          }
        }
        return data
      },
    ],
    afterChange: [revalidateHeader],
  },
}
