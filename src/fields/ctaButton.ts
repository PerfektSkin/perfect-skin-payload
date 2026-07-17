import type { Field } from 'payload'

import { link } from '@/fields/link'

export const ctaButton: Field = {
  name: 'ctaButton',
  type: 'group',
  label: 'CTA Button',
  admin: {
    description:
      'Optional call-to-action button shown centered below this section (e.g., "PROGRAMEAZĂ-TE"). Leave the link empty to hide it.',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
      label: 'Button Label',
      defaultValue: 'PROGRAMEAZĂ-TE',
    },
    link({
      appearances: false,
      disableLabel: true,
    }),
  ],
}
