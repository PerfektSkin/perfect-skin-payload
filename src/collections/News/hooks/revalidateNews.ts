import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

import type { News } from '../../../payload-types'
import localization from '@/i18n/localization'

const revalidateNewsPath = (slug: string | undefined | null) => {
  if (!slug) return

  for (const { code: locale } of localization.locales) {
    revalidatePath(`/${locale}/news/${slug}`)
  }
}

export const revalidateNews: CollectionAfterChangeHook<News> = ({ doc, previousDoc }) => {
  revalidateNewsPath(doc.slug)
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    revalidateNewsPath(previousDoc.slug)
  }

  return doc
}

export const revalidateNewsDelete: CollectionAfterDeleteHook<News> = ({ doc }) => {
  revalidateNewsPath(doc.slug)
  return doc
}
