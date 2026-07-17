import React from 'react'

import type { Page, Post } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type CTAButtonProps = {
  button?: {
    label?: string | null
    link?: {
      type?: 'custom' | 'reference' | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages' | 'posts'
        value: Page | Post | string | number
      } | null
      url?: string | null
    } | null
  } | null
  className?: string
}

export const CTAButton: React.FC<CTAButtonProps> = ({ button, className }) => {
  if (!button?.label || !button?.link) return null

  return (
    <div className={cn('flex justify-center', className)}>
      <CMSLink
        {...button.link}
        label={button.label}
        appearance="default"
        className="px-12 py-6 font-bold! rounded-xs! text-white font-work-sans tracking-[25%] text-sm! bg-[#3F3F3F]! transition-all duration-300 ease-in-out hover:bg-[#2C2C2C]! hover:scale-105 hover:shadow-[0_0_25px_rgba(63,63,63,0.35)]"
      />
    </div>
  )
}
