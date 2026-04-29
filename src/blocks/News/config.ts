import type { Block } from 'payload'

export const NewsBlock: Block = {
  slug: 'newsBlock',
  interfaceName: 'NewsBlock',
  labels: {
    plural: 'News Blocks',
    singular: 'News',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Block Title',
      defaultValue: 'Noutăți',
    },
    {
      name: 'newsItems',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      required: true,
      label: 'News Items',
      admin: {
        description: 'Select existing news items to reuse in this block.',
      },
    },
  ],
}
