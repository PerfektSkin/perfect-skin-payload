import type { Block } from 'payload'

export const OffersBlock: Block = {
  slug: 'offersBlock',
  interfaceName: 'OffersBlock',
  labels: {
    plural: 'Offers Blocks',
    singular: 'Offers Block',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Block Title',
      defaultValue: 'Oferte',
    },
    {
      name: 'offerItems',
      type: 'relationship',
      relationTo: 'offers',
      hasMany: true,
      required: true,
      label: 'Offers',
      admin: {
        description: 'Select existing offers to display in this carousel block.',
      },
    },
  ],
}
