'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

import type { Props as MediaProps } from '../types'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {})
  }, [isInView])

  if (resource && typeof resource === 'object') {
    const { filename } = resource
    const src = isInView ? `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}` : undefined

    return (
      <div ref={containerRef} className="contents">
        <video
          autoPlay
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            videoClassName,
          )}
          controls={false}
          loop
          muted
          onClick={onClick}
          onLoadedData={() => setIsLoaded(true)}
          playsInline
          preload="none"
          ref={videoRef}
          src={src}
        />
      </div>
    )
  }

  return null
}
