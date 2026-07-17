'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type BackgroundMediaProps = {
  resource: NonNullable<Page['hero']['backgroundImage']>
  priority?: boolean
}

const BackgroundMedia: React.FC<BackgroundMediaProps> = ({ resource, priority }) => (
  <Media
    fill
    imgClassName="-z-10 object-cover object-bottom"
    videoClassName="absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
    priority={priority}
    resource={resource}
  />
)

export const WithImageHero: React.FC<Page['hero']> = ({
  title,
  backgroundImage,
  backgroundImageMobile,
  button,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const desktopMedia =
    backgroundImage && typeof backgroundImage === 'object' ? backgroundImage : null
  const mobileMedia =
    backgroundImageMobile && typeof backgroundImageMobile === 'object'
      ? backgroundImageMobile
      : null

  return (
    <div className="relative flex items-center text-white" data-theme="dark">
      <div className="container flex flex-col items-center justify-center z-10 relative text-center py-20">
        {title && (
          <h1 className="mb-8 text-4xl md:text-5xl lg:text-[80px] font-light font-urbanist max-w-5xl">
            {title}
          </h1>
        )}
        {button?.label && button?.link && (
          <CMSLink
            {...button.link}
            label={button.label}
            appearance="default"
            className="px-12 py-6 font-bold! rounded-xs! text-white font-work-sans tracking-[25%] text-sm! bg-transparent! border-white border-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-[#3F3F3F] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          />
        )}
      </div>
      <div className="min-h-[70vh] select-none">
        {desktopMedia && (
          <div className={mobileMedia ? 'max-md:hidden' : undefined}>
            <BackgroundMedia priority resource={desktopMedia} />
          </div>
        )}
        {mobileMedia && (
          <div className="md:hidden">
            <BackgroundMedia priority resource={mobileMedia} />
          </div>
        )}
        {(desktopMedia || mobileMedia) && (
          <div className="absolute inset-0 bg-black/30 pointer-events-none -z-[5]" />
        )}
      </div>
    </div>
  )
}
