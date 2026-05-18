import type { Media } from '@/payload-types'
import { getMediaURL } from './getMediaURL'

type MediaLike = Pick<Media, 'url' | 'thumbnailURL' | 'mimeType'> | null | undefined

/** Poster/thumbnail URL from a media document (image or video thumbnail). */
export function getMediaPosterURL(media: MediaLike): string | null {
  if (!media) return null

  if (media.thumbnailURL) {
    return getMediaURL(media.thumbnailURL)
  }

  if (media.mimeType?.startsWith('image/') && media.url) {
    return getMediaURL(media.url)
  }

  return null
}

/** Prefer explicit cover image, then video thumbnail. */
export function resolveVideoPosterUrl(options: {
  cover?: Media | number | null
  video?: MediaLike
}): string | null {
  const { cover, video } = options

  if (cover && typeof cover === 'object') {
    const fromCover = getMediaPosterURL(cover)
    if (fromCover) return fromCover
  }

  return getMediaPosterURL(video)
}
