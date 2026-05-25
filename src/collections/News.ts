import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'customLink', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
      admin: {
        description: 'Shown in the news carousel and at the top of the news page.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Short Description',
      maxLength: 280,
      admin: {
        description: 'Short summary shown in the carousel listing.',
      },
    },
    {
      name: 'customLink',
      type: 'text',
      localized: true,
      label: 'Custom Link',
      admin: {
        description:
          'Used when clicking this item in the News Block. Supports internal paths like /services or full URLs.',
      },
    },
  ],
}
