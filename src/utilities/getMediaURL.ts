/**
 * Resolves a Payload media URL to an absolute URL for use in img/video src.
 */
export function getMediaURL(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  return `${base}${url.startsWith('/') ? url : `/${url}`}`
}
