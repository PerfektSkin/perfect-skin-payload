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
import type { Offer, Page } from '@/payload-types'
import { TypedLocale } from 'payload'

type Props = Extract<Page['layout'][0], { blockType: 'offersBlock' }> & {
  id?: string
  locale: TypedLocale
}

export const OffersBlockComponent: React.FC<Props> = ({ title, offerItems }) => {
  if (!offerItems || offerItems.length === 0) return null

  const populatedOffers = offerItems.filter(
    (item): item is Offer => typeof item === 'object' && item !== null,
  )

  if (populatedOffers.length === 0) return null

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
            {populatedOffers.map((item, index) => {
              const href = item.slug ? `/offers/${item.slug}` : null

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
                </article>
              )

              return (
                <CarouselItem
                  key={item.id || index}
                  className="pl-6 basis-[270px] md:basis-[320px] lg:basis-1/4"
                >
                  {href ? (
                    <Link href={href} className="group block h-full cursor-pointer">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
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
