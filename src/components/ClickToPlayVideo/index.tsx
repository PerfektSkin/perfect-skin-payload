'use client'

import { cn } from '@/utilities/ui'
import { getMediaURL } from '@/utilities/getMediaURL'
import React, { useEffect, useRef, useState } from 'react'
import { VideoPoster } from './VideoPoster'

type ClickToPlayVideoProps = {
  videoUrl: string
  posterUrl?: string | null
  posterAlt?: string
  className?: string
  wrapperClassName?: string
  loop?: boolean
  showMuteButton?: boolean
  forcePause?: boolean
  onBeforePlay?: () => void
  onPause?: () => void
}

export const ClickToPlayVideo: React.FC<ClickToPlayVideoProps> = ({
  videoUrl,
  posterUrl,
  posterAlt,
  className,
  wrapperClassName,
  loop = true,
  showMuteButton = false,
  forcePause = false,
  onBeforePlay,
  onPause,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const resolvedUrl = getMediaURL(videoUrl)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [muted, setMuted] = useState(true)

  const stopVideo = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.removeAttribute('src')
    video.load()
    setPlaying(false)
    setLoading(false)
  }

  useEffect(() => {
    if (forcePause) {
      stopVideo()
    }
  }, [forcePause])

  const handlePlay = async () => {
    if (!resolvedUrl) return

    const video = videoRef.current
    if (!video) return

    if (playing) {
      stopVideo()
      onPause?.()
      return
    }

    onBeforePlay?.()
    setLoading(true)

    video.src = resolvedUrl
    video.muted = true
    video.loop = loop
    video.playsInline = true
    video.preload = 'auto'
    video.load()

    try {
      await video.play()
      setPlaying(true)
    } catch {
      stopVideo()
    } finally {
      setLoading(false)
    }
  }

  const handleToggleMute: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    const nextMuted = !muted
    video.muted = nextMuted
    setMuted(nextMuted)
  }

  if (!resolvedUrl) return null

  return (
    <div
      className={cn(
        'relative group overflow-hidden cursor-pointer bg-[#F0F0F0]',
        wrapperClassName,
      )}
      onClick={() => void handlePlay()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          void handlePlay()
        }
      }}
    >
      <VideoPoster posterUrl={posterUrl} alt={posterAlt} visible={!playing} />

      <video
        ref={videoRef}
        className={cn(
          'absolute inset-0 w-full h-full object-cover',
          !playing && 'opacity-0 pointer-events-none',
          className,
        )}
        playsInline
        loop={loop}
        preload="none"
        muted={muted}
      />

      {!playing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              'w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110',
              loading && 'opacity-60',
            )}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </div>
        </div>
      )}

      {showMuteButton && playing && (
        <button
          type="button"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          onClick={handleToggleMute}
          className="absolute right-3 bottom-3 z-20 inline-flex items-center justify-center rounded-full border border-white/60 bg-black/25 backdrop-blur-sm text-white transition hover:bg-black/35 w-10 h-10"
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M11 5L6 9H3v6h3l5 4V5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M16 9l5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M11 5L6 9H3v6h3l5 4V5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 8.5a5 5 0 0 1 0 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18.5 6a9 9 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
