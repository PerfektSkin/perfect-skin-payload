import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { revalidateOffers, revalidateOffersDelete } from './Offers/hooks/revalidateOffers'

import { Archive } from '../blocks/ArchiveBlock/config'
import { CallToAction } from '../blocks/CallToAction/config'
import { Content } from '../blocks/Content/config'
import { FormBlock } from '../blocks/Form/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { PriceList } from '../blocks/PriceList/config'
import { Team } from '../blocks/Team/config'
import { AboutUs } from '../blocks/AboutUs/config'
import { FollowUs } from '../blocks/FollowUs/config'
import { ClientReviews } from '../blocks/ClientReviews/config'
import { OurPartners } from '../blocks/OurPartners/config'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: {
    singular: 'Offer',
    plural: 'Offers',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'offers',
          locale: locale.code,
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data, { locale }) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'offers',
        locale,
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    },
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
      admin: {
        description: 'Shown in the offers carousel and at the top of the offer page.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
    },
    ...slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              localized: true,
              label: 'Layout',
              required: true,
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                PriceList,
                Team,
                AboutUs,
                FollowUs,
                ClientReviews,
                OurPartners,
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOffers],
    afterDelete: [revalidateOffersDelete],
  },
}
