import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

import type { Offer } from '../../../payload-types'
import localization from '@/i18n/localization'

const revalidateOfferPath = (slug: string | undefined | null) => {
  if (!slug) return

  for (const { code: locale } of localization.locales) {
    revalidatePath(`/${locale}/offers/${slug}`)
  }
}

export const revalidateOffers: CollectionAfterChangeHook<Offer> = ({ doc, previousDoc }) => {
  revalidateOfferPath(doc.slug)
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    revalidateOfferPath(previousDoc.slug)
  }

  return doc
}

export const revalidateOffersDelete: CollectionAfterDeleteHook<Offer> = ({ doc }) => {
  revalidateOfferPath(doc.slug)
  return doc
}
