'use client'

import React from 'react'
import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Media as MediaType, Page } from '@/payload-types'

type NewsItem = {
  id?: number | string
  image?: number | string | MediaType | null
  title?: string | null
  shortDescription?: string | null
}

type Props = {
  id?: string
  title?: string | null
  newsItems?: Array<number | NewsItem | null> | null
} & Partial<Extract<Page['layout'][0], { blockType: 'newsBlock' }>>

export const NewsBlockComponent: React.FC<Props> = ({ title, newsItems }) => {
  if (!newsItems || newsItems.length === 0) return null

  const populatedNews = newsItems.filter(
    (item): item is NewsItem => typeof item === 'object' && item !== null,
  )

  if (populatedNews.length === 0) return null

  return (
    <section>
      <div className="container">
        {title && (
          <h2 className="mb-8 text-center text-2xl md:text-3xl lg:text-5xl font-medium font-urbanist text-[#2C2C2C]">
            {title}
          </h2>
        )}

        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="w-full md:px-10"
        >
          <CarouselContent className="-ml-6">
            {populatedNews.map((item, index) => (
              <CarouselItem
                key={item.id || index}
                className="pl-6 basis-[270px] md:basis-[320px] lg:basis-1/4"
              >
                <article className="flex flex-col gap-3 h-full">
                  <div className="relative overflow-hidden rounded-lg bg-[#F0F0F0] aspect-4/3">
                    {item.image && typeof item.image === 'object' && !Array.isArray(item.image) && (
                      <Media
                        resource={item.image}
                        fill
                        imgClassName="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                  </div>
                  {item.title && (
                    <h3 className="text-xl leading-tight font-semibold text-[#2C2C2C] font-urbanist">
                      {item.title}
                    </h3>
                  )}
                  {item.shortDescription && (
                    <p className="text-sm md:text-base text-[#5A5A5A] font-work-sans leading-relaxed line-clamp-3">
                      {item.shortDescription}
                    </p>
                  )}
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="ghost"
            className="hidden md:flex -left-12 lg:-left-14 w-16 h-16 border-0 bg-transparent hover:bg-transparent text-[#2C2C2C]/40 hover:text-[#2C2C2C] [&_svg]:h-16! [&_svg]:w-16!"
          />
          <CarouselNext
            variant="ghost"
            className="hidden md:flex -right-12 lg:-right-14 w-16 h-16 border-0 bg-transparent hover:bg-transparent text-[#2C2C2C]/40 hover:text-[#2C2C2C] [&_svg]:h-16! [&_svg]:w-16!"
          />
        </Carousel>
      </div>
    </section>
  )
}
