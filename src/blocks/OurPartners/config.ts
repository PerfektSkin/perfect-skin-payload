import type { Block } from 'payload'

export const OurPartners: Block = {
  slug: 'ourPartners',
  interfaceName: 'OurPartnersBlock',
  labels: {
    plural: 'Our Partners Blocks',
    singular: 'Our Partners',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      defaultValue: 'Partenerii noștri',
    },
    {
      name: 'logos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
      minRows: 1,
      label: 'Partner Logos',
      admin: {
        description: 'Upload/select logos shown in the auto-scrolling partners carousel.',
      },
    },
  ],
}
