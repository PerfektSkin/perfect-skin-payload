import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { TypedLocale } from 'payload'

export async function Header({
  locale,
  header: headerData,
}: {
  locale: TypedLocale
  header?: Header
}) {
  const header =
    headerData ?? ((await getCachedGlobal('header', 1, locale)()) as Header)

  return <HeaderClient header={header} />
}
