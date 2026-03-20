import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // Allow creating the first user when no users exist
    create: async ({ req }) => {
      // If user is logged in, allow
      if (req.user) return true
      // If no users exist yet, allow creating the first one
      const { totalDocs } = await req.payload.count({ collection: 'users' })
      return totalDocs === 0
    },
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}

export default Users
