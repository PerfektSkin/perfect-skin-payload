import type { Block } from 'payload'

export const FollowUs: Block = {
  slug: 'followUs',
  interfaceName: 'FollowUsBlock',
  labels: {
    plural: 'Follow Us Blocks',
    singular: 'Follow Us',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      admin: {
        description: 'e.g. Urmărește-ne pe Instagram',
      },
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram Profile URL',
      admin: {
        description: 'e.g. https://instagram.com/perfectskin.md',
      },
    },
    {
      name: 'posts',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Post',
        plural: 'Posts',
      },
      fields: [
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Video',
        },
        {
          name: 'cover',
          type: 'upload',
          relationTo: 'media',
          label: 'Cover image (preview)',
          admin: {
            description:
              'Upload a JPG/PNG thumbnail shown before play. Recommended — avoids loading video on page load.',
          },
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },
  ],
}
