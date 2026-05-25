'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { News, Page } from '@/payload-types'
import { TypedLocale } from 'payload'

type Props = Extract<Page['layout'][0], { blockType: 'newsBlock' }> & {
  id?: string
  locale: TypedLocale
}

export const NewsBlockComponent: React.FC<Props> = ({ title, newsItems }) => {
  if (!newsItems || newsItems.length === 0) return null

  const populatedNews = newsItems.filter(
    (item): item is News => typeof item === 'object' && item !== null,
  )

  if (populatedNews.length === 0) return null

  const renderLinkedCard = (href: string | null | undefined, card: React.ReactNode) => {
    if (!href) return card

    const isExternal = href.startsWith('http://') || href.startsWith('https://')

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full cursor-pointer"
        >
          {card}
        </a>
      )
    }

    return (
      <Link href={href} className="group block h-full cursor-pointer">
        {card}
      </Link>
    )
  }

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
            {populatedNews.map((item, index) => {
              const href = item.customLink

              const card = (
                <article className="flex flex-col gap-3 h-full">
                  <div className="relative overflow-hidden rounded-lg bg-[#F0F0F0] aspect-4/3">
                    {item.image && typeof item.image === 'object' && !Array.isArray(item.image) && (
                      <Media
                        resource={item.image}
                        fill
                        imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  {item.title && (
                    <h3 className="text-xl leading-tight font-semibold text-[#2C2C2C] font-urbanist transition-colors group-hover:text-[#C8A97E]">
                      {item.title}
                    </h3>
                  )}
                  {item.shortDescription && (
                    <p className="text-sm md:text-base text-[#5A5A5A] font-work-sans leading-relaxed line-clamp-3">
                      {item.shortDescription}
                    </p>
                  )}
                </article>
              )

              return (
                <CarouselItem
                  key={item.id || index}
                  className="pl-6 basis-[270px] md:basis-[320px] lg:basis-1/4"
                >
                  {renderLinkedCard(href, card)}
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious
            variant="ghost"
            className="hidden md:flex -left-8 lg:-left-10 w-12 h-12 border-0 bg-transparent hover:bg-transparent disabled:opacity-30 [&_svg]:h-12! [&_svg]:w-12! [&_svg]:text-[#fcbf90]! "
          />
          <CarouselNext
            variant="ghost"
            className="hidden md:flex -right-8 lg:-right-10 w-12 h-12 border-0 bg-transparent hover:bg-transparent disabled:opacity-30 [&_svg]:h-12! [&_svg]:w-12! [&_svg]:text-[#fcbf90]! "
          />
        </Carousel>
      </div>
    </section>
  )
}
