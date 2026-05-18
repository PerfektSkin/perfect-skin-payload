import type { Metadata } from 'next'

import type { Media, News } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getCachedGlobal } from './getGlobals'

type SiteSetting = {
  siteTitle?: string | null
  siteDescription?: string | null
  ogImage?: Media | string | null
}

const getImageUrl = (image: Media | string | null | undefined): string | undefined => {
  if (!image) return undefined

  if (typeof image === 'string') {
    return image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_SERVER_URL}${image}`
  }

  if (typeof image === 'object' && 'url' in image && image.url) {
    return image.url.startsWith('http')
      ? image.url
      : `${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}`
  }

  return undefined
}

export const generateNewsMeta = async (doc: News | null): Promise<Metadata> => {
  let siteSettings: SiteSetting | null = null

  try {
    siteSettings = (await getCachedGlobal('site-settings', 1, 'ro')()) as SiteSetting
  } catch {
    // use defaults
  }

  const newsImage = doc?.image && typeof doc.image === 'object' ? doc.image : null
  const ogImage = getImageUrl(newsImage) || getImageUrl(siteSettings?.ogImage as Media | null)

  const title = doc?.title || siteSettings?.siteTitle || ''
  const description = doc?.shortDescription || siteSettings?.siteDescription || ''

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: doc?.slug ? `/news/${doc.slug}` : '/news',
    }),
    title,
  }
}
