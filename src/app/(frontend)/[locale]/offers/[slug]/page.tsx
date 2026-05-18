import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Media } from '@/components/Media'
import type { Offer as OfferType, Page } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import { generateOffersMeta } from '@/utilities/generateOffersMeta'
import { TypedLocale } from 'payload'
import PageClient from './page.client'

export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'offers',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return result.docs
    .filter((doc) => doc.slug)
    .map(({ slug }) => ({
      slug,
    }))
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function OfferPage({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'ro' } = await paramsPromise
  const url = '/offers/' + slug
  const offer = await queryOffer({ slug, locale })

  if (!offer) return <PayloadRedirects url={url} />

  const image = offer.image && typeof offer.image === 'object' ? offer.image : null

  return (
    <article className="pb-16 pt-16 md:pt-16">
      <PageClient />

      <div className="container">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {image && (
            <div className="relative w-full aspect-16/10 overflow-hidden rounded-2xl bg-[#F0F0F0]">
              <Media resource={image} fill imgClassName="object-cover" priority />
            </div>
          )}

          <header className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium font-urbanist text-[#2C2C2C]">
              {offer.title}
            </h1>
          </header>
        </div>
      </div>

      {offer.layout && offer.layout.length > 0 && (
        <RenderBlocks blocks={offer.layout as Page['layout']} locale={locale} />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'ro' } = await paramsPromise
  const offer = await queryOffer({ slug, locale })

  return generateOffersMeta(offer)
}

const queryOffer = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'offers',
    depth: 2,
    limit: 1,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as OfferType) || null
})
