'use client'

import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Media as MediaType, Page } from '@/payload-types'

type Props = {
  id?: string
  title?: string | null
  logos?: Array<number | MediaType | null> | null
} & Partial<Extract<Page['layout'][0], { blockType: 'ourPartners' }>>

export const OurPartnersBlock: React.FC<Props> = ({ title, logos }) => {
  if (!logos || logos.length === 0) return null

  const populatedLogos = logos.filter(
    (logo): logo is MediaType => typeof logo === 'object' && logo !== null,
  )

  if (populatedLogos.length === 0) return null

  return (
    <section>
      <div className="container">
        {title && (
          <h2 className="mb-8 text-center text-2xl md:text-3xl lg:text-5xl font-medium font-urbanist text-[#2C2C2C]">
            {title}
          </h2>
        )}
      </div>

      <div className="bg-[#FFF8F3] py-6 md:py-8 rounded-sm">
        <div className="container">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
            plugins={[Autoplay({ delay: 2600, stopOnInteraction: false })]}
            className="w-full md:px-10"
          >
            <CarouselContent className="-ml-6">
              {populatedLogos.map((logo, index) => (
                <CarouselItem
                  key={logo.id || index}
                  className="pl-6 basis-[170px] sm:basis-[190px] md:basis-[220px] lg:basis-[240px]"
                >
                  <div className="h-[64px] md:h-[74px] flex items-center justify-center">
                    <Media resource={logo} imgClassName="max-h-full w-auto object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="ghost"
              className="hidden md:flex -left-8 lg:-left-10 w-12 h-12 border-0 bg-transparent hover:bg-transparent text-[#2C2C2C]/40 hover:text-[#2C2C2C] disabled:opacity-30 [&_svg]:h-12! [&_svg]:w-12!"
            />
            <CarouselNext
              variant="ghost"
              className="hidden md:flex -right-8 lg:-right-10 w-12 h-12 border-0 bg-transparent hover:bg-transparent text-[#2C2C2C]/40 hover:text-[#2C2C2C] disabled:opacity-30 [&_svg]:h-12! [&_svg]:w-12!"
            />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
