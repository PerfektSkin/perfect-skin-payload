'use client'

import { getMediaURL } from '@/utilities/getMediaURL'
import Image from 'next/image'
import React from 'react'

type VideoPosterProps = {
  posterUrl?: string | null
  alt?: string
  visible: boolean
}

/** Static image poster only — never loads video bytes for preview. */
export const VideoPoster: React.FC<VideoPosterProps> = ({ posterUrl, alt = '', visible }) => {
  if (!visible) return null

  const resolvedPoster = posterUrl ? getMediaURL(posterUrl) : null

  if (resolvedPoster) {
    return (
      <Image
        src={resolvedPoster}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 65vw, 25vw"
        unoptimized={resolvedPoster.includes('.blob.vercel-storage.com')}
      />
    )
  }

  return (
    <div
      className="absolute inset-0 bg-gradient-to-br from-[#E8E4DF] via-[#F0EDE8] to-[#DDD8D2]"
      aria-hidden
    />
  )
}
